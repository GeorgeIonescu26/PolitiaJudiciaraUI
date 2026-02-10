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
        <h2>Politia Judiciara</h2>
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
    </aside>
  );
};

export default Sidebar;