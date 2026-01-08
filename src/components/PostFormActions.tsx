"use client";

import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

interface PostFormActionsProps {
  isValid: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function PostFormActions({ isValid, isSubmitting, onCancel, onSubmit }: PostFormActionsProps) {
  return (
    <>
      <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
        Скасувати
      </Button>
      <Button 
        type="submit" 
        className="flex-1" 
        onClick={onSubmit} 
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {isSubmitting ? "Публікація..." : "Опублікувати"}
      </Button>
    </>
  );
}
