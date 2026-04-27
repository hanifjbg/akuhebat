import { collection, doc, getDocs, setDoc, updateDoc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../core/firebase/config';
import { ChildProfile, useParentAuthStore } from '../../core/state/parent-store';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function listenToChildProfiles(parentId: string) {
  const path = `parents/${parentId}/children`;
  const childrenRef = collection(db, 'parents', parentId, 'children');
  const q = query(childrenRef);
  
  return onSnapshot(q, (snapshot) => {
    const children: ChildProfile[] = [];
    snapshot.forEach((docSnap) => {
      children.push({ id: docSnap.id, ...docSnap.data() } as ChildProfile);
    });
    useParentAuthStore.getState().setChildren(children);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
}

export async function createChildProfile(parentId: string, profile: Omit<ChildProfile, 'id' | 'parentId' | 'createdAt'>) {
  const path = `parents/${parentId}/children`;
  const childrenRef = collection(db, 'parents', parentId, 'children');
  const newChildRef = doc(childrenRef); // auto-generate ID
  const newChild: ChildProfile = {
    ...profile,
    id: newChildRef.id,
    parentId,
    createdAt: Date.now(),
  };
  try {
    await setDoc(newChildRef, newChild);
    return newChild;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateChildProfile(parentId: string, childId: string, data: Partial<ChildProfile>) {
  const path = `parents/${parentId}/children/${childId}`;
  const childRef = doc(db, 'parents', parentId, 'children', childId);
  try {
    await updateDoc(childRef, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteChildProfile(parentId: string, childId: string) {
  const path = `parents/${parentId}/children/${childId}`;
  const childRef = doc(db, 'parents', parentId, 'children', childId);
  try {
    await deleteDoc(childRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
