import React, { useState, useEffect } from 'react';
import { useBooks } from '../Context/BookContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Paper
} from '@mui/material';
import Adminnav from '../Navigation/Adminnav';
import { createBookReq } from '../../repository/books_repository';
import {toast} from 'react-toastify';
export const AddBookForm = () => {
  const { tempBook, addBook } = useBooks();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookid: '',
    title: '',
    author: '',
    thumbnail: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (tempBook) {
      setFormData({
        bookid: tempBook.bookid || '',
        title: tempBook.title || '',
        author: tempBook.authors || '',
        thumbnail: tempBook.thumbnail || '',
        price: tempBook.price || '',
        description: tempBook.description || ''
      });
    }
  }, [tempBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (formData.title && formData.author) {
      addBook(formData);
      
      const res = await createBookReq(formData);
      navigate('/dashboard');
    } else {
      toast.error("Please fill out the required fields.");
    }
  };

  if (!tempBook) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="text.secondary">
          No book selected. Please go back to the Add Book page.
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/addbook')} sx={{ mt: 2 }}>
          🔙 Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#FAF3F0', padding: 2 }}>
        <Adminnav/>
        <Box sx={{ width: '100vw', minHeight: '100vh', backgroundColor: '#FAF3F0', padding: 2 }}>
      <Container >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            📖 Edit Book Details
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#666', mb: 3 }}>
            You can edit and confirm the book details before adding it to the store.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              {formData.thumbnail && (
                <Card elevation={2} sx={{ p: 1, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    image={formData.thumbnail}
                    alt={formData.title || 'Book Image'}
                    sx={{ objectFit: 'contain', height: 250 }}
                  />
                </Card>
              )}
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Author(s)"
                name="authors"
                value={formData.author}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  mt: 1,
                  backgroundColor: '#8E44AD',
                  '&:hover': { backgroundColor: '#732d91' }
                }}
              >
                ✅ Save Book
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
    </Box>  
  );
};

export default AddBookForm;
