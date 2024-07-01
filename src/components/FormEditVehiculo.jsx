import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ConductoresList from './ConductoresList';

const FormEditVehiculo = () => {
    const [descripcion, setDescripcion] = useState('');
    const [libretaCirculacion_DOC, setLibretaCirculacion_DOC] = useState('');
    const [cedulaMTOP_DOC, setCedulaMTOP_DOC] = useState('');
    const [cedulaMTOP_FECHAVENCIMIENTO, setCedulaMTOP_FECHAVENCIMIENTO] = useState('');
    const [applus_DOC, setApplus_DOC] = useState('');
    const [applus_FECHAVENCIMIENTO, setApplus_FECHAVENCIMIENTO] = useState('');
    const [applus_PRORROGA, setApplus_PRORROGA] = useState('');
    const [soa_DOC, setSoa_DOC] = useState('');
    const [soa_FECHAVENCIMIENTO, setSoa_FECHAVENCIMIENTO] = useState('');
    const [msg, setMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getVehiculoById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/flete/pedir-vehiculo/${id}`);
                setDescripcion(response.data.descripcion);
                setLibretaCirculacion_DOC(response.data.libretaCirculacion_DOC);
                setCedulaMTOP_DOC(response.data.cedulaMTOP_DOC);
                setCedulaMTOP_FECHAVENCIMIENTO(response.data.cedulaMTOP_FECHAVENCIMIENTO);
                setApplus_DOC(response.data.applus_DOC);
                setApplus_FECHAVENCIMIENTO(response.data.applus_FECHAVENCIMIENTO);
                setApplus_PRORROGA(response.data.applus_PRORROGA);
                setSoa_DOC(response.data.soa_DOC);
                setSoa_FECHAVENCIMIENTO(response.data.soa_FECHAVENCIMIENTO);    
            } catch (error) {
                if (error.response) {
                    setMsg(`Error: ${error.response.data.msg}`);
                } else {
                    setMsg(`Error: ${error.message}`);
                }
            }
        };
        getVehiculoById();
    }, [id]);

    const updateVehiculo = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3001/flete/modificar-vehiculo/${id}`, {
                descripcion,
                libretaCirculacion_DOC,
                cedulaMTOP_DOC,
                cedulaMTOP_FECHAVENCIMIENTO,
                applus_DOC,
                applus_FECHAVENCIMIENTO,
                applus_PRORROGA,
                soa_DOC,
                soa_FECHAVENCIMIENTO
            });
            setShowModal(true);
        } catch (error) {
            if (error.response) {
                setMsg(`Error: ${error.response.data.msg}`);
            } else {
                setMsg(`Error: ${error.message}`);
            }
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const cancelEdit = () => {
        navigate(-1); // Navega de regreso a la página anterior
    }

    return (
        <div>
            <h1 className="title" style={{color:"black"}}> Vehículos </h1>
            <h2 className="subtitle" style={{color:"black"}}> Modificar vehículo </h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateVehiculo}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Descripción </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Libreta de Circulación pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setLibretaCirculacion_DOC(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Cédula MTOP pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setCedulaMTOP_DOC(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Cédula MTOP Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={cedulaMTOP_FECHAVENCIMIENTO} onChange={(e) => setCedulaMTOP_FECHAVENCIMIENTO(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> APPLUS pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setApplus_DOC(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> APPLUS Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={applus_FECHAVENCIMIENTO} onChange={(e) => setApplus_FECHAVENCIMIENTO(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> APPLUS Fecha de prórroga </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={applus_PRORROGA} onChange={(e) => setApplus_PRORROGA(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> SOA pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setSoa_DOC(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> SOA Fecha de vencimiento</label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={soa_FECHAVENCIMIENTO} onChange={(e) => setSoa_FECHAVENCIMIENTO(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success" type="submit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}> Actualizar </button>
                                    <button className="button is-success" type="button" style={{ backgroundColor: "#183e6e", color: "white" }} onClick={cancelEdit}>
                                        Cancelar
                                    </button>
                                </div>      
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`modal ${showModal ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Cambios guardados</p>
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Los cambios se han guardado exitosamente.</p>
                    </section>
                </div>
            </div>
            <ConductoresList />
        </div>
    )
}

export default FormEditVehiculo;
