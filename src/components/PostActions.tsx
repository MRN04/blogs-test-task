"use client";

import { Button } from "@/components/ui/button";
import { HeartIcon, X, Trash2 } from "lucide-react";
import { useState } from "react";

interface PostActionsProps {
  likes: number;
  isLiked: boolean;
  onLikeClick: () => void;
  onClose: () => void;
  isAuthor?: boolean;
  onDelete?: () => void;
}

export default function PostActions({
  likes,
  isLiked,
  onLikeClick,
  onClose,
  isAuthor = false,
  onDelete
}: PostActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    if (confirm("Ви впевнені, що хочете видалити цей пост?")) {
      setIsDeleting(true);
      try {
        await onDelete();
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={onLikeClick}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary hover:bg-transparent"
        >
          {likes > 0 ? likes : 0}
          <HeartIcon className={`w-5 h-5 ${isLiked ? "fill-primary text-primary" : ""}`} />
          <span className="text-sm font-medium">Подобається</span>
        </Button>

        {isAuthor && onDelete && (
          <Button
            variant="ghost"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isDeleting ? "Видалення..." : "Видалити"}
            </span>
          </Button>
        )}
      </div>

      <Button variant="secondary" onClick={onClose}>
        <X className="w-4 h-4" />
        Закрити
      </Button>
    </>
  );
}
