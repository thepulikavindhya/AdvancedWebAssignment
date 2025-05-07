import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Grid, CardMedia, Button, Box, Paper, Divider, IconButton
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import NavBar from '../Navigation/NavBar';
import { getCart, addToCart, removeFromCart } from '../../utill/cartOption';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, tax: 0, total: 0 });

  useEffect(() => {
    const cartData = getCart();
    const updatedCartData = cartData.map(item => ({
      ...item,
      quantity: item.quantity || 1, // Set quantity to 1 if it doesn't exist
    }));
    setCart(updatedCartData);
  }, []);

  useEffect(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    setTotals({ subtotal, tax, total });
  }, [cart]);

  const handleIncrease = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    addToCart(updatedCart);
  };

  const handleDecrease = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
    addToCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    removeFromCart(id);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        margin: 0,
        padding: 0,
        width: '100vw',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: -1,
        }}
      />
      <NavBar />
      <Box sx={{ padding: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Button variant="outlined" onClick={() => navigate('/bookhome')} sx={{ mb: 2, color: "#370617" }}>
                Continue Shopping
              </Button>
              <Divider sx={{ mb: 2 }} />
              {cart.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
              ) : (
                cart.map((item) => (
                  <Grid container spacing={2} alignItems="center" key={item.id} sx={{ mb: 2 }}>
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{item.author}</Typography>
                      <Typography variant="body1" color="primary">${Number(item.price).toFixed(2)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onClick={() => handleDecrease(item.id)}><Remove /></IconButton>
                      <Typography display="inline">{item.quantity}</Typography>
                      <IconButton onClick={() => handleIncrease(item.id)}><Add /></IconButton>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton color="error" onClick={() => handleRemove(item.id)}><Delete /></IconButton>
                    </Grid>
                  </Grid>
                ))
              )}
            </Grid>
            <Grid item xs={12} md={4} sx={{ml:'800px'}}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={1}>
                  <Grid item xs={6}><Typography>Subtotal:</Typography></Grid><br/>
                  <Grid item xs={6}><Typography>RS {Number(totals.subtotal).toFixed(2)}</Typography></Grid><br/>
                  <Grid item xs={6}><Typography>Tax (5%):</Typography></Grid><br/>
                  <Grid item xs={6}><Typography>RS{Number(totals.tax).toFixed(2)}</Typography></Grid><br/>
                  <Grid item xs={6}><Typography variant="h6">Total:</Typography></Grid><br/>
                  <Grid item xs={6}><Typography variant="h6">RS{Number(totals.total).toFixed(2)}</Typography></Grid>
                </Grid>
                <Button
                  variant="contained"
                  
                  fullWidth
                  sx={{ mt: 3, bgcolor:'#483248', "&:hover": {
                      backgroundColor: "#370617",
                    },color:"#ffffff" }}
                  onClick={() => navigate('/checkoutform')}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default Cart;