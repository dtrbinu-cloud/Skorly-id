import { useState, useEffect, useRef } from 'react';

/**
 * Returns `true` when scrollY crosses `onAt` downward,
 * and `false` when scrollY drops below `offAt`.
 * Uses requestAnimationFrame to coalesce scroll events.
 */
export default function useScrolled(onAt = 24, offAt = 8) {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > onAt : false
  );
  const raf = useRef(0);

  useEffect(() => {
    const handler = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled((prev) => {
          if (!prev && y > onAt) return true;
          if (prev && y < offAt) return false;
          return prev;
        });
        raf.current = 0;
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler(); // initial check
    return () => {
      window.removeEventListener('scroll', handler);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onAt, offAt]);

  return scrolled;
}
