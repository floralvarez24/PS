import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const VehiculosList = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const { user } = useSelector(state => state.auth);
    const { id } = useParams(); // Asumiendo que id viene de React Router
    const navigate = useNavigate();

    useEffect(() => {
        if (user && id) {
            getVehiculos();
        }
    }, [user, id]);

    const getVehiculos = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/flete/${id}/vehiculos`);
            setVehiculos(response.data);
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
        }
    }

    const deleteVehiculo = async (idVehiculoFlete) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este vehículo?");

        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:3001/eliminar-vehiculo/${idVehiculoFlete}`);
                // Actualizar la lista de vehículos sin redireccionar
                getVehiculos();
                navigate(`/fletes/edit/${id}`);
            
            } catch (error) {
                console.error('Error al eliminar vehículo:', error);
            }
        }

    }

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{ color: "black" }}> Vehículos </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Lista de Vehículos de este flete </h2>
            <Link to={`/vehiculos/add/${id}`} style={{ backgroundColor: "#183e6e", color: "white" }} className='button is-primary mb-2 ml-2'> Agregar nuevo </Link>
            <table className='table is-striped is-fullwidth has-background-light' style={{ tableLayout: "auto" }}>
                <thead>
                    <tr>
                        <th style={{ color: "black" }}>Número</th>
                        <th style={{ color: "black" }}> Descripción </th>
                        <th style={{ color: "black" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map((vehiculo, index) => (
                        <tr key={vehiculo.idVehiculoFlete} className='has-background-light'>
                            <td style={{ color: "black", width: "auto" }}>{index + 1}</td>
                            <td style={{ color: "black", width: "auto" }}>{vehiculo.descripcion}</td>
                            <td style={{ color: "black", width: "auto" }}>
                                <>
                                    <Link to={`/vehiculos/edit/${vehiculo.idVehiculoFlete}`} className='button is-info is-small'>Editar</Link>
                                    <button onClick={() => deleteVehiculo(vehiculo.idVehiculoFlete)} className='button is-danger is-small'>Eliminar</button>
                                </>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VehiculosList;

