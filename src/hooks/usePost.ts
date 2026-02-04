"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Post } from "@/types";

export function usePost(postId: string | null) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setPost(null);
      setLoading(false);
      return;
    }

    const fetchPost = async (isInitial = false) => {
      try {
        if (isInitial) {
          setLoading(true);
        }
        const data = await api.getPost(postId);
        setPost(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to fetch post");
        setPost(null);
      } finally {
        if (isInitial) {
          setLoading(false);
        }
      }
    };

    // Перше завантаження з loading
    fetchPost(true);

    // Оновлення кожні 5 секунд БЕЗ loading (для лайків і коментарів)
    const interval = setInterval(() => fetchPost(false), 5000);

    return () => clearInterval(interval);
  }, [postId]);

  return { post, loading, error };
}
