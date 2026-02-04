"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Post } from "@/types";
import { useBlogStore } from "@/store/useBlogStore";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, sortBy } = useBlogStore();

  useEffect(() => {
    const fetchPosts = async (isInitial = false) => {
      try {
        // Показуємо loading тільки при першому завантаженні
        if (isInitial) {
          setLoading(true);
        }
        const data = await api.getPosts({
          search: searchQuery || undefined,
          sortBy: sortBy || undefined,
        });
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      } finally {
        if (isInitial) {
          setLoading(false);
        }
      }
    };

    // Перше завантаження з loading
    fetchPosts(true);

    // Оновлення кожні 10 секунд БЕЗ loading
    const interval = setInterval(() => fetchPosts(false), 10000);

    return () => clearInterval(interval);
  }, [searchQuery, sortBy]);

  return {
    posts,
    allPosts: posts,
    loading,
    hasFilters: searchQuery !== "" || sortBy !== "newest",
  };
}
