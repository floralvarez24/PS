import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const FormAddFlete = () => {
    const [razonSocial, setRazonSocial] = useState('');
    const [obra, setObra] = useState('');
    const [contactoMail, setContactoMail] = useState('');
    const [contactoTel, setContactoTel] = useState('');
    const [rut, setRut] = useState('');
    const [direccion, setDireccion] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [condicionContrato_DOC, setCondicionContrato_DOC] = useState('');
    const [constInscripcionDGI_DOC, setConstInscripcionDGI_DOC] = useState('');
    const [constInscripcionBPS_DOC, setConstInscripcionBPS_DOC] = useState('');
    const [certDGI_DOC, setDocumentoCertDGI_DOC] = useState('');
    const [certComunBPS_DOC, setCertComunBPS_DOC] = useState('');
    const [segAccidenteTrab_DOC, setSegAccidenteTrab_DOC] = useState('');
    const [planillaTrab_DOC, setPlanillaTrab_DOC] = useState('');
    const [certDGI_FECHAVENCIMIENTO, setCertDGI_FECHAVENCIMIENTO] = useState('');
    const [certComunBPS_FECHAVENCIMIENTO, setCertComunBPS_FECHAVENCIMIENTO] = useState('');
    const [segAccidenteTrab_FECHAVENCIMIENTO, setSegAccidenteTrab_FECHAVENCIMIENTO] = useState('');
    const [planillaTrab_FECHAEMISION, setPlanillaTrab_FECHAEMISION] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveFlete = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/crear-flete',{
              razonSocial: razonSocial,
                obra: obra,
                contactoMail: contactoMail,
                contactoTel: contactoTel,
                rut: rut,
                direccion: direccion,
                departamento: departamento,
                condicionContrato_DOC: condicionContrato_DOC,
                constInscripcionDGI_DOC: constInscripcionDGI_DOC,
                constInscripcionBPS_DOC: constInscripcionBPS_DOC,
                certDGI_DOC: certDGI_DOC,
                certComunBPS_DOC: certComunBPS_DOC,
                segAccidenteTrab_DOC: segAccidenteTrab_DOC,
                planillaTrab_DOC: planillaTrab_DOC,
                certDGI_FECHAVENCIMIENTO: certDGI_FECHAVENCIMIENTO,
                certComunBPS_FECHAVENCIMIENTO: certComunBPS_FECHAVENCIMIENTO,
                segAccidenteTrab_FECHAVENCIMIENTO: segAccidenteTrab_FECHAVENCIMIENTO,
                planillaTrab_FECHAEMISION: planillaTrab_FECHAEMISION

            });
            navigate('/fletes');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
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
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={condicionContrato_DOC} onChange={(e) => setCondicionContrato_DOC (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Email </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={contactoMail} onChange={(e) => setContactoMail (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Teléfono </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" value={contactoTel} onChange={(e) => setContactoTel (e.target.value)} required/>
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
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={constInscripcionDGI_DOC} onChange={(e) => setConstInscripcionDGI_DOC (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de constancia de inscripción BPS </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={constInscripcionBPS_DOC} onChange={(e) => setConstInscripcionBPS_DOC (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento certificado DGI </label>
                        <div className="control">
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={certDGI_DOC} onChange={(e) => setDocumentoCertDGI_DOC(e.target.value)} />
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"value={certDGI_FECHAVENCIMIENTO} onChange={(e) => setCertDGI_FECHAVENCIMIENTO (e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento certificado común BPS </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={certComunBPS_DOC} onChange={(e) => setCertComunBPS_DOC(e.target.value)}/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" value={certComunBPS_FECHAVENCIMIENTO} onChange={(e) => setCertComunBPS_FECHAVENCIMIENTO (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de seguro de accidentes de trabajo</label>
                        <div className="control">
                            <input type="file"accept="application/pdf" className="input has-background-white has-text-black custom-input" value={segAccidenteTrab_DOC} onChange={(e) => setSegAccidenteTrab_DOC(e.target.value)}/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" value={segAccidenteTrab_FECHAVENCIMIENTO} onChange={(e) => setSegAccidenteTrab_FECHAVENCIMIENTO (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de planilla de trabajo </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={planillaTrab_DOC} onChange={(e) => setPlanillaTrab_DOC (e.target.value)}/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de emisión </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" value={planillaTrab_FECHAEMISION} onChange={(e) => setPlanillaTrab_FECHAEMISION(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" type="sumbit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}> Guardar </button>
                        <button className="button is-success" style={{ backgroundColor: "#183e6e", color: "white" }}> <Link to="/fletes">  Cancelar </Link></button>
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