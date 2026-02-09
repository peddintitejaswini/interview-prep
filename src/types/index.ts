import type { FieldValue, Timestamp } from "firebase/firestore";

export interface User {
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

export interface JobDescription {
  id: string;
  title: string; // Job position/title
  description: string; // Full JD text
  techStack: string; // Required technologies
  experience: number; // Years required (optional)
  source: "manual" | "interview"; // Where it came from
  interviewId?: string; // Reference to interview if applicable
  userId: string;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

export interface RoadmapItem {
  week?: number; // Week number in the timeline
  topic: string; // What to learn
  subtopics: string[]; // Breakdown of topics
  estimatedHours: number; // Time needed
  priority: "high" | "medium" | "low";
  resources?: string[]; // Learning resources
}

export interface Roadmap {
  id: string;
  jdId: string; // Reference to JobDescription
  userId: string;
  totalWeeks: number; // Calculated from time remaining
  timeRemaining: number; // Days remaining
  generatedDate: Timestamp | FieldValue;
  roadmapItems: RoadmapItem[]; // The actual roadmap
  jobTitle: string; // Denormalized for quick access
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}
