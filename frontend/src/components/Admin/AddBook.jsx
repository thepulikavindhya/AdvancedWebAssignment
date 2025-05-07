import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useBooks } from '../Context/BookContext';
import { BookCard } from '../Admin/BookCard';
import { useNavigate } from 'react-router-dom';
import Adminnav from '../Navigation/Adminnav';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddBook = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState([]);
  const { setTempBook } = useBooks();
  const navigate = useNavigate();

  const categories = ['Fiction', 'Science', 'History', 'Biography'];

  const handleSearch = async () => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
        console.log(data);
      if (data.items) {
        const filtered = data.items.filter(book =>
          category ? book.volumeInfo.categories?.includes(category) : true
        );
        setResults(filtered || []);
      } else {
        setResults([]);
      }
    } catch {
      toast.error('Error fetching books. Please try again later.');
      
    }
  };

  const handleSelectBook = (book) => {
    setTempBook(book);
    navigate('/addbookform');
};

  return (
    <Box  sx={{position: 'relative', // Allows layering
            margin: 0,padding: 0,width: '100vw', minHeight: '100vh',}}>
          
          {/* Dark overlay layer */}
          <Box sx={{
              position: 'absolute', top: 0,left: 0, width: '100%',height: '100%',backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust opacity for brightness
              zIndex: -1, }}// Place it below the content but above the background 
          />
        <Adminnav/>
        
    <Box sx={{ width: '100vw', Height: '100vh',  }}>
      <Container sx={{ pt: '20', pb:'20' }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#fff' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="#727702">Add New Book</Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666' }}>Search and select a book from Google Books API</Typography>

          <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Grid item xs={12} md={5}>
              <TextField fullWidth label="Search Books" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField select fullWidth label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>))}</TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <Button fullWidth  variant="contained" size="large" onClick={handleSearch}sx={{ backgroundColor: '#727702', '&:hover': { backgroundColor: '#727700' } }}>
                🔍 Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {results.length > 0 ? (
            results.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <BookCard book={book}
                  onAdd={() =>
                    handleSelectBook({
                      bookid:book.id,
                      title: book.volumeInfo.title,
                      authors: book.volumeInfo.authors?.join(', '),
                      thumbnail: book.volumeInfo.imageLinks?.thumbnail,
                      price:  Math.floor(Math.random() * 201) + 900,
                      description: book.volumeInfo.description || '',
                    })
                  }
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} textAlign="center" mt={4}>
              <Typography variant="h6" color="#fff">No results found. Try searching for a different title.</Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
    </Box>
  );
};

export default AddBook;
