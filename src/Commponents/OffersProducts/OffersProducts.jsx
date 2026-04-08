import React, { useEffect, useState } from 'react'
import './OffersProducts.css'
import { useNavigate } from 'react-router-dom'

const OffersProducts = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:4001/allproducts')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="loading">Loading...</p>
  }

  const femra = products.filter(p => p.category === "femra").slice(0, 3)
  const meshkuj = products.filter(p => p.category === "meshkuj").slice(0, 3)
  const femije = products.filter(p => p.category === "femije").slice(0, 3)

  
  const handleClick = (id) => {
    navigate(`/product/${id}`)
    window.scrollTo(0, 0)
  }

  const renderSection = (title, items) => (
    <div className="offers-section">
      <h2>{title}</h2>

      <div className="offers-grid">
        {items.map(item => (
          <div 
            className="offer-card" 
            key={item.id}
            onClick={() => handleClick(item.id)}
          >
            <div className="offer-image">
              <img src={item.image} alt={item.name} />
            </div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="offers-container">
      <h1 className="offers-title">Ofertat</h1>

      {renderSection("Femra", femra)}
      {renderSection("Meshkuj", meshkuj)}
      {renderSection("Femije", femije)}

    </div>
  )
}

export default OffersProducts