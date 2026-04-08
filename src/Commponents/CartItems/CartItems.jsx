import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)

  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')
  const [alertType, setAlertType] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const applyPromoCode = () => {
    if (promoCode === 'PROMO') {
      setDiscount(0.5)
      setAlertType('success')
      setMessage('Kodi u aplikua! 🎉 Ke 50% ulje')
    } else {
      setDiscount(0)
      setAlertType('error')
      setMessage('Kodi nuk është i vlefshëm ❌')
    }

    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  const handleCheckout = () => {
    setAlertType('success')
    setMessage('Porosia u krye me sukses 🎉')
    setShowMessage(true)

    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const total = getTotalCartAmount()
  const finalTotal = (total * (1 - discount)).toFixed(2)

  return (
    <div className='cartitems'>

      {/* ALERT */}
      {showMessage && (
        <div className={`custom-alert ${alertType}`}>
          {message}
        </div>
      )}

      <div className="cartitems-format-main">
        <p>Produkti</p>
        <p>Titulli</p>
        <p>Cmimi</p>
        <p>Sasia</p>
        <p>Totali</p>
        <p>Hiq</p>
      </div>

      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon' />
                <p>{e.name}</p>
                <p>€{e.new_price}</p>
                <button className='cartitems-quantity'>
                  {cartItems[e.id]}
                </button>
                <p>€{(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                <img
                  className='cartitems-remove-icon'
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          )
        }
        return null
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Totali i kartës</h1>

          <div>
            <div className="cartitems-total-item">
              <p>Vlera</p>
              <p>€{total}</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <p>Zbritje</p>
              <p>-{discount * 100}%</p>
            </div>

            <hr />

            <div className="cartitems-total-item">
              <h3>Totali</h3>
              <h3>€{finalTotal}</h3>
            </div>
          </div>

          <button onClick={handleCheckout}>
            Vazhdo me pagesën
          </button>
        </div>

        <div className="cartitems-promocode">
          <p>Nëse ke një kod promocional vendose këtu</p>

          <div className="cartitems-promobox">
            <input
              type="text"
              placeholder='promo code'
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />

            <button onClick={applyPromoCode}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems