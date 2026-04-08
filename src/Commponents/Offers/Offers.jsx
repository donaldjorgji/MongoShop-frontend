import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { useNavigate } from 'react-router-dom'

const Offers = () => {

  const navigate = useNavigate();

  return (
    <div className='offers'>
        <div className='offers-majtas'>
            <h1>Eksklusive</h1>
            <h1>Oferta vetem per ju</h1>
            <p>VETEM NE PRODUKTET ME TE SHITUR</p>
            <button onClick={() => navigate('/offers')}>
              Shiko
            </button>
        </div>
        <div className='offers-djathtas'>
            <img src={exclusive_image} alt=''/>
        </div>
    </div>
  )
}

export default Offers

