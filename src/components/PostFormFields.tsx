"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PostFormErrors } from "@/lib/validations";

interface PostFormFieldsProps {
  author: string;
  title: string;
  content: string;
  tagsInput: string;
  errors?: PostFormErrors;
  onAuthorChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onTagsChange: (value: string) => void;
}

export default function PostFormFields({
  author,
  title,
  content,
  tagsInput,
  errors = {},
  onAuthorChange,
  onTitleChange,
  onContentChange,
  onTagsChange,
}: PostFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="author">Автор</Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => onAuthorChange(e.target.value)}
          placeholder="Ваше ім'я"
          className={`h-11 ${errors.author ? "border-destructive" : ""}`}
          aria-invalid={!!errors.author}
        />
        {errors.author && (
          <p className="text-sm text-destructive">{errors.author}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Заголовок</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Введіть заголовок посту"
          className={`h-11 ${errors.title ? "border-destructive" : ""}`}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Контент</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Напишіть свій пост тут..."
          rows={4}
          className={`resize-none ${errors.content ? "border-destructive" : ""}`}
          aria-invalid={!!errors.content}
        />
        {errors.content && (
          <p className="text-sm text-destructive">{errors.content}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">
          Теги
          <span className="text-muted-foreground font-normal ml-1">
            (через кому, необов&apos;язково)
          </span>
        </Label>
        <Input
          id="tags"
          value={tagsInput}
          onChange={(e) => onTagsChange(e.target.value)}
          placeholder="технології, новини, думки"
          className="h-11"
        />
      </div>
    </div>
  );
}
