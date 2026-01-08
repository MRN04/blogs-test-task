"use client";

import { Button } from "@/components/ui/button";
import { HeartIcon, X } from "lucide-react";

interface PostActionsProps {
  likes: number;
  isLiked: boolean;
  onLikeClick: () => void;
  onClose: () => void;
}

export default function PostActions({ likes, isLiked, onLikeClick, onClose }: PostActionsProps) {
  return (
    <>
      <Button
        variant="ghost"
        onClick={onLikeClick}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-transparent"
      >
        {likes > 0 ? likes : 0}
        <HeartIcon className={`w-5 h-5 ${isLiked ? "fill-primary text-primary" : ""}`} />
        <span className="text-sm font-medium">Подобається</span>
      </Button>
      <Button variant="secondary" onClick={onClose}>
        <X className="w-4 h-4" />
        Закрити
      </Button>
    </>
  );
}
