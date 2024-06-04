import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddFlete = () => {
    const [razonSocial, setRazonSocial] = useState('');
    const [obra, setObra] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rut, setRut] = useState('');
    const [direccion, setDireccion] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [documentoContrato, setDocumentoContrato] = useState('');
    const [documentoInscripcionDGI, setDocumentoInscripcionDGI] = useState('');
    const [documentoInscripcionBPS, setDocumentoInscripcionBPS] = useState('');
    const [documentoCertificadoDGI, setDocumentoCertificadoDGI] = useState('');
    const [documentoCertificadoBPS, setDocumentoCertificadoBPS] = useState('');
    const [documentoSeguroAccidentesTrabajo, setDocumentoSeguroAccidentesTrabajo] = useState('');
    const [documentoPlanillaTrabajo, setDocumentoPlanillaTrabajo] = useState('');
    const [fechaVencimientoCertificadoDGI, setFechaVencimientoCertificadoDGI] = useState('');
    const [fechaVencimientoCertificadoBPS, setFechaVencimientoCertificadoBPS] = useState('');
    const [fechaVencimientoSeguroAccidentesTrabajo, setFechaVencimientoSeguroAccidentesTrabajo] = useState('');
    const [fechaEmisionPlanillaTrabajo, setFechaEmisionPlanillaTrabajo] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveFlete = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/crear-flete',{
            razonSocial: razonSocial,
            obra: obra,
            email: email,
            telefono: telefono,
            rut: rut,
            direccion: direccion,
            departamento: departamento,
            documentoContrato: documentoContrato,
            documentoInscripcionDGI: documentoInscripcionDGI,
            documentoInscripcionBPS: documentoInscripcionBPS,
            documentoCertificadoDGI: documentoCertificadoDGI,
            documentoCertificadoBPS: documentoCertificadoBPS,
            documentoSeguroAccidentesTrabajo: documentoSeguroAccidentesTrabajo,
            documentoPlanillaTrabajo: documentoPlanillaTrabajo,
            fechaVencimientoCertificadoDGI: fechaVencimientoCertificadoDGI,
            fechaVencimientoCertificadoBPS: fechaVencimientoCertificadoBPS,
            fechaVencimientoSeguroAccidentesTrabajo: fechaVencimientoSeguroAccidentesTrabajo,
            fechaEmisionPlanillaTrabajo: fechaEmisionPlanillaTrabajo,
            });
            navigate('/fletes');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
    }

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
                        <label  className="label" style={{color:"black"}}> Razón Social </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input"  value={razonSocial} onChange={(e) => setRazonSocial (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Obra </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input"value={obra} onChange={(e) => setObra (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento condición de contrato </label>
                        <div className="control">
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={documentoContrato} onChange={(e) => setDocumentoContrato (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Email </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={email} onChange={(e) => setEmail (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Teléfono </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={telefono} onChange={(e) => setTelefono (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> RUT </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={rut} onChange={(e) => setRut (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Dirección </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={direccion} onChange={(e) => setDireccion (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Departamento </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={departamento} onChange={(e) => setDepartamento (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de constancia de inscripción DGI </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={documentoInscripcionDGI} onChange={(e) => setDocumentoInscripcionDGI (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de constancia de inscripción BPS </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={documentoInscripcionBPS} onChange={(e) => setDocumentoInscripcionBPS (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento certificado DGI </label>
                        <div className="control">
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={documentoCertificadoDGI} onChange={(e) => setDocumentoCertificadoDGI(e.target.value)} />
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"value={fechaVencimientoCertificadoDGI} onChange={(e) => setFechaVencimientoCertificadoDGI (e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento certificado común BPS </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={documentoCertificadoBPS} onChange={(e) => setDocumentoCertificadoBPS (e.target.value)}/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" value={fechaVencimientoCertificadoBPS} onChange={(e) => setFechaVencimientoCertificadoBPS (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de seguro de accidentes de trabajo</label>
                        <div className="control">
                            <input type="file"accept="application/pdf" className="input has-background-white has-text-black custom-input" value={documentoSeguroAccidentesTrabajo} onChange={(e) => setDocumentoSeguroAccidentesTrabajo (e.target.value)}/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" value={fechaVencimientoSeguroAccidentesTrabajo} onChange={(e) => setFechaVencimientoSeguroAccidentesTrabajo (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de planilla de trabajo </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={documentoPlanillaTrabajo} onChange={(e) => setDocumentoPlanillaTrabajo (e.target.value)}/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de emisión </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" value={fechaEmisionPlanillaTrabajo} onChange={(e) => setFechaEmisionPlanillaTrabajo (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" type='sumbit' style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}> Guardar </button>
                        <button className="button is-success" style={{ backgroundColor: "#183e6e", color: "white" }}> Cancelar </button>
                        </div>      
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddFlete