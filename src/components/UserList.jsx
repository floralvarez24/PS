import React from 'react'

const UserList = () => {
  return (
    <div className='has-background-light'>
        <h1 className="title" style={{color:"black"}}> Usuarios </h1>
        <h2 className="subtitle" style={{color:"black"}}> Lista de usuarios </h2>
        <table className='table is-striped is-fullwidth has-background-light'> 
            <thead>
                <tr>
                    <th style={{color:"black"}}>Número</th>
                    <th style={{color:"black"}}>Email</th>
                    <th style={{color:"black"}}>Rol</th>
                    <th style={{color:"black"}}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default UserList