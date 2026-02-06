import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    { id: 'generareDocumente', label: 'Generare Documente', icon: '📊', path: '/generareDocumente' },
    { id: 'uploadDocumente', label: 'Upload Documente', icon: '📋', path: '/uploadDocumente' },
  ];

  // Determină secțiunea activă din URL
  const activeSection = location.pathname;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Discipline Admin</h2>
        <span className="version">v1.0</span>
      </div>

      <nav className="menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`menu-item ${activeSection === item.path ? 'active' : ''}`}
            onClick={() => {
              console.log('Navigating to:', item.path); // DEBUG
              navigate(item.path);
            }}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">AD</div>
          <div className="user-details">
            <div className="user-name">Administrator</div>
            <div className="user-role">Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;