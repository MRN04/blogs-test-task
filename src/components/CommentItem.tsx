"use client";

import { Comment } from "@/types";
import { formatShortDate } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex gap-3">
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className="bg-secondary/20 text-secondary text-xs font-medium">
          {comment.author.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatShortDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-foreground/80 whitespace-pre-wrap wrap-break-word">
          {comment.content}
        </p>
      </div>
    </div>
  );
}
