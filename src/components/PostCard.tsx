"use client";

import { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import PostTags from "./PostTags";

interface PostCardProps {
	post: Post;
	onClick: () => void;
	index: number;
}

export default function PostCard({ post, onClick, index }: PostCardProps) {
	return (
		<Card
			onClick={onClick}
			style={{ animationDelay: `${index * 100}ms` }}
			className="group cursor-pointer py-0 gap-0 max-w-full bg-card transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30 animate-fade-in opacity-0"
		>
			<CardHeader className="pb-0 pt-6">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<Avatar className="w-10 h-10">
							<AvatarFallback className="bg-linear-to-br from-accent to-accent-light text-white font-semibold text-sm">
								{post.author.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium text-sm">{post.author}</p>
							<p className="text-xs text-muted-foreground">
								{formatDate(post.createdAt)}
							</p>
						</div>
					</div>
					<ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
				</div>
			</CardHeader>

			<CardContent className="pt-4 pb-6">
				<h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
					{post.title}
				</h2>
				<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
					{post.content}
				</p>
				<PostTags tags={post.tags} limit={3} />
			</CardContent>
		</Card>
	);
}
