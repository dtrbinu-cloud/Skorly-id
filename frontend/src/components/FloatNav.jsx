import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import Icon from './ui/Icon';
import useNavShrink from './useNavShrink';
import useScrollSpy from '../hooks/useScrollSpy';

/* ---- constants ---- */
const NAV_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Keunggulan', href: '#keunggulan' },
  { label: 'Alur Kerja', href: '#cara' },
  { label: 'Fitur', href: '#fitur' },
];
const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function FloatNav() {
  const { user } = useAuth();
  const ref = useRef(null);
  useNavShrink(ref);
  const [activeId, setActive] = useScrollSpy(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  /* refs for measuring link pill indicator */
  const linkRefs = useRef({});
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [indicatorReady, setIndicatorReady] = useState(false);

  /* ---- measure active link for pill indicator ---- */
  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const el = linkRefs.current[activeId];
    if (!nav || !indicator || !el) return undefined;

    const apply = (initial = false) => {
      if (initial) indicator.style.transition = 'none';
      indicator.style.transform = `translateX(${el.offsetLeft}px) translateY(-50%)`;
      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.opacity = '1';
      if (initial) {
        requestAnimationFrame(() => {
          if (indicator) indicator.style.transition = '';
        });
      }
      setIndicatorReady(true);
    };

    apply(!indicatorReady);
    window.addEventListener('resize', apply);
    document.fonts?.ready?.then(() => apply());

    return () => {
      window.removeEventListener('resize', apply);
    };
  }, [activeId, indicatorReady]);

  /* ---- nav link click ---- */
  const handleClick = (e, id) => {
    e.preventDefault();
    setActive(id, true);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  /* ---- close menu on Esc ---- */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [menuOpen]);

  /* ---- user info ---- */
  const firstName = user?.nama?.split(' ')[0] || '';
  const initials = user
    ? user.nama
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '';
  const loginHref = user ? '/dashboard' : '/masuk';

  return (
    <header ref={ref} className="fnav">
      <div className="fnav-pill">
        {/* ===== LEFT: Logo + Status ===== */}
        <div className="fnav-left">
          <a href="#beranda" className="fnav-logo" onClick={(e) => handleClick(e, 'beranda')}>
            <span className="fnav-logo-box">
              <Icon name="verified" filled className="fnav-logo-icon" />
            </span>
            <span className="fnav-logo-text">
              Skorly<span className="fnav-logo-dot">.id</span>
            </span>
          </a>
          <span
            className="fnav-status"
            aria-label="Siap digunakan"
            title="Siap digunakan"
          >
            <span className="fnav-status-dot" />
          </span>
        </div>

        {/* ===== CENTER: Links (desktop) ===== */}
        <nav
          ref={navRef}
          className="fnav-center"
          aria-label="Navigasi utama"
        >
          {/* sliding pill indicator */}
          <span ref={indicatorRef} className="fnav-indicator" aria-hidden="true" />
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={id}
                ref={(el) => {
                  linkRefs.current[id] = el;
                }}
                href={link.href}
                className={`fnav-link${isActive ? ' fnav-link-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => handleClick(e, id)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* ===== RIGHT: Login + Avatar + Hamburger ===== */}
        <div className="fnav-right">
          <Link to={loginHref} className="fnav-login">
            {user ? firstName : 'Masuk'}
          </Link>
          <Link
            to={user ? '/dashboard' : '/masuk'}
            className="fnav-avatar"
            aria-label={user ? `Profil ${firstName}` : 'Masuk ke akun'}
          >
            {user ? (
              <span className="fnav-avatar-initials">{initials}</span>
            ) : (
              <Icon name="person" className="fnav-avatar-icon" />
            )}
          </Link>

          {/* Hamburger (mobile only) */}
          <button
            className="fnav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="fnav-mobile-menu"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* ===== MOBILE DROPDOWN ===== */}
      <div
        id="fnav-mobile-menu"
        className={`fnav-mobile${menuOpen ? ' fnav-mobile-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Navigasi utama (mobile)">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={id}
                href={link.href}
                className={`fnav-mlink${isActive ? ' fnav-mlink-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={(e) => handleClick(e, id)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
