import { collection, doc, getDocs, setDoc, updateDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../core/firebase/config';
import { ChildProfile, useParentAuthStore } from '../../core/state/parent-store';

export function listenToChildProfiles(parentId: string) {
  const childrenRef = collection(db, 'parents', parentId, 'children');
  const q = query(childrenRef);
  
  return onSnapshot(q, (snapshot) => {
    const children: ChildProfile[] = [];
    snapshot.forEach((docSnap) => {
      children.push({ id: docSnap.id, ...docSnap.data() } as ChildProfile);
    });
    useParentAuthStore.getState().setChildren(children);
  });
}

export async function createChildProfile(parentId: string, profile: Omit<ChildProfile, 'id' | 'parentId' | 'createdAt'>) {
  const childrenRef = collection(db, 'parents', parentId, 'children');
  const newChildRef = doc(childrenRef); // auto-generate ID
  const newChild: ChildProfile = {
    ...profile,
    id: newChildRef.id,
    parentId,
    createdAt: Date.now(),
  };
  await setDoc(newChildRef, newChild);
  return newChild;
}

export async function updateChildProfile(parentId: string, childId: string, data: Partial<ChildProfile>) {
  const childRef = doc(db, 'parents', parentId, 'children', childId);
  await updateDoc(childRef, data);
}
