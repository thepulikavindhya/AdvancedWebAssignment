import { useState } from 'react';
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Paper,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CheckoutForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    country: '',
    province: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setError('');

    for (let key in formData) {
      if (formData[key] === '') {
        setError('Please fill all the fields.');
        return;
      }
    }

    console.log('Shipping Info:', formData);
    navigate('/payment');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        px: 2,
        width:'100vw'
      }}
    >
      <Paper elevation={3} sx={{ p: 6, maxWidth: 800, width: '100%' }}>
        <Typography variant="h5" gutterBottom>Shipping Information</Typography>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <form onSubmit={handleNext}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Street Address" name="address" value={formData.address} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <TextField fullWidth label="Apartment / Suite / Unit" name="apartment" value={formData.apartment} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} required />
            </Grid>
            <Grid item>
              <FormControl fullWidth required>
                <InputLabel>Country</InputLabel>
                <Select name="country" value={formData.country} label="Country" onChange={handleChange}>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth required>
                <InputLabel>Province</InputLabel>
                <Select name="province" value={formData.province} label="Province" onChange={handleChange}>
                  <MenuItem value="Ontario">Ontario</MenuItem>
                  <MenuItem value="Quebec">Quebec</MenuItem>
                  <MenuItem value="British Columbia">British Columbia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#370617', height:'50px' }}>
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}