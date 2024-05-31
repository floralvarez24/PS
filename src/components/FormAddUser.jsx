import React from 'react'

const FormAddUser = () => {
  return (
    <div>
        <h1 className="title" style={{color:"black"}}>Usuarios</h1>
        <h2 className="subtitle" style={{color:"black"}}> Agregar nuevo usuario </h2>
        <div className="card is-shadowless has-background-light">
            <div className="card-content">
                <div className="content">
                <form action="">
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Email </label>
                        <div className="control">
                            <input type="text" className="input has-background-white has-text-black custom-input" required placeholder="Email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Contraseña </label>
                        <div className="control">
                            <input type="password" className="input has-background-white has-text-black custom-input" required placeholder="*****"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Confirmar contraseña </label>
                        <div className="control">
                            <input type="password" className="input has-background-white has-text-black custom-input" style={{color:"black"}} required placeholder="*****"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label" style={{color:"black"}}> Rol </label>
                        <div className="control">
                           <div className="select is-fullwitdh ">
                            <select name="" id="">
                                <option value="1"> 1-Admin</option>
                                <option value="2"> 2-Usuario</option>
                            </select>
                            </div> 
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

export default FormAddUser