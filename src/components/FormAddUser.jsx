
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const FormAddUser = () => {
    const [mail, setMail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('');  // Asegúrate de que el valor inicial sea una cadena vacía
    const [confContraseña, setConfContraseña] = useState(''); 
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveUsuario = async (e) => {
        e.preventDefault();

        // Verifica que el rol no sea nulo o vacío
        if (!rol) {
            setMsg('El rol no puede estar vacío.');
            return;
        }

        console.log('Rol seleccionado:', rol);  // Agrega esto para verificar el rol
        try {
            await axios.post('http://localhost:3001/users', {
                mail: mail,
                contraseña: contraseña,
                confContraseña: confContraseña,
                rol: parseInt(rol, 10)  // Asegúrate de enviar el rol como número
            });
            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div>
            <h1 className="title" style={{ color: "black" }}>Usuarios</h1>
            <h2 className="subtitle" style={{ color: "black" }}>Agregar nuevo usuario</h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                        <form action="" onSubmit={saveUsuario}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Email</label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={mail} onChange={(e) => setMail(e.target.value)} required placeholder="Email" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Contraseña</label>
                                <div className="control">
                                    <input type="password" className="input has-background-white has-text-black custom-input" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required placeholder="*****" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Confirmar contraseña</label>
                                <div className="control">
                                    <input type="password" className="input has-background-white has-text-black custom-input" style={{ color: "black" }} value={confContraseña} onChange={(e) => setConfContraseña(e.target.value)} required placeholder="*****" />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Rol</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select name="" id="" value={rol} onChange={(e) => setRol(e.target.value)}>
                                            <option value="">Seleccione un rol</option> {/* Asegúrate de que haya una opción predeterminada */}
                                            <option value="1">1-Admin</option>
                                            <option value="2">2-Usuario</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success" type='submit' style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Guardar</button>
                                    <button className="button is-success" style={{ backgroundColor: "#183e6e", color: "white" }}><Link to="/users" style={{ color: "white" }}>Cancelar</Link></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormAddUser;

