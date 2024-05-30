import React from 'react'

const Login = () => {
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
               
                <form className="box" action="">
                <h1 className="title is-2"> Inicio de Sesión </h1>
                    <div className="field">
                        <label  className="label"> Email </label>
                        <div className="control">
                            <input type="text" className="input" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="field">
                        <label  className="label"> Contraseña </label>
                        <div className="control">
                            <input type="password" className="input" placeholder="*****"/>
                        </div>
                    </div>
                    <div className="field mt-5">
                        <button className="button is-success is-fullwidth" style={{ backgroundColor: "#183e6e", color:"white"}}> Iniciar Sesión</button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login