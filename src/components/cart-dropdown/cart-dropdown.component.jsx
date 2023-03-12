import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';

export default function CartDropdown() {
	const { cartItems, setIsCartOpen } = useContext(CartContext);
	const navigate = useNavigate();

	const navigateToCheckout = () => {
		navigate('/checkout');
		setIsCartOpen(false);
	};

	return (
		<div className="cart-dropdown-container">
			<div className="cart-items">
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={navigateToCheckout}>Go to checkout</Button>
		</div>
	);
}
