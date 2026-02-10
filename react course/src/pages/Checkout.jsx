import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';


const Checkout = () => {
  const {
    getCartItemsSumary,
    updateQuantity,
    removeFromCart,
    getTotalCartSumary,
    clearCartContent
  } = useContext(CartContext);

  const cartItems = getCartItemsSumary();
  const total = getTotalCartSumary();
  const navigate = useNavigate();

  const handleFinalPurchase = () => {
    if (cartItems.length === 0) {
      alert("There are no items in the cart")
    } else {
      clearCartContent();
      navigate("/")
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-container">
          <div className="checkout-items">
            <h2 className="checkout-section-title">Order Sumary</h2>
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-items-detail">
                  <h3 className="checkout-item-name">{item.product.name}</h3>
                  <p className="checkout-item-price">{item.product.price} each*</p>
                </div>
                <div className="checkout-items-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                  </div>
                  <p className="checkout-item-total">
                    {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="checkout-sumary">
              <h2 className="checkout-section-title">Total:</h2>
              <div className="checkout-total">
                <p className="checkout-total-label">Subtotal:</p>
                <p className="checkout-total-value">{total.toFixed(2)}</p>
              </div>
              <div className="checkout-total">
                <p className="checkout-total-label"></p>
                <p className="checkout-total-value checkout-total-final">{total.toFixed(2)}</p>
              </div>
              <button className='btn btn-primary btn-large btn-block' onClick={handleFinalPurchase}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;

