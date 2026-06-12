import { useState, createContext, useContext, type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import AdminPanel from './AdminPanel';

interface AdminContextType {
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdminOpen: false,
  openAdmin: () => {},
  closeAdmin: () => {},
});

export const useAdmin = () => useContext(AdminContext);

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const openAdmin = () => setIsAdminOpen(true);
  const closeAdmin = () => setIsAdminOpen(false);

  return (
    <AdminContext.Provider value={{ isAdminOpen, openAdmin, closeAdmin }}>
      <div className="min-h-[100dvh] flex flex-col">
        <Navbar onAdminClick={openAdmin} />
        <main className="flex-1 pt-16 md:pt-[72px]">{children}</main>
        <Footer />
        <ScrollToTop />
        <AdminPanel isOpen={isAdminOpen} onClose={closeAdmin} />
      </div>
    </AdminContext.Provider>
  );
}
