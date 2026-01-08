"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post } from "@/types";


export function usePost(postId: string | null) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setLoading(false);
      return;
    }

    const ref = doc(db, "posts", postId);

    const unsubscribe = onSnapshot(
      ref,
      snap => {
        if (!snap.exists()) {
          setPost(null);
          setError("Post not found");
        } else {
          setPost({
            id: snap.id,
            ...(snap.data() as Omit<Post, "id">),
          });
          setError(null);
        }
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  return { post, loading, error };
}
