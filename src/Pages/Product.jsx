import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Rrugezimi from '../Commponents/Rrugezimi/Rrugezimi'
import ProductDisplay from '../Commponents/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Commponents/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Commponents/RelatedProduct/RelatedProducts'

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  if (!all_product || all_product.length === 0) {
    return <div>Loading...</div>;
  }

  const product = all_product.find(
    (e) => e.id === Number(productId)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Rrugezimi product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox />
      <RelatedProducts currentProduct={product} />
    </div>
  );
};

export default Product