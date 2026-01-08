"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface CommentFormProps {
  onSubmit: (author: string, content: string) => Promise<void>;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(author, content);
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = author.trim() && content.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Ваше ім'я"
        className="h-10"
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Напишіть коментар..."
        rows={3}
        className="resize-none"
      />
      <Button type="submit" disabled={!isValid || isSubmitting} size="sm" className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isSubmitting ? "Надсилання..." : "Надіслати"}
      </Button>
    </form>
  );
}
