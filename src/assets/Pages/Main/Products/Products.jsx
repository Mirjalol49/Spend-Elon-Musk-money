import React from 'react';
import './Products.css';
import Product from '../../../Components/Product/Product';
import { products } from '../../../../data/products';

const Products = ({ cart, onInteract, onSetQuantity }) => {
    return (
        <div className="products-container">
            {products.map((product) => (
                <Product
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={cart[product.name] || 0}
                    onInteract={onInteract}
                    onSetQuantity={onSetQuantity}
                />
            ))}
        </div>
    );
}

export default Products;