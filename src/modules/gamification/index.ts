import { eventBus, EVENTS } from '../../core/event-bus';

export class GamificationEngine {
  constructor() {
    this.initListeners();
  }

  private initListeners() {
    eventBus.on(EVENTS.QUIZ_COMPLETED, (payload) => {
      this.calculateRewards(payload.score, payload.totalQuestions);
    });
  }

  private calculateRewards(score: number, totalQuestions: number) {
    // Score should be passed as 10-100 logic, assuming here the module handles scaling it.
    // If score is 0-100:
    let expGained = 0;
    let stars = 0;

    if (score >= 80) {
      expGained = score * 3 + 50; // Bonus EXp
      stars = 5;
    } else if (score >= 50) {
      expGained = score * 2;
      stars = 3;
    } else {
      expGained = score;
      stars = 1;
    }

    eventBus.emit(EVENTS.SCORE_UPDATED, { expGained, stars, score });
    
    // In a full implementation, we then load the child's profile from Firebase
    // or local store, add the exp, and check if it crosses a level threshold.
    // e.g. nextLevelReq = currentLevel * 1000
    // if (totalExp >= nextLevelReq) { eventBus.emit(EVENTS.LEVEL_UP, { newLevel }) }
  }
}

export const gamificationEngine = new GamificationEngine();
