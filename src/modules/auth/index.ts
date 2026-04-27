import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../core/firebase/config';
import { useParentAuthStore } from '../../core/state/parent-store';

export function setupAuthListener() {
  return onAuthStateChanged(auth, (user: User | null) => {
    const store = useParentAuthStore.getState();
    if (user) {
      // Need to fetch children from Firestore in a real implementation
      store.setFirebaseUser(user);
    } else {
      store.logout();
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

export async function logoutParent() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
  }
}
