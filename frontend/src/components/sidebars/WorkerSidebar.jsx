// src/components/sidebars/WorkerSidebar.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarFooter from '../common/SidebarFooter';
import { useData } from '../../context/DataContext';

export default function WorkerSidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const location = useLocation();
  const { pendingTasks, fetchWorkerTasks } = useData(); // Worker-specific data

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

  useEffect(() => {
    fetchWorkerTasks();
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 p-4 flex justify-between items-center text-white fixed top-0 left-0 right-0 z-50">
        <span className="font-bold text-lg">Worker Panel</span>

        <div className="relative">
          <Link to="/worker/dashboard" className={linkClass('/worker/dashboard')}>
            Pending Tasks:
            {pendingTasks > 0 && (
              <span className="top-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {pendingTasks}
              </span>
            )}
          </Link>
        </div>

        <button onClick={() => setMenuOpen(true)} className="text-2xl focus:outline-none">
          ☰
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex-col shadow-lg pt-16">
        <div className="px-6 font-bold text-xl mb-4">Worker Panel</div>
        <div className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1 text-sm">
            <li className="relative">
              <Link to="/worker/dashboard" className={linkClass('/worker/dashboard')}>
                Pending Tasks:
                {pendingTasks > 0 && (
                  <span className="top-1/2 -translate-y-1/2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {pendingTasks}
                  </span>
                )}
              </Link>
            </li>
            <li><Link to="/worker/dashboard" className={linkClass('/worker/dashboard')}>Dashboard</Link></li>
            <li><Link to="/worker/my-jobs" className={linkClass('/worker/my-jobs')}>My Jobs</Link></li>
            <li><Link to="/worker/reports" className={linkClass('/worker/reports')}>Reports</Link></li>
            <li className='mt-10'><SidebarFooter /></li>
          </ul>
        </div>
      </aside>

      {/* Mobile Slide-Out */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-full bg-gray-900 text-white z-50 transform transition-transform duration-300 pt-16 px-4 md:hidden ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-6 font-bold text-xl mt-0">Worker Panel</div>
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-xl focus:outline-none">✕</button>
        <div className="h-full overflow-y-auto mt-6 mb-10">
          <ul className="space-y-1 text-sm">
            <li><Link to="/worker/dashboard" onClick={() => setMenuOpen(false)} className={linkClass('/worker/dashboard')}>Dashboard</Link></li>
            <li><Link to="/worker/my-jobs" onClick={() => setMenuOpen(false)} className={linkClass('/worker/my-jobs')}>My Jobs</Link></li>
            <li><Link to="/worker/reports" onClick={() => setMenuOpen(false)} className={linkClass('/worker/reports')}>Reports</Link></li>
            <li className='mt-10'><SidebarFooter /></li>
          </ul>
        </div>
      </div>
    </>
  );
}
