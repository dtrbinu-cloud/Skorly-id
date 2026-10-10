import { Outlet } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-16 bg-surface-canvas min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
