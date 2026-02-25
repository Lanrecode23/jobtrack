import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  Briefcase,
  Bell,
  BarChart3,
  Menu,
  X,
  LogOut,
  User,
  Clock
} from 'lucide-react';
import Swal from 'sweetalert2';
import '../styles/DashboardLayout.css';
import { useAuthStore } from '../Store/useAuthStore';
import { useReminderStore } from '../Store/useReminderStore';


function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false); 

  const navigate = useNavigate();
  const { user, loading, logout } = useAuthStore();
  const { Reminders } = useReminderStore();

  // Filter for reminders where status is "Progress"
  const activeReminders = Reminders?.filter(r => r.status === "Progress") || [];
  const activeCount = activeReminders.length;

  const handleLogout = async () => {
    setDropdownOpen(false);
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
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Logout failed', text: 'Please try again' });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown-container') && !event.target.closest('.notif-wrapper')) {
        setDropdownOpen(false);
        setNotifOpen(false);
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

  return (
    <div className="dashboard-container">
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <TrendingUp size={28} />
            {sidebarOpen && <span>JobTracker</span>}
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => isMobile && setSidebarOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''} text-decoration-none`}
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
          <button type="button" className="logout-btn" onClick={handleLogout} disabled={loading}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="Navbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="navbar-right d-flex align-items-center">
            
            {/* NOTIFICATION BELL */}
            <div className="notif-wrapper me-3" style={{ position: 'relative' }}>
              <div 
                className="notification-icon" 
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={20} />
                {activeCount > 0 && (
                  <span 
                    className="badge rounded-pill bg-danger"
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      fontSize: '0.65rem',
                      border: '2px solid white'
                    }}
                  >
                    {activeCount}
                  </span>
                )}
              </div>

              {/* NOTIFICATION DROPDOWN */}
              {notifOpen && (
                <div 
                  className="user-dropdown p-0 shadow-lg border-0" 
                  style={{ position: 'absolute', right: 0, top: '10px', width: '250px', zIndex: 1000, background: 'white', borderRadius: '8px' }}
                >
                  <div className="p-3 border-bottom">
                    <h6 className="mb-0 fw-bold small text-danger">Pending Reminders</h6>
                  </div>
                  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {activeReminders.length > 0 ? (
                      activeReminders.slice(0, 5).map(reminder => (
                        <div key={reminder.id} className="p-2 border-bottom d-flex align-items-center">
                           <Clock size={14} className="text-primary me-2 ms-2" />
                           <div style={{ lineHeight: '1.2' }}>
                              <div className="fw-bold small">{reminder.company}</div>
                              <div className="text-muted" style={{ fontSize: '0.7rem' }}>{reminder.position}</div>
                           </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted small">No Active Reminders</div>
                    )}
                  </div>
                  <NavLink to="/dashboard/pending" className="d-block text-center p-2 small text-primary fw-bold text-decoration-none" onClick={() => setNotifOpen(false)}>
                    View All
                  </NavLink>
                </div>
              )}
            </div>

            {/* USER DROPDOWN */}
            <div className="user-dropdown-container">
              <div className="user-avatar" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="user" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                ) : (
                  <User size={20} />
                )}
              </div>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <p className="dropdown-name">{user?.displayName}</p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                  </div>
                  <button type="button" className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;