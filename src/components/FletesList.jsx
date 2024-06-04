import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  

const FletesList = () => {
    const [fletes, setFletes] = useState([]);

    useEffect(() => {
        getFletes();
    }, []);

    const getFletes = async () => {
        const response = await axios.get('http://localhost:3001/pedir-flete');
        setFletes(response.data);
    }

    const deleteFlete = async (idFletero) => {
        await axios.delete(`http://localhost:3001/eliminar-flete/${idFletero}`);
        getFletes();
    }

    return (
        <div className='has-background-light'>
            <h1 className="title" style={{color:"black"}}> Fletes </h1>
            <h2 className="subtitle" style={{color:"black"}}> Lista de Fletes </h2>
            <Link to="/fletes/add"  style={{ backgroundColor: "#183e6e", color:"white"}}className='button is-primary mb-2'> Agregar nuevo </Link>
            <table className='table is-striped is-fullwidth has-background-light' style={{tableLayout: "auto"}}>
                <thead>
                    <tr>
                        <th style={{color:"black"}}>Número</th>
                        <th style={{color:"black"}}>Razón Social</th>
                        <th style={{color:"black"}}>Obra</th>
                        <th style={{color:"black"}}>Fecha de creación</th>
                        <th style={{color:"black"}}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {fletes.map((fletero, index) => (
                        <tr key={fletero.idFletero} className='has-background-light'>
                            <td style={{color:"black", width: "auto"}}>{index + 1}</td>
                            <td style={{color:"black", width: "auto"}}>{fletero.razonSocial}</td>
                            <td style={{color:"black", width: "auto"}}>{fletero.obra}</td>
                            <td style={{color:"black", width: "auto"}}>{fletero.fechaFlete}</td>
                            <td style={{color:"black", width: "auto"}}>
                                <Link to={`/fletes/edit/:${fletero.idFletero}`} className='button is-info is-small'>Editar</Link>
                                <button onClick={() => deleteFlete(fletero.idFletero)} className='button is-danger is-small'>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FletesList;
