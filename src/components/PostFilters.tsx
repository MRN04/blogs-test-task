"use client";

import { useBlogStore } from "@/store/useBlogStore";
import { SortOption } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, ArrowUpDown } from "lucide-react";

interface PostFiltersProps {
  resultsCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Спочатку новіші" },
  { value: "oldest", label: "Спочатку старіші" },
  { value: "popular", label: "За популярністю" },
];

export default function PostFilters({ resultsCount }: PostFiltersProps) {
  const { searchQuery, sortBy, setSearchQuery, setSortBy } = useBlogStore();

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Пошук за назвою, контентом, автором або тегами..."
            className="pl-10 h-11"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-[200px] h-11!">
            <ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Сортування" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {searchQuery && (
        <div className="flex items-center pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">
            Знайдено: <strong>{resultsCount}</strong>{" "}
            {resultsCount === 1 ? "пост" : resultsCount < 5 ? "пости" : "постів"}
          </span>
        </div>
      )}
    </div>
  );
}
