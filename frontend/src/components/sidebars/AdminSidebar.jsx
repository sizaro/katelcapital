// src/components/sidebars/AdminSidebar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarFooter from '../common/SidebarFooter';
import { useData } from '../../context/DataContext';

export default function AdminSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();
  const { pendingCount, fetchAdminTasks } = useData(); // Replace with your Admin-specific fetch

  const isActive = (path) => location.pathname === path;
  const linkClass = (path) =>
    `block px-4 py-2 rounded transition-colors ${
      isActive(path) ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'
    }`;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);


  return (
    <>
      {/* ===== MOBILE HEADER ===== */}
      <div className="md:hidden bg-gray-900 p-4 flex justify-between items-center text-white fixed top-0 left-0 right-0 z-50">
        <span className="font-bold text-lg">Katel Capital Admin</span>

        <div className="relative">
          <Link to="/admin/dashboard" className={linkClass('/admin/dashboard')}>
            Pending:
            {pendingCount > 0 && (
              <span className="top-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </Link>
        </div>

        <button onClick={() => setMenuOpen(true)} className="text-2xl focus:outline-none">
          ☰
        </button>
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex-col shadow-lg pt-16">
        <div className="px-6 font-bold text-xl mb-4">Katel Capital Admin</div>
        <div className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1 text-sm">
            <li className="relative">
              <Link to="/admin/dashboard" className={linkClass('/admin/dashboard')}>
                Pending:
                {pendingCount > 0 && (
                  <span className="top-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </Link>
            </li>
            <li><Link to="/admin/dashboard" className={linkClass('/admin/dashboard')}>Dashboard</Link></li>
            <li><Link to="/admin/manage-users" className={linkClass('/admin/manage-users')}>Manage Users</Link></li>
            <li><Link to="/admin/reports" className={linkClass('/admin/reports')}>Reports</Link></li>
            <li><Link to="/admin/settings" className={linkClass('/admin/settings')}>Settings</Link></li>
            <li className='mt-10'><SidebarFooter /></li>
          </ul>
        </div>
      </aside>

      {/* ===== MOBILE SLIDE-OUT MENU ===== */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-full bg-gray-900 text-white z-50 transform transition-transform duration-300 pt-16 px-4 md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 font-bold text-xl mt-0">Katel Capital Admin</div>
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-xl focus:outline-none">✕</button>
        <div className="h-full overflow-y-auto mt-6 mb-10">
          <ul className="space-y-1 text-sm">
            <li><Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className={linkClass('/admin/dashboard')}>Dashboard</Link></li>
            <li><Link to="/admin/manage-users" onClick={() => setMenuOpen(false)} className={linkClass('/admin/manage-users')}>Manage Users</Link></li>
            <li><Link to="/admin/reports" onClick={() => setMenuOpen(false)} className={linkClass('/admin/reports')}>Reports</Link></li>
            <li><Link to="/admin/settings" onClick={() => setMenuOpen(false)} className={linkClass('/admin/settings')}>Settings</Link></li>
            <li className='mt-10'><SidebarFooter /></li>
          </ul>
        </div>
      </div>
    </>
  );
}
