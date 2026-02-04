"use client";

import { useBlogStore } from "@/store/useBlogStore";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PenLine, Plus, X, User, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import Link from "next/link";

export default function Header() {
	const { isFormOpen, toggleForm } = useBlogStore();
	const { user } = useAuth();

	const handleLogout = async () => {
		try {
			api.logout();
			window.location.href = "/";
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
			<div className="max-w-6xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link href="/home" className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
							<PenLine className="w-5 h-5 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
								Блог
							</h1>
							<p className="text-xs text-muted-foreground">Діліться думками</p>
						</div>
					</Link>

					<div className="flex items-center gap-3">
						<Button
							onClick={toggleForm}
							variant={isFormOpen ? "secondary" : "default"}
							className="rounded-full px-5 py-2.5 h-auto"
						>
							{isFormOpen ? (
								<X className="w-5 h-5 transition-transform duration-300" />
							) : (
								<Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
							)}
							<span>{isFormOpen ? "Закрити" : "Новий пост"}</span>
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="w-10 h-10 rounded-full bg-card border border-card-border hover:border-primary/50 transition-colors"
								>
									<User className="w-5 h-5 text-white" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								{user && (
									<>
										<div className="px-2 py-2">
											<p className="text-sm font-medium truncate">{user.name}</p>
											<p className="text-xs text-muted-foreground truncate">{user.email}</p>
										</div>
										<DropdownMenuSeparator />
									</>
								)}
								<DropdownMenuItem asChild>
									<Link href="/profile" className="flex items-center gap-2 cursor-pointer">
										<UserCircle className="w-4 h-4" />
										<span>Профіль</span>
									</Link>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onClick={handleLogout}
									className="text-destructive focus:text-destructive cursor-pointer"
								>
									<LogOut className="w-4 h-4" />
									<span>Вийти</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
