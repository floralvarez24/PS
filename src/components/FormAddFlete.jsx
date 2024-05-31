import React from 'react'

const FormAddFlete = () => {
  return (
    <div>
        <h1 className="title" style={{color:"black"}}> Fletes </h1>
        <h2 className="subtitle" style={{color:"black"}}> Agregar nuevo flete </h2>
        <div className="card is-shadowless has-background-light">
            <div className="card-content">
                <div className="content">
                <form method="post" action="/send/" enctype="multipart/form-data">
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Razón Social </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Obra </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento condición de contrato </label>
                        <div className="control">
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Email </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Teléfono </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> RUT </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Dirección </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Departamento </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de constancia de inscripción DGI </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de constancia de inscripción BPS </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento certificado DGI </label>
                        <div className="control">
                            <input type="file" accept="application/pdf" className="input has-background-white has-text-black custom-input" />
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input" />
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento certificado común BPS </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input"/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de seguro de accidentes de trabajo</label>
                        <div className="control">
                            <input type="file"accept="application/pdf" className="input has-background-white has-text-black custom-input"/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de vencimiento </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Documento de planilla de trabajo </label>
                        <div className="control">
                            <input type="file" accept="application/pdf"className="input has-background-white has-text-black custom-input"/>
                        </div>
                        <label  className="label" style={{color:"black"}}> Fecha de emisión </label>
                        <div className="control">
                            <input type="date" className="input has-background-white has-text-black custom-input"/>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                        <button className="button is-success" style={{ backgroundColor: "#183e6e", color: "white", marginRight: "10px" }}> Guardar </button>
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