import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Bell,
  BarChart3,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import Swal from 'sweetalert2';
import '../styles/DashboardLayout.css';
import { useAuthStore } from '../Store/useAuthStore';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { user, loading, logout } = useAuthStore();

  /* ===========================
     Logout Handler (IMPROVED)
  ============================ */
  const handleLogout = async () => {
    // Close dropdown
    setDropdownOpen(false);
    
    // Confirm logout
    const result = await Swal.fire({
      title: '<span style="font-size: 1.2rem;">Logout?</span>',
      html: '<p style="font-size: 0.9rem;">Are you sure you want to logout?</p>',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      confirmButtonColor: '#dc3545',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      await logout();
      navigate('/', { replace: true });
      
      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Logout failed',
        text: 'Please try again'
      });
    }
  };

  /* ===========================
     Responsive Sidebar
  ============================ */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ===========================
     Dropdown Outside Click
  ============================ */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/dashboard/tracking', icon: Briefcase, label: 'Job Tracking' },
    { path: '/dashboard/reminders', icon: Bell, label: 'Reminders' },
    { path: '/dashboard/insights', icon: BarChart3, label: 'Insights' },
  ];

  const handleNavClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Briefcase size={28} />
            {sidebarOpen && <span>JobTracker</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''} text-decoration-none`
              }
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <User size={20} />
            {sidebarOpen && <span>{user?.displayName}</span>}
          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
            disabled={loading}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="Navbar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="navbar-right">
            <div className="notification-icon">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </div>

            <div className="user-dropdown-container">
              <div
                className="user-avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName}
                    style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                  />
                ) : (
                  <User size={20} />
                )}
              </div>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName}
                          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                        />
                      ) : (
                        <User size={24} />
                      )}
                    </div>
                    <div className="dropdown-user-info">
                      <p className="dropdown-name">{user?.displayName}</p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="dropdown-item logout"
                    onClick={handleLogout}
                    disabled={loading}
                  >
                    <LogOut size={18} />
                    <span>{loading ? 'Logging out...' : 'Logout'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;