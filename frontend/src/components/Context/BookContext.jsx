import React, { createContext, useState, useContext } from 'react';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [storeBooks, setStoreBooks] = useState([]);
  const [tempBook, setTempBook] = useState(null);


  const addBook = (book) => {
    setStoreBooks((prev) => [...prev, book]);
  };

  return (
    <BookContext.Provider value={{ storeBooks, addBook, tempBook, setTempBook}}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
