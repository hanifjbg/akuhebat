import { eventBus, EVENTS } from '../../core/event-bus';
import { useKidsSessionStore } from '../../core/state/kids-store';
import { useParentAuthStore } from '../../core/state/parent-store';
import { updateChildProfile } from '../auth/kids-profiles';

export class GamificationEngine {
  constructor() {
    this.initListeners();
  }

  private initListeners() {
    eventBus.on(EVENTS.QUIZ_COMPLETED, (payload: any) => {
      this.calculateRewards(payload.score, payload.totalQuestions);
    });
  }

  private async calculateRewards(score: number, totalQuestions: number) {
    let expGained = 0;
    let gainedStars = 0;

    if (score >= 80) {
      expGained = score * 3 + 50; // Bonus EXp
      gainedStars = 5;
    } else if (score >= 50) {
      expGained = score * 2;
      gainedStars = 3;
    } else {
      expGained = score;
      gainedStars = 1;
    }

    eventBus.emit(EVENTS.SCORE_UPDATED, { expGained, stars: gainedStars, score });
    
    // Update Firebase
    const { activeChildId } = useKidsSessionStore.getState();
    const { firebaseUser, children } = useParentAuthStore.getState();
    
    if (activeChildId && firebaseUser) {
      const activeChild = children.find(c => c.id === activeChildId);
      if (activeChild) {
        let newExp = activeChild.exp + expGained;
        let newLevel = activeChild.level;
        const newStars = activeChild.stars + gainedStars;
        
        let levelUp = false;
        
        // Simple leveling logic: 500 exp per level
        while (newExp >= newLevel * 500) {
          newLevel++;
          levelUp = true;
        }
        
        try {
          await updateChildProfile(firebaseUser.uid, activeChildId, {
            exp: newExp,
            level: newLevel,
            stars: newStars
          });
          
          if (levelUp) {
            eventBus.emit(EVENTS.LEVEL_UP, { newLevel });
          }
        } catch (error) {
          console.error("Failed to update child profile in gamification engine:", error);
        }
      }
    }
  }
}

export const gamificationEngine = new GamificationEngine();
