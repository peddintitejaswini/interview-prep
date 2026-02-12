import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

export const deleteInterview = async (interviewId: string) => {
  await deleteDoc(doc(db, "interviews", interviewId));
};
