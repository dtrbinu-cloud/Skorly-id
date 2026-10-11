import { Outlet } from 'react-router-dom';
import FloatNav from '../components/FloatNav';
import Footer from '../components/landing/Footer';

export default function PublicLayout() {
  return (
    <>
      <FloatNav />
      <main className="w-full bg-surface-canvas min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
