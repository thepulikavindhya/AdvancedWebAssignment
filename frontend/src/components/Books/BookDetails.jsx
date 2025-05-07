import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Button, Grid, CircularProgress, Chip, Box
} from '@mui/material';
import NavBar from '../Navigation/NavBar';
import { getBookByIdReq } from '../../repository/books_repository'; 
import { addToCart } from '../../utill/cartOption';

const item = { id: '1', name: 'Book', price: 10 };
addToCart(item);
const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await getBookByIdReq(id); // Use the repository API call
        setBook({
          id: res.data.id,
          title: res.data.title,
          author: res.data.author || 'Unknown Author',
          description: res.data.description || 'No description available.',
          category: res.data.category || 'Uncategorized',
          image: res.data.thumbnail || '',
          price: res.data.price || '0.00',
          stock: res.data.stock || false,
        });
      } catch (err) {
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  
const handleAddToCart = () => {
  addToCart(book); 
  navigate('/cart'); 
};

  return (
    <Box
    sx={{
      position: 'relative', // Allows layering
      margin: 0,
      padding: 0,
      width: '100vw',
      minHeight: '100vh',
      bgcolor: '#ffffff',
    }}
  >
    
  
    {/* Content */}
    <Box sx={{ position: 'relative', zIndex: 2,fontWeight:'bold' }}>
      <NavBar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : book ? (
        <Container maxWidth="lg" sx={{ py: 6, color: '#fff' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  background: '#000000',
                  padding: 10,
                  borderRadius: 8,
                }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h4" gutterBottom color="#370617">{book.title}</Typography>
              <Typography variant="h6" gutterBottom color="#000">Author: {book.author}</Typography>
              <Typography variant="body1" paragraph color="#000">{book.description}</Typography>
              <Typography variant="subtitle1" color="#000">Category: {book.category}</Typography>
              <Typography variant="h6" sx={{ mt: 2 }} color="#000">Price: ${book.price}</Typography>
              <Chip
                label={book.stock ? 'In Stock' : 'Out of Stock'}
                color={book.stock ? 'success' : 'error'}
                sx={{ mt: 2 }}
              />
              <br /><br />
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: '#483248', "&:hover": {backgroundColor: "#370617",}, }}
                onClick={handleAddToCart}
                disabled={!book.stock} // Disable button if out of stock
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
          Book not found.
        </Typography>
      )}
    </Box>
  </Box>
  
  );
};

export default BookDetails;