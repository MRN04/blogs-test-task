"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Post } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Mail,
  Calendar,
  FileText,
  Heart,
  MessageSquare,
  Edit,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import PostCard from "./PostCard";
import { useBlogStore } from "@/store/useBlogStore";

export default function ProfileContent() {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    postsCount: 0,
    totalLikes: 0,
    totalComments: 0,
  });
  const { selectPostId, openForm } = useBlogStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const allPosts = await api.getPosts();
        const myPosts = allPosts.filter((post) => post.authorId === user.id);
        setUserPosts(myPosts);

        const totalLikes = myPosts.reduce(
          (sum, post) => sum + (post._count?.likes || 0),
          0
        );
        const totalComments = myPosts.reduce(
          (sum, post) => sum + (post._count?.comments || 0),
          0
        );

        setStats({
          postsCount: myPosts.length,
          totalLikes,
          totalComments,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      {/* Профіль header */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary via-accent to-accent-light" />
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16 md:-mt-12">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Приєднався {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Редагувати профіль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Пости
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.postsCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Лайки отримані
            </CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalLikes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Коментарі отримані
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalComments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Мої пости */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Мої пости
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : userPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                У вас ще немає постів
              </h3>
              <p className="text-muted-foreground mb-6">
                Створіть свій перший пост і поділіться думками!
              </p>
              <Button onClick={openForm}>Створити пост</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {userPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onClick={() => selectPostId(post.id)}
                  index={index}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
