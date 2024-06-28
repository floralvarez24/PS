import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import VehiculosList from './VehiculosList';

const FormAddFlete = () => {
    const [razonSocial, setRazonSocial] = useState(localStorage.getItem('razonSocial') || '');
    const [obra, setObra] = useState(localStorage.getItem('obra') || '');
    const [contactoMail, setContactoMail] = useState(localStorage.getItem('contactoMail') || '');
    const [contactoTel, setContactoTel] = useState(localStorage.getItem('contactoTel') || '');
    const [rut, setRut] = useState(localStorage.getItem('rut') || '');
    const [direccion, setDireccion] = useState(localStorage.getItem('direccion') || '');
    const [departamento, setDepartamento] = useState(localStorage.getItem('departamento') || '');
    const [condicionContrato_DOC, setCondicionContrato_DOC] = useState(localStorage.getItem('condicionContrato_DOC') || '');
    const [constInscripcionDGI_DOC, setConstInscripcionDGI_DOC] = useState(localStorage.getItem('constInscripcionDGI_DOC') || '');
    const [constInscripcionBPS_DOC, setConstInscripcionBPS_DOC] = useState(localStorage.getItem('constInscripcionBPS_DOC') || '');
    const [certDGI_DOC, setDocumentoCertDGI_DOC] = useState(localStorage.getItem('certDGI_DOC') || '');
    const [certComunBPS_DOC, setCertComunBPS_DOC] = useState(localStorage.getItem('certComunBPS_DOC') || '');
    const [segAccidenteTrab_DOC, setSegAccidenteTrab_DOC] = useState(localStorage.getItem('segAccidenteTrab_DOC') || '');
    const [planillaTrab_DOC, setPlanillaTrab_DOC] = useState(localStorage.getItem('planillaTrab_DOC') || '');
    const [certDGI_FECHAVENCIMIENTO, setCertDGI_FECHAVENCIMIENTO] = useState(localStorage.getItem('certDGI_FECHAVENCIMIENTO') || '');
    const [certComunBPS_FECHAVENCIMIENTO, setCertComunBPS_FECHAVENCIMIENTO] = useState(localStorage.getItem('certComunBPS_FECHAVENCIMIENTO') || '');
    const [segAccidenteTrab_FECHAVENCIMIENTO, setSegAccidenteTrab_FECHAVENCIMIENTO] = useState(localStorage.getItem('segAccidenteTrab_FECHAVENCIMIENTO') || '');
    const [planillaTrab_FECHAEMISION, setPlanillaTrab_FECHAEMISION] = useState(localStorage.getItem('planillaTrab_FECHAEMISION') || '');
    const [msg, setMsg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [newFleteId, setNewFleteId] = useState(null);
    const navigate = useNavigate();


    const saveFlete = async (e) => {
        e.preventDefault();
        try {
       const response =  await axios.post('http://localhost:3001/crear-flete', {
                razonSocial,
                obra,
                contactoMail,
                contactoTel,
                rut,
                direccion,
                departamento,
                condicionContrato_DOC,
                constInscripcionDGI_DOC,
                constInscripcionBPS_DOC,
                certDGI_DOC,
                certComunBPS_DOC,
                segAccidenteTrab_DOC,
                planillaTrab_DOC,
                certDGI_FECHAVENCIMIENTO,
                certComunBPS_FECHAVENCIMIENTO,
                segAccidenteTrab_FECHAVENCIMIENTO,
                planillaTrab_FECHAEMISION
            });
           
            setShowModal(true);
            setNewFleteId(response.data.id); // Guardar el id del nuevo flete
            
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!showModal && newFleteId) {
            navigate(`/fletes/edit/${newFleteId}`); // Navegar a la página de edición del flete con el ID recién creado
        }
    }, [showModal, newFleteId]);
    // Guardar en local storage cuando cambia algún campo
    useEffect(() => {
        localStorage.setItem('razonSocial', razonSocial);
        localStorage.setItem('obra', obra);
        localStorage.setItem('contactoMail', contactoMail);
        localStorage.setItem('contactoTel', contactoTel);
        localStorage.setItem('rut', rut);
        localStorage.setItem('direccion', direccion);
        localStorage.setItem('departamento', departamento);
        localStorage.setItem('condicionContrato_DOC', condicionContrato_DOC);
        localStorage.setItem('constInscripcionDGI_DOC', constInscripcionDGI_DOC);
        localStorage.setItem('constInscripcionBPS_DOC', constInscripcionBPS_DOC);
        localStorage.setItem('certDGI_DOC', certDGI_DOC);
        localStorage.setItem('certComunBPS_DOC', certComunBPS_DOC);
        localStorage.setItem('segAccidenteTrab_DOC', segAccidenteTrab_DOC);
        localStorage.setItem('planillaTrab_DOC', planillaTrab_DOC);
        localStorage.setItem('certDGI_FECHAVENCIMIENTO', certDGI_FECHAVENCIMIENTO);
        localStorage.setItem('certComunBPS_FECHAVENCIMIENTO', certComunBPS_FECHAVENCIMIENTO);
        localStorage.setItem('segAccidenteTrab_FECHAVENCIMIENTO', segAccidenteTrab_FECHAVENCIMIENTO);
        localStorage.setItem('planillaTrab_FECHAEMISION', planillaTrab_FECHAEMISION);
    }, [
        razonSocial, obra, contactoMail, contactoTel, rut, direccion, departamento,
        condicionContrato_DOC, constInscripcionDGI_DOC, constInscripcionBPS_DOC,
        certDGI_DOC, certComunBPS_DOC, segAccidenteTrab_DOC, planillaTrab_DOC,
        certDGI_FECHAVENCIMIENTO, certComunBPS_FECHAVENCIMIENTO,
        segAccidenteTrab_FECHAVENCIMIENTO, planillaTrab_FECHAEMISION
    ]);

    // Limpiar local storage al montar el componente
    useEffect(() => {
        localStorage.removeItem('razonSocial');
        localStorage.removeItem('obra');
        localStorage.removeItem('contactoMail');
        localStorage.removeItem('contactoTel');
        localStorage.removeItem('rut');
        localStorage.removeItem('direccion');
        localStorage.removeItem('departamento');
        localStorage.removeItem('condicionContrato_DOC');
        localStorage.removeItem('constInscripcionDGI_DOC');
        localStorage.removeItem('constInscripcionBPS_DOC');
        localStorage.removeItem('certDGI_DOC');
        localStorage.removeItem('certComunBPS_DOC');
        localStorage.removeItem('segAccidenteTrab_DOC');
        localStorage.removeItem('planillaTrab_DOC');
        localStorage.removeItem('certDGI_FECHAVENCIMIENTO');
        localStorage.removeItem('certComunBPS_FECHAVENCIMIENTO');
        localStorage.removeItem('segAccidenteTrab_FECHAVENCIMIENTO');
        localStorage.removeItem('planillaTrab_FECHAEMISION');
    }, []);

    // Limpiar local storage al hacer clic en cancelar
    const handleCancel = () => {
        localStorage.removeItem('razonSocial');
        localStorage.removeItem('obra');
        localStorage.removeItem('contactoMail');
        localStorage.removeItem('contactoTel');
        localStorage.removeItem('rut');
        localStorage.removeItem('direccion');
        localStorage.removeItem('departamento');
        localStorage.removeItem('condicionContrato_DOC');
        localStorage.removeItem('constInscripcionDGI_DOC');
        localStorage.removeItem('constInscripcionBPS_DOC');
        localStorage.removeItem('certDGI_DOC');
        localStorage.removeItem('certComunBPS_DOC');
        localStorage.removeItem('segAccidenteTrab_DOC');
        localStorage.removeItem('planillaTrab_DOC');
        localStorage.removeItem('certDGI_FECHAVENCIMIENTO');
        localStorage.removeItem('certComunBPS_FECHAVENCIMIENTO');
        localStorage.removeItem('segAccidenteTrab_FECHAVENCIMIENTO');
        localStorage.removeItem('planillaTrab_FECHAEMISION');
    };

    return (
        <div>
            <h1 className="title" style={{color:"black"}}> Fletes </h1>
            <h2 className="subtitle" style={{color:"black"}}> Agregar nuevo flete </h2>
            <div className="card is-shadowless has-background-light">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveFlete}>
                            <p className='has-text-centered'>{msg}</p>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Razón Social </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input"  value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Obra </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={obra} onChange={(e) => setObra(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Correo de contacto </label>
                                <div className="control">
                                    <input type="email" className="input has-background-white has-text-black custom-input" value={contactoMail} onChange={(e) => setContactoMail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Teléfono de contacto </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={contactoTel} onChange={(e) => setContactoTel(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> RUT </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={rut} onChange={(e) => setRut(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Dirección </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={direccion} onChange={(e) => setDireccion(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Departamento </label>
                                <div className="control">
                                    <input type="text" className="input has-background-white has-text-black custom-input" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Documento de constancia de inscripción DGI </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={constInscripcionDGI_DOC} onChange={(e) => setConstInscripcionDGI_DOC(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Documento de constancia de inscripción BPS </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={constInscripcionBPS_DOC} onChange={(e) => setConstInscripcionBPS_DOC(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Documento certificado DGI </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={certDGI_DOC} onChange={(e) => setDocumentoCertDGI_DOC(e.target.value)} />
                                </div>
                                <label className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input"value={certDGI_FECHAVENCIMIENTO} onChange={(e) => setCertDGI_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Documento certificado común BPS </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={certComunBPS_DOC} onChange={(e) => setCertComunBPS_DOC(e.target.value)}/>
                                </div>
                                <label className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={certComunBPS_FECHAVENCIMIENTO} onChange={(e) => setCertComunBPS_FECHAVENCIMIENTO(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Documento de seguro de accidentes de trabajo</label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={segAccidenteTrab_DOC} onChange={(e) => setSegAccidenteTrab_DOC(e.target.value)}/>
                                </div>
                                <label className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={segAccidenteTrab_FECHAVENCIMIENTO} onChange={(e) => setSegAccidenteTrab_FECHAVENCIMIENTO(e.target.value)}/>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{color:"black"}}> Documento de planilla de trabajo </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={planillaTrab_DOC} onChange={(e) => setPlanillaTrab_DOC(e.target.value)}/>
                                </div>
                                <label className="label" style={{color:"black"}}> Fecha de emisión </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={planillaTrab_FECHAEMISION} onChange={(e) => setPlanillaTrab_FECHAEMISION(e.target.value)}/>
                                </div>
                            </div>
                            
                            <div className="field">
                                <div className="control">
                                    <button className="button is-success" type="submit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}>   Guardar Flete </button>
                                    <button className="button is-success" style={{ backgroundColor: "#183e6e", color: "white" }} onClick={handleCancel}> <Link to="/fletes">  Cancelar </Link></button>
                                </div>      
                            </div>
                        </form>
                        <VehiculosList />
                        <div className={`modal ${showModal ? 'is-active' : ''}`}>
                         <div className="modal-background"></div>
                        <div className="modal-card">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Cambios guardados</p>
                        <button className="delete" aria-label="close" onClick={closeModal}></button>
                        </header>
                    <section className="modal-card-body">
                        <p> Flete guardado exitosamente.</p>
                    </section>
                </div>
            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddFlete;