import { create } from "zustand";
import { SortOption } from "@/types";

interface BlogState {
  // UI State
  isFormOpen: boolean;
  selectedPostId: string | null;

  // Filter State
  searchQuery: string;
  sortBy: SortOption;

  // Actions
  openForm: () => void;
  closeForm: () => void;
  toggleForm: () => void;
  selectPostId: (id: string) => void;
  clearSelectedPostId: () => void;

  // Filter Actions
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: SortOption) => void;
  clearFilters: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  // Initial state
  isFormOpen: false,
  selectedPostId: null,
  searchQuery: "",
  sortBy: "newest",

  // Actions
  openForm: () => set({ isFormOpen: true }),
  closeForm: () => set({ isFormOpen: false }),
  toggleForm: () => set((state) => ({ isFormOpen: !state.isFormOpen })),
  selectPostId: (id) => set({ selectedPostId: id }),
  clearSelectedPostId: () => set({ selectedPostId: null }),

  // Filter Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  clearFilters: () => set({ searchQuery: "", sortBy: "newest" }),
}));
