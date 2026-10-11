import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(ids, offset = 120) {
  const [active, setActiveState] = useState(ids[0]);
  const ignoreUntil = useRef(0);

  const setActive = (id, suppressScrollSpy = false) => {
    setActiveState(id);
    if (suppressScrollSpy) {
      ignoreUntil.current = performance.now() + 700;
    }
  };

  useEffect(() => {
    let raf = 0;

    const pick = () => {
      const y = Math.max(
        window.scrollY,
        document.documentElement.scrollTop,
        document.body.scrollTop,
      );
      if (performance.now() < ignoreUntil.current) return;
      if (y < 80) {
        setActiveState(ids[0]);
        return;
      }

      let best = null;
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= offset && top > bestTop) {
          best = id;
          bestTop = top;
        }
      }
      setActiveState(best || ids[0]);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pick);
    };

    document.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    pick();

    return () => {
      document.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ids.join('|'), offset]);

  return [active, setActive];
}

export default useScrollSpy;
