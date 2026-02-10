import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';

const ProductCard = ({ product }) => {
    const { image, name, price, id } = product;
    const navigate = useNavigate();

    const handleDetails = () => {
        let result;
        result = getProductById(id);

        if (result) {
            navigate(`/details/${id}`)
        }
    }
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
                    <button className="btn btn-secondary">Add to cart</button>
                </div>
            </div>

        </div>
    )
}

export default ProductCard;
