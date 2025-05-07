import { useState } from 'react';
import { Grid, Typography, Button,Box, RadioGroup, FormControlLabel, Radio, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';

export default function PaymentSelection() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cash');

  const subtotal = 42.97; // sample subtotal
  const tax = subtotal * 0.05;
  const cashOnDeliveryFee = 300;

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    console.log('Order placed with payment method:', paymentMethod);
    navigate('/ordersummary');
  };

  const total = paymentMethod === 'cash' ? subtotal + tax + cashOnDeliveryFee : subtotal + tax;

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
      <Typography variant="h5" gutterBottom sx={{color:'#370617',mb:4}}>Select Payment Method</Typography>

      <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
        <FormControlLabel
          value="cash"
          control={<Radio />}
          label={
            <div>
              <Typography variant="h6">Cash on Delivery (COD)</Typography>
              <Typography variant="body2" color="text.secondary">Pay upon delivery. Delivery within 3-5 business days. Extra Rs.300 applied.</Typography>
            </div>
          }
        />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          value="visa"
          control={<Radio />}
          label={
            <div>
              <Typography variant="h6">Visa Card</Typography>
              <Typography variant="body2" color="text.secondary">Secure Visa payment. Delivery within 2-4 business days.</Typography>
            </div>
          }
        />
<FormControlLabel
          value="mastercard"
          control={<Radio />}
          label={
            <div>
              <Typography variant="h6">MasterCard</Typography>
              <Typography variant="body2" color="text.secondary">Secure MasterCard payment. Delivery within 2-4 business days.</Typography>
            </div>
          }
        />
        
      </RadioGroup>

      <Divider sx={{ my: 3 }} />

      <Grid sx={{display: "flex" , flexDirection: "column"}} container spacing={2} mt={6}>
        <Grid item xs={12} md={4}><Typography>Subtotal: ${subtotal.toFixed(2)}</Typography></Grid>
      
        <Grid item xs={12} md={4}><Typography>Tax (5%): ${tax.toFixed(2)}</Typography></Grid>
        
        {paymentMethod === 'cash' && (
          <>
            <Grid item xs={12} md={4}><Typography>COD Fee: Rs. {cashOnDeliveryFee.toFixed(2)}</Typography></Grid>
            
            </>
          )}
          <Grid item xs={12} md={4}><Typography fontWeight={900} variant="h6">Total: Rs. {total.toFixed(2)}</Typography></Grid>
      
        </Grid>
  
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12}><Button fullWidth variant="contained" sx={{bgcolor: '#483248', "&:hover": {backgroundColor: "#370617",},}} 
          onClick={handlePlaceOrder}>Place Order</Button></Grid>
        </Grid>
      </Paper>
    
    </Box>

  );
}
