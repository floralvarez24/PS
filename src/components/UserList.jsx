
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    const deleteUser = async (idUsuario) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:3001/users/${idUsuario}`);
                console.log(`Respuesta del servidor: ${response.data.msg}`);
                getUsers(); // Actualiza la lista de usuarios después de eliminar uno
            } catch (error) {
                if (error.response) {
                    console.error("Error eliminando el usuario:", error.response.data);
                } else if (error.request) {
                    console.error("No se recibió respuesta del servidor:", error.request);
                } else {
                    console.error("Error al configurar la solicitud:", error.message);
                }
            }
        }
    }

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{color:"black"}}> Usuarios </h1>
            <h2 className="subtitle" style={{color:"black"}}> Lista de usuarios</h2>
            <Link to="/users/add" style={{ backgroundColor: "#183e6e", color:"white"}} className='button is-primary mb-2'> Agregar nuevo </Link>
            <table className='table is-striped is-fullwidth has-background-light' style={{tableLayout: "auto"}}>
                <thead>
                    <tr>
                        <th style={{color:"black"}}>Número</th>
                        <th style={{color:"black"}}>Mail</th>
                        <th style={{color:"black"}}>Rol</th>
                        <th style={{color:"black"}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((usuario, index) => (
                        <tr key={usuario.idUsuario} className='has-background-light'>
                            <td style={{color:"black", width: "auto"}}>{index + 1}</td>
                            <td style={{color:"black", width: "auto"}}>{usuario.mail}</td>
                            <td style={{color:"black", width: "auto"}}>{usuario.rol}</td>
                            <td style={{color:"black", width: "auto"}}>
                                <Link to={`/users/edit/${usuario.idUsuario}`} className='button is-info is-small'>Editar</Link>
                                <button onClick={() => deleteUser(usuario.idUsuario)} className='button is-danger is-small'>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;


