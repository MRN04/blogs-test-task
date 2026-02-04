"use client";

import { useState } from "react";
import { useBlogStore } from "@/store/useBlogStore";
import { api } from "@/lib/api";
import { postFormSchema, PostFormErrors } from "@/lib/validations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { PenLine, X } from "lucide-react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import PostFormFields from "./PostFormFields";
import PostFormActions from "./PostFormActions";

export default function PostForm() {
  const { isFormOpen, closeForm } = useBlogStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [errors, setErrors] = useState<PostFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const validateForm = (): boolean => {
    const result = postFormSchema.safeParse({
      title: title.trim(),
      content: content.trim(),
      tagsInput: tagsInput.trim(),
    });

    if (!result.success) {
      const fieldErrors: PostFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PostFormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    try {
      await api.createPost({
        title: title.trim(),
        content: content.trim(),
        tags: tags.length > 0 ? tags : undefined,
      });

      resetForm();
      closeForm();
      window.location.reload();
    } catch (error: any) {
      console.error("Error adding post:", error);
      alert(error.message || "Помилка при створенні поста");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTagsInput("");
    setErrors({});
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeForm();
      setErrors({});
    }
  };

  // Clear error when field changes
  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
  };

  const isValid = title.trim() !== "" && content.trim() !== "";

  // Mobile: Drawer
  if (isMobile) {
    return (
      <Drawer open={isFormOpen} onOpenChange={handleOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader className="relative pb-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center mb-2">
              <PenLine className="w-6 h-6 text-white" />
            </div>
            <DrawerTitle className="text-xl font-bold text-center">
              Створити новий пост
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Поділіться своїми думками з усіма
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-2 overflow-y-auto flex-1">
            <PostFormFields
              title={title}
              content={content}
              tagsInput={tagsInput}
              errors={errors}
              onTitleChange={handleTitleChange}
              onContentChange={handleContentChange}
              onTagsChange={setTagsInput}
            />
          </div>

          <DrawerFooter className="flex-row gap-3 pt-2">
            <PostFormActions
              isValid={isValid}
              isSubmitting={isSubmitting}
              onCancel={closeForm}
              onSubmit={handleSubmit}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop: Dialog
  return (
    <Dialog open={isFormOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-xl p-0 bg-card border-card-border overflow-hidden"
        showCloseButton={false}
      >
        <div className="h-24 bg-linear-to-br from-primary via-accent to-accent-light relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <PenLine className="w-7 h-7 text-white" />
            </div>
          </div>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
        </div>

        <div className="px-6 pb-6 -mt-2">
          <DialogHeader className="text-center mb-6">
            <DialogTitle className="text-2xl font-bold">
              Створити новий пост
            </DialogTitle>
            <DialogDescription>
              Поділіться своїми думками з усіма
            </DialogDescription>
          </DialogHeader>

          <PostFormFields
            title={title}
            content={content}
            tagsInput={tagsInput}
            errors={errors}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onTagsChange={setTagsInput}
          />

          <DialogFooter className="pt-4 gap-3 sm:gap-3">
            <PostFormActions
              isValid={isValid}
              isSubmitting={isSubmitting}
              onCancel={closeForm}
              onSubmit={handleSubmit}
            />
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
