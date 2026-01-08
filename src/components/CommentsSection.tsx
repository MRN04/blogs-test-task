"use client";

import { useComments } from "@/hooks/useComments";
import { MessageCircle } from "lucide-react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface CommentsSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentsSectionProps) {
  const { comments, loading, addComment } = useComments(postId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-semibold">
          Коментарі {comments.length > 0 && `(${comments.length})`}
        </h3>
      </div>
      <CommentForm onSubmit={addComment} />
      <div className="pt-2">
        <CommentList comments={comments} loading={loading} />
      </div>
    </div>
  );
}
