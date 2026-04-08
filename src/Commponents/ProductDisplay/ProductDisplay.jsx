import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    const [size, setSize] = useState("");
    const [error, setError] = useState("");

    return (
        <div className='productdisplay'>
            <div className="productdisplay-majtas">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>

            <div className="productdisplay-djathtas">
                <h1>{product.name}</h1>

                <div className="productdisplay-djathtas-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>

                <div className="productdisplay-djathtas-prices">
                    <div className="productdisplay-djathtas-price-old">
                        €{product.old_price}
                    </div>
                    <div className="productdisplay-djathtas-price-new">
                        €{product.new_price}
                    </div>
                </div>

                <div className="productdisplay-djathtas-description">
                    Një bluzë e lehtë, zakonisht e thurur, që vishet pa kopsa (pulovër),
                    e ngushtë pas trupit, me jakë rrethore dhe mëngë të shkurtra.
                </div>

                <div className="productdisplay-djathtas-size">
                    <h1>Zgjidh masen</h1>

                    <div className="productdisplay-djathtas-sizes">
                        {["S", "M", "L", "XL", "XXL"].map((s, i) => (
                            <div
                                key={i}
                                onClick={() => {
                                    setSize(s);
                                    setError("");
                                }}
                                className={`size-box ${size === s ? "active" : ""}`}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🔴 ALERT I KUQ */}
                {error && <p className="custom-alert">⚠️ {error}</p>}

                <button
                    onClick={() => {
                        if (!size) {
                            setError("Zgjidh nje mase!");
                            setTimeout(() => setError(""), 2000);
                            return;
                        }
                        addToCart(product.id, size);
                    }}
                >
                    Shto ne shporte
                </button>

                <p className='productdisplay-djathtas-category'>
                    <span>Kategori :</span> Femra, T-Shirt, Crop Top
                </p>

                <p className='productdisplay-djathtas-category'>
                    <span>Tags :</span> Modern, Latest
                </p>
            </div>
        </div>
    )
}

export default ProductDisplay