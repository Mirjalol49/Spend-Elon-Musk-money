import React, { useState, useEffect } from 'react'
import useSound from 'use-sound';
import './Header.css'
import Money from '../../Components/Money/Money';
import alisherImage from '../../Images/elonmusk.jpg';

import refreshAnimation from '../../Images/refresh.json?url';
import cartAnimation from '../../Images/cart.json?url';
import cartOpenSfx from '../../sounds/cart-open.mp3?url';
import resetSfx from '../../sounds/clean.mp3?url';

const Header = ({ money, onReset, onToggleCart, cartCount }) => {
  const [playCartOpen] = useSound(cartOpenSfx, { volume: 0.5 });
  const [playReset] = useSound(resetSfx, { volume: 0.5 });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartPlayerRef = React.useRef(null);
  const resetPlayerRef = React.useRef(null);

  const handleMouseEnter = (ref) => {
    if (ref.current) {
      ref.current.play();
    }
  };

  const handleMouseLeave = (ref) => {
    if (ref.current) {
      ref.current.stop();
    }
  };

  const handleCartClick = () => {
    playCartOpen();
    onToggleCart();
  };

  const handleResetClick = () => {
    playReset();
    onReset();
  };

  return (
    <div className="header-wrapper">
      <div className="header-hero">
        <img
          src={alisherImage}
          alt="Alisher Usmonov"
          className="header-avatar"
        />
        <h1>Faraz qiling, Elon Musk puli sizniki bo'lganda qanday sarflar edingiz?</h1>
      </div>

      <div className="header-sticky-bar">
        <Money value={money} />

        <div className="header-actions">
          <button
            className="cart-btn"
            onClick={handleCartClick}
            title="Savatchani ko'rish"
            onMouseEnter={() => handleMouseEnter(cartPlayerRef)}
            onMouseLeave={() => handleMouseLeave(cartPlayerRef)}
          >
            <span>Savatcha</span>
            <lottie-player
              ref={cartPlayerRef}
              src={cartAnimation}
              background="transparent"
              speed="1"
              loop
              style={{ width: '30px', height: '30px' }}
            ></lottie-player>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button
            className="reset-btn"
            onClick={handleResetClick}
            title="Qayta boshlash"
            onMouseEnter={() => handleMouseEnter(resetPlayerRef)}
            onMouseLeave={() => handleMouseLeave(resetPlayerRef)}
          >
            <span>Tozalash</span>
            <lottie-player
              ref={resetPlayerRef}
              src={refreshAnimation}
              background="transparent"
              speed="1"
              loop
              style={{ width: '30px', height: '30px' }}
            ></lottie-player>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;