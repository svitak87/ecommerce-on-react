import { createContext, useState } from "react";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItem] = useState([]);

    const addToCart = (productId) => {
        const id = Number(productId)
        const existingItem = cartItems.find((item) => item.id === id)

        if (existingItem) {
            const currentQuantity = existingItem.quantity;
            const updateCartItems = cartItems.map((item) => (
                item.id === id
                    ? { id: id, quantity: currentQuantity + 1 }
                    : item
            ))
            setCartItem(updateCartItems)
        } else {
            setCartItem([...cartItems, { id: id, quantity: 1 }]);
        }
    }

    const getCartItemsSumary = () => {
        return cartItems.map((item) => ({
            ...item,
            product: getProductById(item.id)
        })).filter(item => item.product);
    };

    const removeFromCart = (productId) => {
        const id = Number(productId);

        setCartItem(cartItems.filter((item) => item.id !== id))
    };

    const updateQuantity = (productId, quantity) => {
        const id = Number(productId);

        if (quantity <= 0) {
            removeFromCart(id)
            return;
        }
        setCartItem(cartItems.map((item) => (
            item.id === id ? { ...item, quantity } : item
        )));
    };

    const getTotalCartSumary = () => {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0)
        }, 0)
        return total;
    }

    const clearCartContent = () => {
        alert("Your purchase was successful!")
        setCartItem([])
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, getCartItemsSumary, removeFromCart, updateQuantity, getTotalCartSumary, clearCartContent }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;