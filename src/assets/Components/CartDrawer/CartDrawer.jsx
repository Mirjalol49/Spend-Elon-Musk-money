import React, { useEffect } from 'react';
import useSound from 'use-sound';
import './CartDrawer.css';
import { products } from '../../../data/products';
import cartCloseSfx from '../../sounds/cart-close.mp3?url';
// import checkoutSfx from '../../sounds/checkout.mp3?url';

const CartDrawer = ({ isOpen, onClose, cart }) => {
    const [playClose] = useSound(cartCloseSfx, { volume: 0.5 });
    // const [playCheckout] = useSound(checkoutSfx);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        console.log('Closing cart, playing sound...');
        playClose();
        onClose();
    };

    const handleCheckout = () => {
        // playCheckout();
        // Add checkout logic here if needed
    };
    const cartItems = products.filter(product => cart[product.name] > 0);

    const total = cartItems.reduce((acc, item) => {
        return acc + (item.price * cart[item.name]);
    }, 0);

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}></div>
            <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Sizning Savatchangiz</h2>
                    <button className="close-btn" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart">Savatchangiz bo'sh</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{formatMoney(item.price)} x {cart[item.name]}</p>
                                </div>
                                <div className="cart-item-total">
                                    {formatMoney(item.price * cart[item.name])}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Jami:</span>
                        <span>{formatMoney(total)}</span>
                    </div>
                    <button className="checkout-btn" disabled={cartItems.length === 0} onClick={handleCheckout}>
                        Xarid qilish
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;
