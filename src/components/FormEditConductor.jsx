import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const FormEditConductor = () => {
    const [nombreApellido, setNombreApellido] = useState('');
    const [documentoIdentidad_DOC, setDocumentoIdentidad_DOC] = useState('');
    const [dni, setDni] = useState('');
    const [carnetSalud_DOC, setCarnetSalud_DOC] = useState('');
    const [carnetSalud_FECHAVENCIMIENTO, setCarnetSalud_FECHAVENCIMIENTO] = useState('');
    const [licenciaConducir_DOC, setLicenciaConducir_DOC] = useState('');
    const [licenciaConducir_FECHAVENCIMIENTO, setLicenciaConducir_FECHAVENCIMIENTO] = useState('');
    const [altaBPS, setAltaBPS] = useState(''); 
    const [msg, setMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getConductorById = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/flete/pedir-conductor/${id}`);
                const {
                    nombreApellido,
                    documentoIdentidad_DOC,
                    dni,
                    carnetSalud_DOC,
                    carnetSalud_FECHAVENCIMIENTO,
                    licenciaConducir_DOC,
                    licenciaConducir_FECHAVENCIMIENTO,
                    altaBPS
                } = response.data;
                setNombreApellido(nombreApellido);
                setDocumentoIdentidad_DOC(documentoIdentidad_DOC);
                setDni(dni);
                setCarnetSalud_DOC(carnetSalud_DOC);
                setCarnetSalud_FECHAVENCIMIENTO(carnetSalud_FECHAVENCIMIENTO);
                setLicenciaConducir_DOC(licenciaConducir_DOC);
                setLicenciaConducir_FECHAVENCIMIENTO(licenciaConducir_FECHAVENCIMIENTO);
                setAltaBPS(altaBPS);
            } catch (error) {
                if (error.response) {
                    setMsg(`Error: ${error.response.data.msg}`);
                } else {
                    setMsg(`Error: ${error.message}`);
                }
            }
        };
        getConductorById();
    }, [id]);

    const updateConductor = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3001/flete/modificar-conductor/${id}`, {
               nombreApellido,
                documentoIdentidad_DOC,
                dni,
                carnetSalud_DOC,
                carnetSalud_FECHAVENCIMIENTO,
                licenciaConducir_DOC,
                licenciaConducir_FECHAVENCIMIENTO,
                altaBPS 
              
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
        navigate(-1); // Navegar de regreso a la página anterior
    }

    const cancelEdit = () => {
        navigate(-1); // Navega de regreso a la página anterior
    }

    return (
        <div>
            <h1 className="title" style={{color:"black"}}> Conductores </h1>
            <h2 className="subtitle" style={{color:"black"}}> Modificar conductor </h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                    <form onSubmit={updateConductor}>
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
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input"  value={documentoIdentidad_DOC} onChange={(e) => setDocumentoIdentidad_DOC(e.target.files[0])} />
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
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={carnetSalud_DOC} onChange={(e) => setCarnetSalud_DOC(e.target.files[0])} />
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
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input"  value={licenciaConducir_DOC} onChange={(e) => setLicenciaConducir_DOC(e.target.files[0])} />
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
                                <button className="button is-primary" type="submit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>Actualizar Conductor</button>
                                <button className="button is-success" type="button" style={{ backgroundColor: "#183e6e", color: "white" }} onClick={cancelEdit}>
                                        Cancelar
                                    </button>
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

        </div>
    )
}

export default FormEditConductor;
