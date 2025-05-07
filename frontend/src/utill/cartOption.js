import Cookies from 'js-cookie';

/**
 * Add an item to the cart stored in cookies.
 * @param {Object} item - The item to add to the cart.
 */
export const addToCart = (item) => {
  const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
  cart.push(item);
  Cookies.set('cart', JSON.stringify(cart), { expires: 7 }); // Expires in 7 days
};

/**
 * Get all items from the cart stored in cookies.
 * @returns {Array} - The list of items in the cart.
 */
export const getCart = () => {
  return Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
};

/**
 * Remove an item from the cart stored in cookies by its ID.
 * @param {string} itemId - The ID of the item to remove.
 */
export const removeFromCart = (itemId) => {
  const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
  const updatedCart = cart.filter((item) => item.id !== itemId);
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
};

/**
 * Clear the entire cart stored in cookies.
 */
export const clearCart = () => {
  Cookies.remove('cart');
};
/**
 * Get the total count of items in the cart.
 * @returns {number} - The total quantity of items in the cart.
 */
export const getCartItemCount = () => {
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    return cart.reduce((total, item) => total + item.quantity, 0);
  };