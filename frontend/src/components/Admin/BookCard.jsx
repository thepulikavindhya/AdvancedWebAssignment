import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

export const BookCard = ({ book, onAdd }) => {
  if (!book) return null;

  // Handle both raw API format and simplified format
  const title = book.title || book.volumeInfo?.title || 'No Title';
  const authors = book.authors || book.volumeInfo?.authors?.join(', ') || 'Unknown Author';
  const thumbnail =
    book.thumbnail ||
    book.volumeInfo?.imageLinks?.thumbnail ||
    'https://media.istockphoto.com/id/1147839743/vector/black-frame-with-passepartout-on-the-wall-vector-picture-frame-mock-up.jpg?s=612x612&w=0&k=20&c=DOD0s-bm0AR1_nWc1WN2gW4aOY_J9DD8CegMv7QEvW8=';

  const price = book.price;
  const description =
    book.description || book.volumeInfo?.description || '';

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={thumbnail}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {authors}
        </Typography>
        {price && (
          <Typography variant="subtitle2" color="text.primary">
            Price: ${price}
          </Typography>
        )}
        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description.slice(0, 100)}...
          </Typography>
        )}
        {onAdd && (
          <Button
            variant="outlined"
            onClick={onAdd}
            sx={{ mt: 2 }}
            fullWidth
          >
            Add to Store
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
 export default BookCard; 