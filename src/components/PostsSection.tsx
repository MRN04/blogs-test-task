"use client";

import { usePosts } from "@/hooks/usePosts";
import PostFilters from "./PostFilters";
import PostList from "./PostList";

export default function PostsSection() {
  const { posts, loading, hasFilters } = usePosts();

  return (
    <>
      <PostFilters resultsCount={posts.length} />
      <PostList posts={posts} loading={loading} hasFilters={hasFilters} />
    </>
  );
}
