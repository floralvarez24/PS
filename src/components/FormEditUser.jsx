import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const FormEditUser = () => {
    const [mail, setMail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confContraseña, setConfContraseña] = useState('');
    const [rol, setRol] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getUserById = async () => {
            try {
                console.log(`Fetching data for user with id: ${id}`);
                const response = await axios.get(`http://localhost:3001/users/${id}`);
                console.log('Datos del usuario:', response.data);

                if (response.data) {
                    setMail(response.data.mail || '');
                    setRol(response.data.rol ? response.data.rol.toString() : '');
                } else {
                    console.error('Error: No data found for user.');
                    setMsg('No se encontraron datos para este usuario.');
                }
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                } else {
                    console.error('Error fetching user data:', error);
                    setMsg('Error al obtener los datos del usuario.');
                }
            }
        };
        getUserById();
    }, [id]);

    const updateUser = async (e) => {
        e.preventDefault();
        if (!rol) {
            setMsg('El rol no puede estar vacío.');
            return;
        }
        try {
            await axios.patch(`http://localhost:3001/users/${id}`, {
                mail,
                contraseña,
                confContraseña,
                rol: parseInt(rol, 10)
            });
            navigate('/users');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            } else {
                console.error('Error updating user data:', error);
                setMsg('Error al actualizar los datos del usuario.');
            }
        }
    }

    return (
        <div>
            <h1 className="title" style={{ color: "black" }}>Usuarios</h1>
            <h2 className="subtitle" style={{ color: "black" }}>Editar usuario</h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                        <form method="post" onSubmit={updateUser}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Email</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input has-background-white has-text-black custom-input"
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Contraseña</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input has-background-white has-text-black custom-input"
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Confirmar contraseña</label>
                                <div className="control">
                                    <input
                                        type="password"
                                        className="input has-background-white has-text-black custom-input"
                                        value={confContraseña}
                                        onChange={(e) => setConfContraseña(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}>Rol</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            value={rol}
                                            onChange={(e) => setRol(e.target.value)}
                                        >
                                            <option value="">Seleccione un rol</option>
                                            <option value="1">1-Admin</option>
                                            <option value="2">2-Usuario</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success" type="submit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Actualizar</button>
                                    <Link className="button is-success" to="/users" style={{ backgroundColor: "#183e6e", color: "white" }}>Cancelar</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormEditUser;
