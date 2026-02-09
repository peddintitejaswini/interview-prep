import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import type { Roadmap } from "@/types";

export const createRoadmap = async (
  roadmapData: Omit<
    Roadmap,
    "id" | "createdAt" | "updatedAt" | "generatedDate"
  >,
) => {
  const docRef = await addDoc(collection(db, "roadmaps"), {
    ...roadmapData,
    generatedDate: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const fetchUserRoadmaps = (
  userId: string,
  callback: (roadmaps: Roadmap[]) => void,
  onError?: (error: Error) => void,
) => {
  const q = query(collection(db, "roadmaps"), where("userId", "==", userId));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const roadmapList: Roadmap[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Roadmap[];
      callback(roadmapList);
    },
    (error) => {
      console.error("Error fetching roadmaps:", error);
      if (onError) onError(error);
    },
  );

  return unsubscribe;
};

export const getRoadmapById = async (
  roadmapId: string,
): Promise<Roadmap | null> => {
  const docRef = doc(db, "roadmaps", roadmapId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Roadmap;
  }

  return null;
};

export const getRoadmapsByJdId = async (jdId: string): Promise<Roadmap[]> => {
  const q = query(collection(db, "roadmaps"), where("jdId", "==", jdId));

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Roadmap[];
};

export const deleteRoadmap = async (roadmapId: string) => {
  await deleteDoc(doc(db, "roadmaps", roadmapId));
};
