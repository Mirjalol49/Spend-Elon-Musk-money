import React from 'react';
import './Product.css';

const Product = ({ image, name, price, quantity, onInteract, onSetQuantity }) => {

    const handleBuy = () => {
        onInteract(name, price, 1);
    };

    const handleSell = () => {
        onInteract(name, price, -1);
    };

    const handleQuantityChange = (e) => {
        const val = e.target.value;
        // Allow empty string for better typing experience, but treat as 0 for logic if needed
        // or just don't update if empty/invalid
        if (val === '') {
            onSetQuantity(name, price, 0);
            return;
        }

        const newQuantity = parseInt(val, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            onSetQuantity(name, price, newQuantity);
        }
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

                <input
                    type="number"
                    className="product-quantity-input"
                    value={quantity === 0 ? '' : quantity}
                    onChange={handleQuantityChange}
                    placeholder="0"
                    min="0"
                />

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