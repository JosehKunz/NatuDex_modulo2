import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {
  return (
    <div className="sidemenu">
      <Link to="/dashboard" className="menu-item">Dashboard</Link>
      <Link to="/natudex-form" className="menu-item">Novo Local</Link>
      <Link to="/natudex-list" className="menu-item">Lista de Locais</Link>
    </div>
  );
}

export default SideMenu;
