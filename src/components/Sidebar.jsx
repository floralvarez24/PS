import React from 'react'
import {NavLink} from "react-router-dom";

const Sidebar = () => {
  return (
    <div><aside className="menu has-shadow">
    <p className="menu-label">General</p>
    <ul className="menu-list">
      <li>
        <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      <li>
      <NavLink to={"/fletes"}>Fletes</NavLink>
      </li>
      <li>
      <NavLink to={"/subcontratos"}>Subcontratos</NavLink>
      </li>
    </ul>
    <p className="menu-label">Admin</p>
    <ul className="menu-list">
        <li><NavLink to={"/users"}>Usuarios</NavLink></li>
    </ul>
    <p className="menu-label">Ajustes</p>
    <ul className="menu-list">
      <li>
        <button className="button is-white">Cerrar Sesión</button>
        </li>
    
    </ul>
  </aside></div>
  )
}

export default Sidebar;