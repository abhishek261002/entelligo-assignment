"use client";

import { useState, useEffect } from "react";

/**
 * Debounce a value by `delay` ms.
 * Returns the debounced value — updates only after the input
 * has stopped changing for `delay` milliseconds.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
