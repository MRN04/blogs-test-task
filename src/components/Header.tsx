"use client";

import { useBlogStore } from "@/store/useBlogStore";
import { Button } from "@/components/ui/button";
import { PenLine, Plus, X } from "lucide-react";

export default function Header() {
	const { isFormOpen, toggleForm } = useBlogStore();

	return (
		<header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
			<div className="max-w-6xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
							<PenLine className="w-5 h-5 text-white" />
						</div>
						<div>
							<h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
								Блог
							</h1>
							<p className="text-xs text-muted-foreground">Діліться думками</p>
						</div>
					</div>

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
				</div>
			</div>
		</header>
	);
}
