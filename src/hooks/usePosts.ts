"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Post } from "@/types";
import { useBlogStore } from "@/store/useBlogStore";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery, sortBy } = useBlogStore();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    // First, filter by search query
    let result = posts.filter((post) => {
      if (searchQuery === "") return true;

      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });

    // Then, sort based on sortBy option
    switch (sortBy) {
      case "oldest":
        result = [...result].sort(
          (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
        );
        break;
      case "popular":
        result = [...result].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "newest":
      default:
        // Already sorted by newest from Firebase
        break;
    }

    return result;
  }, [posts, searchQuery, sortBy]);

  return {
    posts: filteredPosts,
    allPosts: posts,
    loading,
    hasFilters: searchQuery !== "" || sortBy !== "newest",
  };
}
