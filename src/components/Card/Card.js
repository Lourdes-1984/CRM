import React from 'react'
import "./Card.css"

function Card() {
  return (
    <div className=''>
      <img src='' alt=''/>
      <div>
        <p>Nombre:</p>
        <p>Empresa:</p>
        <p>Email:</p>
        <p>Telefono:</p>

      </div>
      <div>
        <button>Editar</button>
        <button>Eliminar</button>

      </div>
    </div>
  )
}

export default Card
