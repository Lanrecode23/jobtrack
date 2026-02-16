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
import '../styles/DashboardLayout.css';
import { useAuthStore } from '../Store/useAuthStore';


function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()


  const{user, loading, error, logout} = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      error(e.message);
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
      if (dropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/dashboard/tracking', icon: Briefcase, label: 'Job Tracking' },
    { path: '/dashboard/reminders', icon: Bell, label: 'Reminders' },
    { path: '/dashboard/insights', icon: BarChart3, label: 'Insights' },
  ];

  const handleNavClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
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
          <button className="logout-btn" onClick={handleLogout} disabled={loading}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
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
                <User size={20} />
              </div>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      <User size={24} />
                    </div>
                    <div className="dropdown-user-info">
                      <p className="dropdown-name">{user?.displayName}</p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                  </div>
                  
                  <button className="dropdown-item logout" onClick={handleLogout} disabled={loading}>
                    <LogOut size={18} />
                    <span>Logout</span>
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
