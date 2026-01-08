import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Timestamp;
  tags: string[];
  likes: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: Timestamp;
}

export type SortOption = "newest" | "oldest" | "popular";
