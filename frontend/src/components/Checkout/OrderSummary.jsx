import { useState } from 'react';
import { Grid, Typography, Button, IconButton, Divider, Paper,Box } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
const initialCart = [
  { id: 1, title: 'Hello World Polyglot', price: 1008, quantity: 1 },
];

export default function OrderSummary() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(initialCart);

  const handleIncrease = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleProceed = () => {
    console.log('Proceed to payment', cart);
    navigate('/orderconfirmation');
  };

  const handleCancel = () => {
    setCart([]);
    navigate('/cart');
  };

  const handleExit = () => {
    navigate('/cart');
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

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
  
      {/* Dark overlay layer */}
        <Box
             sx={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust opacity for brightness
               zIndex: -1, // Place it below the content but above the background
             }}
           />        
      <NavBar />
 
    <Paper elevation={3} sx={{ p: 4, margin: '20px' }}>
      <Typography variant="h5" gutterBottom>Order Summary</Typography>
      <Grid container spacing={2}>
        {cart.length === 0 ? (
          <Typography variant="h6" sx={{ m: 2 }}>Your cart is empty.</Typography>
        ) : (
          cart.map((item) => (
            <Grid container spacing={2} alignItems="center" key={item.id} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Typography>{item.title}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>${item.price.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleDecrease(item.id)}><Remove /></IconButton>
                <Typography variant="body1" display="inline">{item.quantity}</Typography>
                <IconButton onClick={() => handleIncrease(item.id)}><Add /></IconButton>
              </Grid>
              <Grid item xs={2}>
                <IconButton color=" #C95792" onClick={() => handleRemove(item.id)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))
        )}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography>Subtotal:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography>Tax (5%):</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography>${tax.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">Total:</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="contained" sx={{backgroundColor: "#483248",
                    "&:hover": {
                      backgroundColor: "#370617",
                    },}} onClick={handleProceed}>
            Proceed
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="outlined" color="#727702" onClick={handleCancel}>
            Cancel Order
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button fullWidth variant="outlined" color="#727702" onClick={handleExit}>
            Exit
          </Button>
        </Grid>
      </Grid>
    </Paper>
    </Box>
  
  );
}