import { useState, useEffect } from "react";
import Header from "./assets/Pages/Header/Header"
import Main from "./assets/Pages/Main/Main"
import CartDrawer from "./assets/Components/CartDrawer/CartDrawer";

function App() {

  const [money, setMoney] = useState(() => {
    const saved = localStorage.getItem("money");
    return saved ? JSON.parse(saved) : 450000000000;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : {};
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [money, cart]);

  const handleInteract = (name, price, change) => {
    // change is 1 for buy, -1 for sell
    if (change === 1) {
      if (money < price) return; // Prevent buying if not enough money
    }
    if (change === -1) {
      if (!cart[name] || cart[name] <= 0) return; // Prevent selling if 0 quantity
    }

    setMoney(prev => prev - (price * change));
    setCart(prev => {
      const newQuantity = (prev[name] || 0) + change;
      return { ...prev, [name]: newQuantity };
    });
  };

  const handleSetQuantity = (name, price, newQuantity) => {
    const currentQuantity = cart[name] || 0;
    const diff = newQuantity - currentQuantity;

    if (diff === 0) return;

    if (diff > 0) {
      // Buying
      const cost = diff * price;
      if (money < cost) {
        // Optional: Buy as many as possible? Or just reject?
        // For now, strict check like the button
        return;
      }
      setMoney(prev => prev - cost);
    } else {
      // Selling
      const refund = Math.abs(diff) * price;
      setMoney(prev => prev + refund);
    }

    setCart(prev => {
      if (newQuantity <= 0) {
        const newCart = { ...prev };
        delete newCart[name];
        return newCart;
      }
      return { ...prev, [name]: newQuantity };
    });
  };

  const handleReset = () => {
    setMoney(450000000000);
    setCart({});
    localStorage.setItem("money", JSON.stringify(450000000000));
    localStorage.setItem("cart", JSON.stringify({}));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <Header money={money} onReset={handleReset} onToggleCart={toggleCart} cartCount={Object.values(cart).reduce((a, b) => a + b, 0)} />
      <Main cart={cart} onInteract={handleInteract} onSetQuantity={handleSetQuantity} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} />
    </>
  )
}

export default App
