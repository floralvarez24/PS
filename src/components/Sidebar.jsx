import React from 'react'
import {NavLink, useNavigate} from "react-router-dom";
import {IoPerson, IoHome, IoLogOut, IoCarSharp, IoReader} from "react-icons/io5"
import {useDispatch, useSelector} from 'react-redux';
import { LogOut, reset } from '../features/authSlice';


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const {user} = useSelector((state) => state.auth);


const logout = () => {
  dispatch(LogOut());
  dispatch(reset());
  navigate('/');
} ;


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
    {user && user.rol === '1' && (
      <div>
        <p className="menu-label">Admin</p>
          <ul className="menu-list">
              <li><NavLink className="has-background-white has-text-black"to={"/users"}> <IoPerson/> Usuarios</NavLink></li>
        </ul>
      </div>
    )}
    
    <p className="menu-label">Ajustes</p>
    <ul className="menu-list">
      <li>
        <button onClick={logout} className="button is-white has-background-white has-text-black"> <IoLogOut/> 
        Cerrar Sesión
        </button>
        </li>
    
    </ul>
  </aside></div>
  )
}

export default Sidebar;