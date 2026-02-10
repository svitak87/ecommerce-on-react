import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { image, name, price, id } = product;
    const { addToCart, cartItems } = useContext(CartContext);
    const productsInCart = cartItems.find((item) => Number(item.id) === id)
    const productsQuantityLabel = productsInCart ? `(${productsInCart.quantity})` : "";
    
    return (
        <div className="product-card">
            <img
                src={image}
                alt={name}
                className="product-card-image"
            />
            <div className="product-card-content">
                <h3 className="product-card-name">{name}</h3>
                <p className="product-card-price">{price}</p>
                <div className="product-card-actions">
                    <Link className="btn btn-secondary" to={`/details/${id}`}>
                        View details
                    </Link>
                    <button
                        className="btn btn-secondary"
                        onClick={() => addToCart(id)}>
                        Add to cart {productsQuantityLabel}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard;
