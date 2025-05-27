"use client";

import { useState, useEffect } from "react";

interface DebounceOptions<T> {
  value: T;
  delay?: number;
}

export const useDebounce = <T>(props: DebounceOptions<T>): T => {
  const { value, delay = 500 } = props;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
