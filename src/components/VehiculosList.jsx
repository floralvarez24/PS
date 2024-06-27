import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const VehiculosList = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            getVehiculos();
        }
    }, [user]);

    const getVehiculos = async () => {
        try {
            let url = 'http://localhost:3001/pedir-flete'; // Endpoint para obtener todos los fletes por defecto (rol 1)
            if (user && user.rol === '2') {
                url = 'http://localhost:3001/pedir-flete-User'; // Endpoint para obtener fletes del usuario (rol 2)
            }

            const response = await axios.get(url);
            setVehiculos(response.data);
        } catch (error) {
            console.error('Error al obtener fletes:', error);
        }
    }

    const deleteVehiculo = async (idVehiculoFlete) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este vehículo?");
        if (confirmDelete) {
        try {
            await axios.delete(`http://localhost:3001/eliminar-vehiculo/${idVehiculoFlete}`);
            getVehiculos(); // Después de eliminar, volver a obtener los fletes actualizados
        } catch (error) {
            console.error('Error al eliminar vehículo:', error);
        }
    }
}

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{ color: "black" }}> Vehículos </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Lista de Vehículos </h2>
           
                <Link to="/vehiculos/add" style={{ backgroundColor: "#183e6e", color: "white" }} className='button is-primary mb-2'> Agregar nuevo </Link>
           
            <table className='table is-striped is-fullwidth has-background-light' style={{ tableLayout: "auto" }}>
                <thead>
                    <tr>
                        <th style={{ color: "black" }}>Número</th>
                        <th style={{ color: "black" }}> Descripción </th>
                        <th style={{ color: "black" }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map((documentovehiculo, index) => (
                        <tr key={documentovehiculo.idVehiculoFlete} className='has-background-light'>
                            <td style={{ color: "black", width: "auto" }}>{index + 1}</td>
                            <td style={{ color: "black", width: "auto" }}>{documentovehiculo.descripcion}</td>
                            <td style={{ color: "black", width: "auto" }}>
                               
                                    <>
                                        <Link to={`/vehiculos/edit/${documentovehiculo.idVehiculoFlete}`} className='button is-info is-small'>Editar</Link>
                                        <button onClick={() => deleteVehiculo(documentovehiculo.idVehiculoFlete)} className='button is-danger is-small'>Eliminar</button>
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