import React from 'react';
import './Product.css';

const Product = ({ image, name, price, quantity, onInteract }) => {

    const handleBuy = () => {
        onInteract(name, price, 1);
    };

    const handleSell = () => {
        onInteract(name, price, -1);
    };

    // Format price
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(price);

    return (
        <div className='product-wrapper'>
            <div className='product-img-wrapper'>
                <img className='product-img' src={image} alt={name} />
            </div>
            <h1>{name}</h1>
            <p>{formattedPrice}</p>

            <div className="product-btns">
                <button
                    className="btn-sell"
                    onClick={handleSell}
                    disabled={quantity === 0}
                >
                    Sotish
                </button>

                <div className="product-quantity">
                    {quantity}
                </div>

                <button
                    className="btn-buy"
                    onClick={handleBuy}
                >
                    Sotib olish
                </button>
            </div>
        </div>
    );
}

export default Product; 