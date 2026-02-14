import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
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

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                `nav-item ${isActive ? 'active' : ''}`
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
            {sidebarOpen && <span>John Doe</span>}
          </div>
          <button className="logout-btn">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Navbar */}
        <header className="navbar">
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
            <div className="user-avatar">
              <User size={20} />
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