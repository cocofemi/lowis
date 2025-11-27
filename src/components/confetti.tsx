import { useEffect } from "react";
import confetti from "canvas-confetti";

export function Confetti({ duration = 7000 }: { duration?: number }) {
  useEffect(() => {
    let frame: number;
    const end = Date.now() + duration;

    const shoot = () => {
      // stop after timeout
      if (Date.now() > end) return;

      // Left side burst
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        zIndex: 9999,
      });

      // Right side burst
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        zIndex: 9999,
      });

      frame = requestAnimationFrame(shoot);
    };

    frame = requestAnimationFrame(shoot);

    return () => cancelAnimationFrame(frame);
  }, [duration]);
  return null;
}
