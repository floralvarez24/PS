import React from 'react'
import { useSelector } from 'react-redux';

 const Welcome = () => {
  const {user} = useSelector((state) => state.auth);
  return (
    <div>
        <h1 className="title" style={{color:"black"}}>Incio</h1>
        <h2 className="subtitle" style={{color:"black"}}> Bienvenido de nuevo... <strong style={{color:"black"}}> {user &&  user.mail} </strong></h2>
    </div>
  )
}

export default Welcome;