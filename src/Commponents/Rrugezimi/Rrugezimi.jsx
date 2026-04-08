import React from 'react'
import './Rrugezimi.css'
import arrow_icon from '../Assets/rrugezimi_arrow.png'

const Rrugezimi = (props) => {
    const {product} = props;
    
  return (
    <div className='rrugezimi'>
      HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Rrugezimi
