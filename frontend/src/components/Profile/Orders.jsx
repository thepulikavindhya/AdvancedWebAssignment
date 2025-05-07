import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navigation/NavBar';

const sampleOrders = [
  {
    id: 'ORD12345',
    date: '2025-05-06',
    items: [
      { title: 'JavaScript Essentials', price: '19.99' },
      { title: 'React Advanced', price: '24.99' }
    ],
    total: '44.98'
  },
  {
    id: 'ORD67890',
    date: '2025-05-03',
    items: [{ title: 'Python Basics', price: '14.99' }],
    total: '14.99'
  }
];

export default function Orders() {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor:'#f5f5f5',Height: '100vh', width: '100vw' }}>
    <NavBar />
    <br></br>
    <Box sx={{ backgroundColor: '#f5f5f5', height: '100vh', width: 'auto' }}>
    <Paper sx={{ margin: '25px' }}>
        <Typography variant="h5" gutterBottom>
          Your Order History
        </Typography>
        <List>
          {sampleOrders.map((order) => (
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`Order ID: ${order.id} - ${order.date}`}
                  secondary={
                    <>
                      {order.items.map((item, index) => (
                        <Typography key={index} variant="body2">
                          {item.title} - ${item.price}
                        </Typography>
                      ))}
                      <Typography variant="subtitle2">Total: ${order.total}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
              <br></br>
            </React.Fragment>
          ))}
        </List>
        <Button variant="contained" sx={{ ml: 3,mb:5,mt: 2,backgroundColor:'#483248' }} onClick={() => navigate('/bookhome')}>
          Back
        </Button>
      </Paper>
    </Box>
    </Box>
 
  );
}
