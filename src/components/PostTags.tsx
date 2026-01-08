"use client";

import { Badge } from "@/components/ui/badge";

interface PostTagsProps {
  tags: string[];
  limit?: number;
  className?: string;
}

export default function PostTags({ tags, limit, className = "" }: PostTagsProps) {
  if (tags.length === 0) return null;

  const displayTags = limit ? tags.slice(0, limit) : tags;
  const remainingCount = limit && tags.length > limit ? tags.length - limit : 0;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTags.map((tag, i) => (
        <Badge
          key={i}
          variant="outline"
          className="px-3 py-1 text-sm font-medium bg-accent/10 text-accent border-accent/20"
        >
          #{tag}
        </Badge>
      ))}
      {remainingCount > 0 && (
        <Badge variant="secondary" className="bg-secondary/10 text-secondary">
          +{remainingCount}
        </Badge>
      )}
    </div>
  );
}
