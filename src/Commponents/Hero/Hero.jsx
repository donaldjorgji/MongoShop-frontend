import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero3 from '../Assets/hero3.png'

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/koleksioni');
  };

  return (
    <div className='hero'>
      <div className="hero-majtas">
        <h2>Prurjet e Reja 🔥</h2>

        <div className="hero-text">
          <div className="hero-dora-icon">
            <p>Fresh</p>
            <img src={hand_icon} alt="ikonë dore" />
          </div>

          <p>Koleksioni më i ri</p>
          <p>për të gjithë stilin tënd</p>
        </div>

        <button className="hero-btn" onClick={handleClick}>
          Koleksioni më i fundit
          <img src={arrow_icon} alt="shigjetë" />
        </button>
      </div>

      <div className="hero-djathtas">
        <img src={hero3} alt="koleksion i ri veshjesh" />
      </div>
    </div>
  )
}

export default Hero
