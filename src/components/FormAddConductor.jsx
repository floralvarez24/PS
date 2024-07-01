import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';


const FormAddConductor = () => {
    const [nombreApellido, setNombreApellido] = useState('');
    const [documentoIdentidad_DOC, setDocumentoIdentidad_DOC] = useState(null);
    const [dni, setDni] = useState('');
    const [carnetSalud_DOC, setCarnetSalud_DOC] = useState(null);
    const [carnetSalud_FECHAVENCIMIENTO, setCarnetSalud_FECHAVENCIMIENTO] = useState('');
    const [licenciaConducir_DOC, setLicenciaConducir_DOC] = useState(null);
    const [licenciaConducir_FECHAVENCIMIENTO, setLicenciaConducir_FECHAVENCIMIENTO] = useState('');
    const [altaBPS, setAltaBPS] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveConductor = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/flete/${id}/conductor`, {
             nombreApellido: nombreApellido,
                documentoIdentidad_DOC: documentoIdentidad_DOC,
                dni: dni,
                carnetSalud_DOC: carnetSalud_DOC,
                carnetSalud_FECHAVENCIMIENTO: carnetSalud_FECHAVENCIMIENTO,
                licenciaConducir_DOC: licenciaConducir_DOC,
                licenciaConducir_FECHAVENCIMIENTO: licenciaConducir_FECHAVENCIMIENTO,
                altaBPS: altaBPS

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
        navigate(`/vehiculos/edit/${id}`);
    };

    return (
        <div>
            <h1 className="title" style={{ color: "black" }}> Conductores </h1>
            <h2 className="subtitle" style={{ color: "black" }}> Agregar nuevo conductor </h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveConductor}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Nombre y apellido </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={nombreApellido} onChange={(e) => setNombreApellido(e.target.value)} required />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Cédula de identidad pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setDocumentoIdentidad_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Cédula de identidad </label>
                                <div className="control"> 
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={dni} onChange={(e) => setDni(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Carnet de salud pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setCarnetSalud_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Carnet de salud Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={carnetSalud_FECHAVENCIMIENTO} onChange={(e) => setCarnetSalud_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Licencia de conducir pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setLicenciaConducir_DOC(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Licencia de conducir Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={licenciaConducir_FECHAVENCIMIENTO} onChange={(e) => setLicenciaConducir_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Fecha de alta BPS </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={altaBPS} onChange={(e) => setAltaBPS(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-primary" type="submit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Guardar Conductor</button>
                                <Link to={`/vehiculos/edit/${id}`} className="button is-light ml-2" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Cancelar</Link>
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
                        <p> Conductor guardado exitosamente.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FormAddConductor;
