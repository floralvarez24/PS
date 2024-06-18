
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
    }

    const deleteUser = async (idUsuario) => {
        await axios.delete(`http://localhost:3001/users/${idUsuario}`);
        getUsers();
    }

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{color:"black"}}> Usuarios </h1>
            <h2 className="subtitle" style={{color:"black"}}> Lista de usuarios</h2>
            <Link to="/users/add"  style={{ backgroundColor: "#183e6e", color:"white"}}className='button is-primary mb-2'> Agregar nuevo </Link>
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




/*const UserList = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            console.log('Datos recibidos:', response.data); // Verifica la estructura de la respuesta
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Error fetching users');
        }
    }

    const deleteUsuario = async (idUsuario) => {
        try {
            await axios.delete(`http://localhost:3001/users/${idUsuario}`);
            getUsers();
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Error deleting user');
        }
    }

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{ color: "black" }}> Usuarios </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Lista de usuarios </h2>
            <Link to="/users/add" style={{ backgroundColor: "#183e6e", color: "white" }} className='button is-primary mb-2'> Agregar nuevo </Link>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className='table is-striped is-fullwidth has-background-light'>
                <thead>
                    <tr>
                        <th style={{ color: "black" }}>Número</th>
                        <th style={{ color: "black" }}>Email</th>
                        <th style={{ color: "black" }}>Rol</th>
                        <th style={{ color: "black" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((usuario, index) => (
                            <tr key={usuario.idUsuario} className='has-background-light'>
                                <td style={{ color: "black" }}>{index + 1}</td>
                                <td style={{ color: "black" }}>{usuario.mail}</td>
                                <td style={{ color: "black" }}>{usuario.rol}</td>
                                <td style={{ color: "black" }}>
                                    <Link to={`/users/edit/${usuario.idUsuario}`} className='button is-info is-small'>Editar</Link>
                                    <button onClick={() => deleteUsuario(usuario.idUsuario)} className='button is-danger is-small'>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
export default UserList;*/