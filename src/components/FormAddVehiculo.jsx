/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';



const FormAddVehiculo = () => {
    const [descripcion, setDescripcion] = useState('');
    const [libretaCirculacion_DOC, setLibretaCirculacion_DOC] = useState('');
    const [cedulaMTOP_DOC, setCedulaMTOP_DOC] = useState('');
    const [cedulaMTOP_FECHAVENCIMIENTO, setCedulaMTOP_FECHAVENCIMIENTO] = useState('');
    const [applus_DOC, setApplus_DOC] = useState('');
    const [applus_FECHAVENCIMIENTO, setApplus_FECHAVENCIMIENTO] = useState('');
    const [applus_VENCIDO, setApplus_VENCIDO] = useState('');
    const [applus_PRORROGA, setApplus_PRORROGA] = useState('');
    const [applus_PRORROGAVENCIDA, setApplus_PRORROGAVENCIDA] = useState('');
    const [soa_DOC , setSoa_DOC] = useState('');
    const [soa_FECHAVENCIMIENTO, setSoa_FECHAVENCIMIENTO] = useState('');
    const [soa_VENCIDO, setSoa_VENCIDO] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveVehiculo = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/crear-flete',{
                descripcion : descripcion,
                libretaCirculacion_DOC : libretaCirculacion_DOC,
                cedulaMTOP_DOC : cedulaMTOP_DOC,
                cedulaMTOP_FECHAVENCIMIENTO : cedulaMTOP_FECHAVENCIMIENTO,
                applus_DOC: applus_DOC,
                applus_FECHAVENCIMIENTO: applus_FECHAVENCIMIENTO,
                applus_VENCIDO: applus_VENCIDO,
                applus_PRORROGA: applus_PRORROGA,
                applus_PRORROGAVENCIDA: applus_PRORROGAVENCIDA,
                soa_DOC: soa_DOC,
                soa_FECHAVENCIMIENTO: soa_FECHAVENCIMIENTO,
                soa_VENCIDO: soa_VENCIDO

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
        <h1 className="title" style={{color:"black"}}> Vehículos </h1>
        <h2 className="subtitle" style={{color:"black"}}> Agregar nuevo vehículo </h2>
        <div className="card is-shadowless has-background-light">
            <div className="card-content">
                <div className="content">
                <form onSubmit={saveVehiculo}>
                    <p className='has-text-centered'>{msg}</p>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Descripción </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input"  value={descripcion} onChange={(e) => setDescripcion (e.target.value)} required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Libreta de Circulación pdf </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={libretaCirculacion_DOC} onChange={(e) => setLibretaCirculacion_DOC(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Cédula MTOP pdf </label>
                        <div className="control">
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" value={cedulaMTOP_DOC} onChange={(e) => setCedulaMTOP_DOC (e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Cédula MTOP Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"value={cedulaMTOP_FECHAVENCIMIENTO} onChange={(e) => setCedulaMTOP_FECHAVENCIMIENTO (e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> APPLUS pdf </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={applus_DOC} onChange={(e) => setApplus_DOC(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> APPLUS Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"value={applus_FECHAVENCIMIENTO} onChange={(e) => setApplus_FECHAVENCIMIENTO (e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> APPLUS Fecha de prórroga </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"value={applus_PRORROGA} onChange={(e) => setApplus_PRORROGA (e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> SOA pdf </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input" value={soa_DOC} onChange={(e) => setSoa_DOC(e.target.value)}/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> SOA Fecha de vencimiento</label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"value={soa_FECHAVENCIMIENTO} onChange={(e) => setSoa_FECHAVENCIMIENTO(e.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" type="sumbit" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}> <Link to="/fletes/add">Guardar</Link></button>
                        <button className="button is-success" style={{ backgroundColor: "#183e6e", color: "white" }}> <Link to="/fletes/add">  Cancelar </Link></button>
                        </div>      
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormAddVehiculo;*/
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const FormAddVehiculo = ({ fleteId }) => {
    const [descripcion, setDescripcion] = useState('');
    const [libretaCirculacion_DOC, setLibretaCirculacion_DOC] = useState('');
    const [cedulaMTOP_DOC, setCedulaMTOP_DOC] = useState('');
    const [cedulaMTOP_FECHAVENCIMIENTO, setCedulaMTOP_FECHAVENCIMIENTO] = useState('');
    const [cedulaMTOP_VENCIDO, setCedulaMTOP_VENCIDO] = useState('');
    const [applus_DOC, setApplus_DOC] = useState('');
    const [applus_FECHAVENCIMIENTO, setApplus_FECHAVENCIMIENTO] = useState('');
    const [applus_VENCIDO, setApplus_VENCIDO] = useState('');
    const [aplus_PRORROGA, setAplus_PRORROGA] = useState('');
    const [aplus_PRORROGAVENCIDA, setAplus_PRORROGAVENCIDA] = useState('');
    const [soa_DOC, setSoa_DOC] = useState('');
    const [soa_FECHAVENCIMIENTO, setSoa_FECHAVENCIMIENTO] = useState('');
    const [soa_VENCIDO, setSoa_VENCIDO] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const {idFletero}= useParams();

    const saveVehiculo = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/flete/${idFletero}/vehiculo`, {
                descripcion,
                libretaCirculacion_DOC,
                cedulaMTOP_DOC,
                cedulaMTOP_FECHAVENCIMIENTO,
                cedulaMTOP_VENCIDO,
                applus_DOC,
                applus_FECHAVENCIMIENTO,
                applus_VENCIDO,
                aplus_PRORROGA,
                aplus_PRORROGAVENCIDA,
                soa_DOC,
                soa_FECHAVENCIMIENTO,
                soa_VENCIDO
            });
            navigate(`/fletes/${idFletero}`);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

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
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setLibretaCirculacion_DOC(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> Cédula MTOP pdf </label>
                                <div className="control">
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setCedulaMTOP_DOC(e.target.value)} />
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
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setApplus_DOC(e.target.value)} />
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
                                    <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" onChange={(e) => setSoa_DOC(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> SOA Fecha de vencimiento </label>
                                <div className="control">
                                    <input type="date" className="input has-background-white has-text-black custom-input" value={soa_FECHAVENCIMIENTO} onChange={(e) => setSoa_FECHAVENCIMIENTO(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label" style={{ color: "black" }}> ¿Está vencido? </label>
                                <div className="control">
                                    <input type="checkbox" checked={soa_VENCIDO} onChange={(e) => setSoa_VENCIDO(e.target.checked)} />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-primary" type="submit">Agregar Vehículo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAddVehiculo;
