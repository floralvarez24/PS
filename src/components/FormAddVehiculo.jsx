import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const FormAddVehiculo = () => {
    const [descripcion, setDescripcion] = useState('');
    const [libretaCirculacion_DOC, setLibretaCirculacion_DOC] = useState(null);
    const [cedulaMTOP_DOC, setCedulaMTOP_DOC] = useState(null);
    const [cedulaMTOP_FECHAVENCIMIENTO, setCedulaMTOP_FECHAVENCIMIENTO] = useState('');
    const [cedulaMTOP_VENCIDO, setCedulaMTOP_VENCIDO] = useState('');
    const [applus_DOC, setApplus_DOC] = useState(null);
    const [applus_FECHAVENCIMIENTO, setApplus_FECHAVENCIMIENTO] = useState('');
    const [applus_VENCIDO, setApplus_VENCIDO] = useState('');
    const [aplus_PRORROGA, setAplus_PRORROGA] = useState('');
    const [aplus_PRORROGAVENCIDA, setAplus_PRORROGAVENCIDA] = useState('');
    const [soa_DOC, setSoa_DOC] = useState(null);
    const [soa_FECHAVENCIMIENTO, setSoa_FECHAVENCIMIENTO] = useState('');
    const [soa_VENCIDO, setSoa_VENCIDO] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveVehiculo = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/flete/${id}/vehiculo`, {
             descripcion: descripcion,
             libretaCirculacion_DOC: libretaCirculacion_DOC,
                cedulaMTOP_DOC: cedulaMTOP_DOC,
                cedulaMTOP_FECHAVENCIMIENTO: cedulaMTOP_FECHAVENCIMIENTO,
                applus_DOC: applus_DOC,
                applus_FECHAVENCIMIENTO: applus_FECHAVENCIMIENTO,
                aplus_PRORROGA: aplus_PRORROGA,
                soa_DOC: soa_DOC,
                soa_FECHAVENCIMIENTO: soa_FECHAVENCIMIENTO

            });
            setShowModal(true); 
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    const closeModal = () => {
        setShowModal(false);
        navigate(`/fletes/edit/${id}`);
    };

    return (
        <div>
            <h1 className="title" style={{ color: "black" }}> Vehículos </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Agregar nuevo vehículo </h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveVehiculo}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Descripción </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Libreta de Circulación pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setLibretaCirculacion_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Cédula MTOP pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setCedulaMTOP_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Cédula MTOP Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={cedulaMTOP_FECHAVENCIMIENTO} onChange={(e) => setCedulaMTOP_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> APPLUS pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setApplus_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> APPLUS Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={applus_FECHAVENCIMIENTO} onChange={(e) => setApplus_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> APPLUS Fecha de prórroga </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={aplus_PRORROGA} onChange={(e) => setAplus_PRORROGA(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> SOA pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setSoa_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> SOA Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={soa_FECHAVENCIMIENTO} onChange={(e) => setSoa_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-primary" type="submit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Guardar</button>
                                <Link to={`/fletes/edit/${id}`} className="button is-light ml-2" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Cancelar</Link>
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
                        <p> Vehículo guardado exitosamente.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FormAddVehiculo;
