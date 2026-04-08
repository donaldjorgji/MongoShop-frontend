import React, { useContext, useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = ({ currentProduct }) => {
  const { all_product } = useContext(ShopContext)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    if (!currentProduct || !all_product) return

    // Filtrimi sipas kategorisë
    const filteredProducts = all_product.filter(
      (item) =>
        item.category === currentProduct.category &&
        item.id !== currentProduct.id
    )

    // Shuffle
    const shuffledProducts = [...filteredProducts].sort(
      () => 0.5 - Math.random()
    )

    // Merr 3 produkte
    setRelatedProducts(shuffledProducts.slice(0, 3))
  }, [currentProduct, all_product])

  return (
    <div className='relatedproducts'>
      <h1>Produkte te ngjashme</h1>
      <hr />
      <div className='relatedproducts-item'>
        {relatedProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts