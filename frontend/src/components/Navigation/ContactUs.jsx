import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider
} from '@mui/material';
import NavBar from '../Navigation/NavBar';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

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
      <Box sx={{  height: '100vh', width: '100vw' }}>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#727702' }}>
            Contact Us
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {submitted ? (
            <Typography variant="body1" color="success.main">
              Thank you! Your message has been sent.
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" fullWidth sx={{ backgroundColor:'#727702' }}>
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Paper>
      </Container>
    </Box>
    </Box>
  );
}
