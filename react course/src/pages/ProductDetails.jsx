import { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const { addToCart, cartItems } = useContext(CartContext);
    const productsInCart = cartItems.find((item) => item.id === Number(id))
    const productsQuantityLabel = productsInCart ? `(${productsInCart.quantity})` : "";

    useEffect(() => {
        const handleDetails = () => {
            let result;
            result = getProductById(id);
            setProduct(result)
            if (!result) {
                navigate("/");
                return
            }
        }
        handleDetails()
    }, [id]);


    return (
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-content">
                        <h1 className='product-detail-name'>{product.name}</h1>
                        <p className='product-detail-price'>{product.price}</p>
                        <p className='product-detail-description'>{product.description}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => addToCart(id)}
                        >
                            cart {`${productsQuantityLabel}`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails