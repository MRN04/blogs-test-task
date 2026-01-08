"use client";

import { Post } from "@/types";
import PostCard from "./PostCard";
import { Skeleton } from "./ui/skeleton";
import { useBlogStore } from "@/store/useBlogStore";
import { SearchX } from "lucide-react";
import { Button } from "./ui/button";

interface PostListProps {
  posts: Post[];
  loading: boolean;
  hasFilters: boolean;
}

export default function PostList({ posts, loading, hasFilters }: PostListProps) {
  const { selectPostId, clearFilters } = useBlogStore();

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-48 bg-card" />
        ))}
      </div>
    );
  }

  if (posts.length === 0 && hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Нічого не знайдено</h3>
        <p className="text-muted-foreground text-center max-w-sm mb-4">
          Спробуйте змінити параметри пошуку або очистити фільтри
        </p>
        <Button variant="outline" onClick={clearFilters}>
          Очистити фільтри
        </Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-card border-2 border-dashed border-border flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Поки що немає постів</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Натисніть кнопку &quot;Новий пост&quot; щоб створити свій перший запис
          у блозі
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => selectPostId(post.id)}
          index={index}
        />
      ))}
    </div>
  );
}
