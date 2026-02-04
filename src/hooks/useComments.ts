"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Comment } from "@/types";

export function useComments(postId: string | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      return;
    }

    const fetchComments = async (isInitial = false) => {
      try {
        if (isInitial) {
          setLoading(true);
        }
        const data = await api.getComments(postId);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        if (isInitial) {
          setLoading(false);
        }
      }
    };

    // Перше завантаження з loading
    fetchComments(true);

    // Оновлення кожні 5 секунд БЕЗ loading
    const interval = setInterval(() => fetchComments(false), 5000);

    return () => clearInterval(interval);
  }, [postId]);

  const addComment = async (content: string) => {
    if (!postId || !content.trim()) return;

    try {
      await api.createComment({
        postId,
        content: content.trim(),
      });

      // Refresh comments after adding (без loading)
      const data = await api.getComments(postId);
      setComments(data);
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  return { comments, loading, addComment };
}
