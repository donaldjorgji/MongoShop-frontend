import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Koleksioni.css'

const Koleksioni = () => {

  const navigate = useNavigate();

  return (
    <div className="koleksioni">

      <h1>Të gjitha koleksionet</h1>

      <div className="koleksion-grid">

        <div 
          className="koleksion-card"
          onClick={() => navigate('/meshkuj')}
        >
          <h2>Meshkuj</h2>
          <p>Shiko koleksionin për meshkuj</p>
        </div>

        <div 
          className="koleksion-card"
          onClick={() => navigate('/femra')}
        >
          <h2>Femra</h2>
          <p>Shiko koleksionin për femra</p>
        </div>

        <div 
          className="koleksion-card"
          onClick={() => navigate('/femije')}
        >
          <h2>Fëmijë</h2>
          <p>Shiko koleksionin për fëmijë</p>
        </div>

      </div>

    </div>
  )
}

export default Koleksioni