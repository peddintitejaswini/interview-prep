import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import type { JobDescription } from "@/types";

export const createJD = async (
  jdData: Omit<JobDescription, "id" | "createdAt" | "updatedAt">,
) => {
  const docRef = await addDoc(collection(db, "job-descriptions"), {
    ...jdData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const fetchUserJDs = (
  userId: string,
  callback: (jds: JobDescription[]) => void,
  onError?: (error: Error) => void,
) => {
  const q = query(
    collection(db, "job-descriptions"),
    where("userId", "==", userId),
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const jdList: JobDescription[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as JobDescription[];
      callback(jdList);
    },
    (error) => {
      console.error("Error fetching JDs:", error);
      if (onError) onError(error);
    },
  );

  return unsubscribe;
};

export const getJDById = async (
  jdId: string,
): Promise<JobDescription | null> => {
  const docRef = doc(db, "job-descriptions", jdId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as JobDescription;
  }

  return null;
};

export const updateJD = async (
  jdId: string,
  updates: Partial<Omit<JobDescription, "id" | "createdAt" | "updatedAt">>,
) => {
  await updateDoc(doc(db, "job-descriptions", jdId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

export const deleteJD = async (jdId: string) => {
  await deleteDoc(doc(db, "job-descriptions", jdId));
};
