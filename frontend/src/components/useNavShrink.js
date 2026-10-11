import { useEffect } from 'react';

export function useNavShrink(ref, { range = 140, ease = 0.14 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = (event) => Math.max(
      window.scrollY,
      document.documentElement.scrollTop,
      document.body.scrollTop,
      event?.target?.scrollTop || 0,
    );
    const clamp = (y) => Math.min(1, Math.max(0, y / range));
    let cur = clamp(top());
    let tgt = cur;
    let raf = 0;
    let last = 0;

    const apply = () => el.style.setProperty('--p', cur.toFixed(4));
    const tick = (time) => {
      const dt = last ? Math.min(48, time - last) : 16.7;
      last = time;
      cur += (tgt - cur) * (1 - Math.pow(1 - ease, dt / 16.7));
      if (Math.abs(tgt - cur) < 0.002) cur = tgt;
      apply();
      if (cur !== tgt) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        last = 0;
      }
    };
    const aim = (event) => {
      tgt = clamp(top(event));
      if (reduce) {
        cur = tgt;
        apply();
        return;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

    apply();
    document.addEventListener('scroll', aim, { passive: true, capture: true });
    return () => {
      document.removeEventListener('scroll', aim, true);
      cancelAnimationFrame(raf);
    };
  }, [ref, range, ease]);
}

export default useNavShrink;
