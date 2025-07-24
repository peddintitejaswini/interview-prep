import type { FieldValue, Timestamp } from "firebase/firestore";

export interface User{
    id: String;
    name: String;
    email: String;
    imageUrl: String;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;

}

export interface Interview {
  id: string;
  position: string;
  description: string;
  experience: number;
  userId: string;
  techStack: string;
  questions: { question: string; answer: string }[];
  createdAt: Timestamp;
  updateAt: Timestamp;
}

export interface UserAnswer {
  id: string;
  mockIdRef: string;
  question: string;
  correct_ans: string;
  user_ans: string;
  feedback: string;
  rating: number;
  userId: string;
  createdAt: Timestamp;
  updateAt: Timestamp;
}