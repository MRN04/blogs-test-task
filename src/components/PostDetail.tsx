"use client";

import { formatDateTime } from "@/lib/utils";
import { useBlogStore } from "@/store/useBlogStore";
import { Loader2, X } from "lucide-react";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePost } from "@/hooks/usePost";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useAuth } from "@/hooks/useAuth";
import PostActions from "./PostActions";
import PostTags from "./PostTags";
import CommentsSection from "./CommentsSection";
import { api } from "@/lib/api";

export default function PostDetail() {
  const { clearSelectedPostId, selectedPostId } = useBlogStore();
  const isMobile = useIsMobile();
  const { post, loading } = usePost(selectedPostId);
  const { user } = useAuth();

  const handleLikeClick = async () => {
    if (!selectedPostId || !post) return;

    try {
      await api.toggleLike(selectedPostId);
      // Post will be re-fetched by the hook
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedPostId) return;

    try {
      await api.deletePost(selectedPostId);
      clearSelectedPostId();
      // Показуємо повідомлення про успіх
      alert('Пост успішно видалено!');
      window.location.reload();
    } catch (error: any) {
      console.error('Error deleting post:', error);
      alert(error.message || 'Помилка при видаленні поста');
    }
  };

  const isAuthor = user && post && user.id === post.authorId;

  const handleOpenChange = (open: boolean) => {
    if (!open) clearSelectedPostId();
  };

  const loadingContent = (
    <div className="flex items-center justify-center h-48">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );

  const hiddenTitle = <span className="sr-only">Завантаження посту...</span>;

  const postContent = post && (
    <>
      <PostTags tags={post.tags} className="mb-4" />
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      <div className="border-t border-border pt-6">
        <CommentsSection postId={post.id} />
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={!!selectedPostId} onOpenChange={handleOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          {loading ? (
            <>
              <DrawerTitle>{hiddenTitle}</DrawerTitle>
              {loadingContent}
            </>
          ) : (
            post && (
              <>
                <div className="px-4 pt-2 pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12 rounded-xl">
                      <AvatarFallback className="rounded-xl bg-linear-to-br from-secondary to-accent text-white text-lg font-bold">
                        {post.author.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{post.author.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(post.createdAt)}
                      </p>
                    </div>
                  </div>
                  <DrawerTitle className="text-2xl font-bold mb-4 leading-tight">
                    {post.title}
                  </DrawerTitle>
                </div>
                <div className="px-4 pb-4 overflow-y-auto flex-1">{postContent}</div>
                <DrawerFooter className="border-t border-border flex-row justify-between">
                  <PostActions
                    likes={post._count.likes || 0}
                    isLiked={post.isLiked || false}
                    onLikeClick={handleLikeClick}
                    onClose={clearSelectedPostId}
                    isAuthor={isAuthor || false}
                    onDelete={handleDelete || undefined}
                  />
                </DrawerFooter>
              </>
            )
          )}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={!!selectedPostId} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-2xl p-0 bg-card border-card-border overflow-hidden max-h-[85vh] flex flex-col"
        showCloseButton={false}
      >
        {loading ? (
          <>
            <DialogTitle>{hiddenTitle}</DialogTitle>
            {loadingContent}
          </>
        ) : (
          post && (
            <>
              <div className="px-8 pt-8 border-b border-border flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-linear-to-br from-primary to-accent text-white font-semibold">
                      {post.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{post.author.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(post.createdAt)}
                    </span>
                  </div>
                </div>
                <DialogTitle className="text-2xl font-bold mb-4 leading-tight pr-8">
                  {post.title}
                </DialogTitle>
              </div>
              <div className="px-8 py-6 overflow-y-auto flex-1">{postContent}</div>
              <div className="px-8 py-4 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <PostActions
                    likes={post._count.likes || 0}
                    isLiked={post.isLiked || false}
                    onLikeClick={handleLikeClick}
                    onClose={clearSelectedPostId}
                    isAuthor={isAuthor || false}
                    onDelete={handleDelete || undefined}
                  />
                </div>
              </div>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 w-9 h-9 rounded-full hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </Button>
              </DialogClose>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
