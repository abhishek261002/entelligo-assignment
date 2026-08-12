"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { User, ViewMode, SortConfig } from "@/types/user";
import { fetchAllUsers } from "@/lib/api/users";
import { useDebounce } from "./use-debounce";

const PAGE_SIZE = 12;

interface UseUserDirectoryReturn {
  // Data
  users: User[];
  filteredUsers: User[];
  paginatedUsers: User[];
  totalCount: number;
  // State
  isLoading: boolean;
  error: string | null;
  // Search & Sort
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  // View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  // Pagination
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
  // Actions
  refetch: () => void;
  clearSearch: () => void;
}

export function useUserDirectory(): UseUserDirectoryReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "firstName",
    order: "asc",
  });
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading users."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  // Reset to page 1 whenever search/sort changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortConfig]);

  const filteredUsers = useMemo<User[]>(() => {
    const q = debouncedSearch.toLowerCase().trim();

    let result = users;

    if (q) {
      result = result.filter(
        (u) =>
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.company.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.city.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      const aVal = a[sortConfig.key] ?? "";
      const bVal = b[sortConfig.key] ?? "";
      const comparison = aVal.localeCompare(bVal, undefined, {
        sensitivity: "base",
      });
      return sortConfig.order === "asc" ? comparison : -comparison;
    });

    return result;
  }, [users, debouncedSearch, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const paginatedUsers = useMemo<User[]>(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, page]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return {
    users,
    filteredUsers,
    paginatedUsers,
    totalCount: filteredUsers.length,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortConfig,
    setSortConfig,
    viewMode,
    setViewMode,
    page,
    totalPages,
    setPage,
    refetch: loadUsers,
    clearSearch,
  };
}
