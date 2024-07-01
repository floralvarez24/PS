/*import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ConductoresList = () => {
    const [conductores, setConductores] = useState([]);
    const { user } = useSelector(state => state.auth);
    const { id } = useParams(); // Asumiendo que id viene de React Router
    const navigate = useNavigate();

    useEffect(() => {
        if (user && id) {
            getConductores();
        }
    }, [user, id]);

    const getConductores = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/flete/${id}/conductores`);
            setConductores(response.data);
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
        }
    }

    const deleteConductores = async (idDocConductorFlete) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este conductor?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/eliminar-conductor/${idDocConductorFlete}`);
                // Actualizar la lista de vehículos sin redireccionar
                getConductores();
                navigate(`/vehiculos/edit/${id}`);
            
            } catch (error) {
                console.error('Error al eliminar conductor:', error);
            }
        }

    }

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{ color: "black" }}> Conductores </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Lista de conductores </h2>
            <Link to={`/conductores/add/${id}`} style={{ backgroundColor: "#183e6e", color: "white" }} className='button is-primary mb-2 ml-2'> Agregar nuevo </Link>
            <table className='table is-striped is-fullwidth has-background-light' style={{ tableLayout: "auto" }}>
                <thead>
                    <tr>
                        <th style={{ color: "black" }}>Número</th>
                        <th style={{ color: "black" }}> Nombre y apellido </th>
                        <th style={{ color: "black" }}> Cédula de identidad </th>
                        <th style={{ color: "black" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {conductores.map((conductor, index) => (
                        <tr key={conductor.idDocConductorFlete} className='has-background-light'>
                            <td style={{ color: "black", width: "auto" }}>{index + 1}</td>
                            <td style={{ color: "black", width: "auto" }}>{conductor.nombreApellido}</td>
                            <td style={{ color: "black", width: "auto" }}>{conductor.dni}</td>
                            <td style={{ color: "black", width: "auto" }}>
                                <>
                                    <Link to={`/conductores/edit/${conductor.idDocConductorFlete}`} className='button is-info is-small'>Editar</Link>
                                    <button onClick={() => deleteConductores(conductor.idDocConductorFlete)} className='button is-danger is-small'>Eliminar</button>
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ConductoresList;*/
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ConductoresList = () => {
    const [conductores, setConductores] = useState([]);
    const { user } = useSelector(state => state.auth);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && id) {
            getConductores();
        }
    }, [user, id]);

    const getConductores = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/flete/${id}/conductores`);
            setConductores(response.data);
        } catch (error) {
            console.error('Error al obtener conductores:', error);
        }
    }

    const deleteConductor = async (idDocConductorFlete) => {
        console.log("Intentando eliminar conductor con ID:", idDocConductorFlete); // Log para verificar el ID
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este conductor?");
    
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/eliminar-conductor/${idDocConductorFlete}`);
                // Actualiza la lista de conductores después de eliminar
                setConductores(conductores.filter(conductor => conductor.idDocConductorFlete !== idDocConductorFlete));
            } catch (error) {
                console.error('Error al eliminar conductor:', error);
                alert('Error al eliminar conductor. Por favor, intente de nuevo.');
            }
        }
    }
    

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{ color: "black" }}> Conductores </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Lista de conductores de este vehículo </h2>
            <Link to={`/conductores/add/${id}`} style={{ backgroundColor: "#183e6e", color: "white" }} className='button is-primary mb-2 ml-2'> Agregar nuevo </Link>
            <table className='table is-striped is-fullwidth has-background-light' style={{ tableLayout: "auto" }}>
                <thead>
                    <tr>
                        <th style={{ color: "black" }}>Número</th>
                        <th style={{ color: "black" }}> Nombre y apellido </th>
                        <th style={{ color: "black" }}> Cédula de identidad </th>
                        <th style={{ color: "black" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {conductores.map((conductor, index) => {
                        console.log("Datos del conductor:", conductor); // Log para verificar los datos del conductor
                        return (
                            <tr key={conductor.idDocConductorFlete} className='has-background-light'>
                                <td style={{ color: "black", width: "auto" }}>{index + 1}</td>
                                <td style={{ color: "black", width: "auto" }}>{conductor.nombreApellido}</td>
                                <td style={{ color: "black", width: "auto" }}>{conductor.dni}</td>
                                <td style={{ color: "black", width: "auto" }}>
                                    <>
                                        <Link to={`/conductores/edit/${conductor.idDocConductorFlete}`} className='button is-info is-small'>Editar</Link>
                                        <button onClick={() => deleteConductor(conductor.idDocConductorFlete)} className='button is-danger is-small'>Eliminar</button>
                                    </>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ConductoresList;
