import { useEffect, useState } from 'react';
import { Grid, Typography, Button, Paper, Divider,Box } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';
export default function OrderConfirmation() {
  const navigate = useNavigate();

  const [orderId, setOrderId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Simulated purchased items (normally you would fetch from context or backend)
  const purchasedItems = [
    { id: 1, title: 'The Great Gatsby', quantity: 1, price: 10.99 },
    { id: 2, title: 'A Brief History of Time', quantity: 2, price: 15.99 }
  ];

  useEffect(() => {
    const generateOrderId = () => 'ORD' + Math.floor(100000 + Math.random() * 900000);
    const calculateDeliveryDate = () => {
      const date = new Date();
      date.setDate(date.getDate() + 5); // 5 days delivery estimate
      return date.toDateString();
    };

    setOrderId(generateOrderId());
    setDeliveryDate(calculateDeliveryDate());
  }, []);

  const subtotal = purchasedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <Box
    sx={{
      position: 'relative',
      margin: 0,
      padding: 0,
      width: '100vw',
      minHeight: '100vh',
      backgroundImage: `url(${newbackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
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
         <br></br>
         <Paper
            elevation={3}
            sx={{
              p: 3,
              mx: 'auto',
              my: 8,                   // Adds vertical margin to push Paper away from edges
              width: '90%',
              maxWidth: 800,
              textAlign: 'center',
              height: 'auto',          // Let height adjust to content
              maxHeight: '90vh',       // Prevent Paper from exceeding screen height
              backgroundColor: '#fff',
              overflowY: 'auto',       // Add scroll if content overflows
              borderRadius: 3,
            }}
          >

      <CheckCircleOutline sx={{ fontSize: 80, color: 'green', mb: 2 }} />
      <Typography variant="h4" gutterBottom>Thank you for your order!</Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Your order has been placed successfully.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>Order ID: {orderId}</Typography>
      <Typography variant="body1" gutterBottom>Expected Delivery: {deliveryDate}</Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>Order Summary</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {purchasedItems.map((item) => (
          <Grid container key={item.id} spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <Typography>{item.title}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>Qty: {item.quantity}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography>Subtotal:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>${subtotal.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Tax (5%):</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>${tax.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Total:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">${total.toFixed(2)}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="contained"  sx={{backgroundColor: "#483248",
                    "&:hover": {
                      backgroundColor: "#370617",
                    },}} onClick={() => navigate('/bookhome')}>Go to Home</Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button fullWidth variant="outlined"  color='#483248' onClick={() => navigate('/orders')}>View Orders</Button>
        </Grid>
      </Grid>
    </Paper>
    </Box>  
  );
}
