import React from 'react';
import { Box, Typography, Container, Paper, Divider } from '@mui/material';
import NavBar from '../Navigation/NavBar';

export default function Aboutus() {
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
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4, backgroundColor: '#FFF' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#727702' }}>
            About Our Bookshelf
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph>
            Welcome to our online bookshelf! We are passionate about connecting readers with the books they love.
            Our platform provides a seamless experience to browse, search, and purchase books across various categories
            including programming, fiction, non-fiction, and more.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether you're a curious learner, an experienced developer, or a casual reader, our curated collection aims to serve
            your reading needs. Our mission is to make knowledge and stories accessible, engaging, and easy to explore.
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for being a part of our reading community. Happy browsing and even happier reading!
          </Typography>
        </Paper>
      </Container>
    </Box>
    </Box>
  );
}
