import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { slides } from '../data/alurSlides';

const INTERVAL = 4000;

/**
 * Shortest signed distance from index `i` to active index `a`
 * in a ring of `n` items.  e.g. rel(0,2,3) → -2 → wraps to 1
 */
const rel = (i, a, n) => {
  let d = (i - a) % n;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
};

/* ─── Placeholder card (browser-style wireframe) ────────────────── */
function Placeholder({ index }) {
  return (
    <div className="ac-placeholder" role="img" aria-label={slides[index].alt}>
      {/* Mini browser chrome */}
      <div className="ac-ph-chrome">
        <span className="ac-ph-dot" />
        <span className="ac-ph-dot" />
        <span className="ac-ph-dot" />
        <span className="ac-ph-url" />
      </div>
      {/* Skeleton lines */}
      <div className="ac-ph-body">
        <div className="ac-ph-line" style={{ width: '60%' }} />
        <div className="ac-ph-line" style={{ width: '85%' }} />
        <div className="ac-ph-line" style={{ width: '40%' }} />
        <div className="ac-ph-line" style={{ width: '72%' }} />
        <span className="ac-ph-label">Gambar halaman {index + 1}</span>
      </div>
    </div>
  );
}

/* ─── Slide card (placeholder or real image) ────────────────────── */
function Card({ s, i, active, neighbor }) {
  if (s.src == null) {
    return <Placeholder index={i} />;
  }
  return (
    <img
      className="ac-img"
      src={s.src}
      alt={s.alt}
      draggable={false}
      loading={active || neighbor ? 'eager' : 'lazy'}
    />
  );
}

/* ─── SVG chevron arrows ────────────────────────────────────────── */
function Chevron({ dir }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === 'l' ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  );
}



/* ═══════════════════════════════════════════════════════════════════
   AlurCarousel — coverflow carousel
   ═══════════════════════════════════════════════════════════════════ */
export default function AlurCarousel() {
  const n = slides.length;
  const root = useRef(null);
  const sx = useRef(null);
  const moved = useRef(false);

  const [a, setA] = useState(0);
  const [inView, setInView] = useState(true);
  const [hidden, setHidden] = useState(
    typeof document !== 'undefined' ? document.hidden : false
  );

  const reduce = useRef(
    typeof window !== 'undefined' &&
      matchMedia('(prefers-reduced-motion:reduce)').matches
  ).current;

  // Compute signed distances for every slide
  const ds = slides.map((_, i) => rel(i, a, n));

  // Keep previous distances so we can detect wrapping jumps
  const prev = useRef(ds);
  useLayoutEffect(() => {
    prev.current = ds;
  });

  // Navigate to slide index (wrapping)
  const go = useCallback((i) => setA(((i % n) + n) % n), [n]);

  /* ── Autoplay timer ──────────────────────────────────────────── */
  useEffect(() => {
    if (!inView || hidden || reduce) return;
    const id = setTimeout(() => setA((x) => (x + 1) % n), INTERVAL);
    return () => clearTimeout(id);
  }, [a, inView, hidden, reduce, n]);

  /* ── IntersectionObserver + visibilitychange ─────────────────── */
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);

    const vis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', vis);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', vis);
    };
  }, []);

  /* ── Pointer (mouse + touch) swipe ───────────────────────────── */
  const onDown = (e) => {
    sx.current = e.clientX;
    moved.current = false;
  };

  const onUp = (e) => {
    if (sx.current == null) return;
    const dx = e.clientX - sx.current;
    sx.current = null;
    if (Math.abs(dx) > 5) moved.current = true;
    if (Math.abs(dx) > 50) go(a + (dx < 0 ? 1 : -1));
  };

  const onCancel = () => {
    sx.current = null;
  };

  /* ── Render ──────────────────────────────────────────────────── */
  return (
    <section
      ref={root}
      className="ac"
      role="region"
      aria-roledescription="carousel"
      aria-label="Alur kerja Skorly"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(a + 1);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(a - 1);
        }
      }}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onCancel}
    >
      <div className="ac-stage">
        {slides.map((s, i) => {
          const d = ds[i];
          const jump = Math.abs(d - prev.current[i]) > 1;
          const isActive = d === 0;
          const isNeighbor = Math.abs(d) === 1;

          return (
            <div
              key={i}
              className="ac-slide"
              data-d={Math.abs(d) > 1 ? 'far' : String(d)}
              aria-hidden={!isActive}
              inert={!isActive ? '' : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${n}`}
              style={{
                '--d': d,
                transition: jump || reduce ? 'none' : undefined,
              }}
              onClick={() => {
                if (d !== 0 && !moved.current) go(a + d);
              }}
            >
              <Card s={s} i={i} active={isActive} neighbor={isNeighbor} />
            </div>
          );
        })}

        {/* Navigation arrows */}
        <button
          className="ac-arrow ac-arrow-l"
          aria-label="Slide sebelumnya"
          onClick={(e) => {
            e.stopPropagation();
            go(a - 1);
          }}
        >
          <Chevron dir="l" />
        </button>
        <button
          className="ac-arrow ac-arrow-r"
          aria-label="Slide berikutnya"
          onClick={(e) => {
            e.stopPropagation();
            go(a + 1);
          }}
        >
          <Chevron dir="r" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="ac-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === a ? 'true' : undefined}
            className={`ac-dot${i === a ? ' ac-dot-on' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              go(i);
            }}
          />
        ))}
      </div>
    </section>
  );
}

