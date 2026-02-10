import react from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const Cart = () => {
  const { cartItems } = useContext(CartContext)
 
  return (
    <div>
      
    </div>
  )
}

export default Cart