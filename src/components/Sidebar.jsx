import React from 'react'
import {NavLink} from "react-router-dom";
import {IoPerson, IoHome, IoLogOut, IoCarSharp, IoReader} from "react-icons/io5"

const Sidebar = () => {
  return (
    <div><aside className="menu pl-2 has-shadow has-background-white has-text-black">
    <p className="menu-label">General</p>
    <ul className="menu-list has-background-white">
      <li>  
        <NavLink className="has-background-white has-text-black" to={"/dashboard"}> <IoHome/> Dashboard</NavLink> 
        </li>
      <li>
      <NavLink className="has-background-white has-text-black"to={"/fletes"}> <IoCarSharp/> Fletes</NavLink>
      </li>
      <li>
      <NavLink className="has-background-white has-text-black"to={"/subcontratos"}> <IoReader/> Subcontratos</NavLink>
      </li>
    </ul>
    <p className="menu-label">Admin</p>
    <ul className="menu-list">
        <li><NavLink className="has-background-white has-text-black"to={"/users"}> <IoPerson/> Usuarios</NavLink></li>
    </ul>
    <p className="menu-label">Ajustes</p>
    <ul className="menu-list">
      <li>
        <button className="button is-white has-background-white has-text-black"> <IoLogOut/> Cerrar Sesión</button>
        </li>
    
    </ul>
  </aside></div>
  )
}

export default Sidebar;