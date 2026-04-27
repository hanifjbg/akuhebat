import { signInWithPopup, GoogleAuthProvider, signInAnonymously, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../core/firebase/config';
import { useParentAuthStore } from '../../core/state/parent-store';
import { listenToChildProfiles } from './kids-profiles';

let unsubscribeChildren: (() => void) | null = null;

export function setupAuthListener() {
  return onAuthStateChanged(auth, (user: User | null) => {
    const store = useParentAuthStore.getState();
    if (user) {
      store.setFirebaseUser(user);
      if (unsubscribeChildren) unsubscribeChildren();
      unsubscribeChildren = listenToChildProfiles(user.uid);
    } else {
      store.logout();
      if (unsubscribeChildren) {
        unsubscribeChildren();
        unsubscribeChildren = null;
      }
    }
  });
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export async function loginAnonymously() {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Error logging in anonymously:", error);
    throw error;
  }
}

export async function logoutParent() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
