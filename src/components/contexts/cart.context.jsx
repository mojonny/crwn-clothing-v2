import { createContext, useState, useEffect } from 'react';
//Made a helper function to add to the cart new or more items
const addCartItem = (cartItems, productToAdd) => {
	//find if cart items contains product to add
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map(
			(cartItem) =>
				cartItem.id === productToAdd.id
					? { ...cartItem, quantity: cartItem.quantity + 1 } //return a new item
					: cartItem //doesn't change anything since it is the first one
		);
	}

	//if found, then add to qty
	//return new array with modified cart items

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [], //same as product but need quantity too
	addItemToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};
	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		setCartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
