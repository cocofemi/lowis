"use client";

import { useEffect, useState, useCallback } from "react";

export function useOtpTimer(initialSeconds: number = 30) {
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);

  const start = useCallback(() => {
    const target = Date.now() + initialSeconds * 1000;
    setExpiresAt(target);
  }, [initialSeconds]);

  const extend = useCallback((extraSeconds: number = 30) => {
    const extended = Date.now() + extraSeconds * 1000;
    setExpiresAt(extended);
  }, []);

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setSecondsLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return {
    secondsLeft,
    start,
    extend,
    isExpired: secondsLeft <= 0,
  };
}
