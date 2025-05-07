import React, { useState, useEffect } from 'react';
import { getCartItemCount } from './cartOption'; // Adjust the path if needed

export const CartItemCount = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateItemCount = () => {
      setItemCount(getCartItemCount());
    };

    updateItemCount();

    const interval = setInterval(updateItemCount, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  return itemCount; // Return only the count
};