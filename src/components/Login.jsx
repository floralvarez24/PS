import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';

const Login = () => {
  const [mail, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth
);

useEffect(() => {
  if (user || isSuccess) {
    navigate('/dashboard');
  }
  dispatch(reset());
},[user, isSuccess, dispatch, navigate]);
const Auth = (e) => {
  e.preventDefault();
  dispatch(LoginUser({mail,contraseña}));
};


  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">  
                <form onSubmit={Auth} className="box" action="">
                 {isError && <p className='has-text-centered'> {message}</p>}
                <h1 className="title is-2"> Inicio de Sesión </h1>
                    <div className="field">
                        <label  className="label"> Email </label>
                        <div className="control">
                            <input 
                            type="text" 
                            className="input" 
                            value= {mail} 
                            onChange={(e)=> setEmail(e.target.value)} 
                            placeholder="Email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label"> Contraseña </label>
                        <div className="control">
                            <input 
                            type="password" 
                            className="input" 
                            value= {contraseña} 
                            onChange={(e)=> setPassword(e.target.value)} 
                            placeholder="*****"/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <button type="sumbit"className="button is-success is-fullwidth" style={{ backgroundColor: "#183e6e", color:"white"}}> 
                        {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login