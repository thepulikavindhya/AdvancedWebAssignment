import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Stack, Box, IconButton, Typography, Badge, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Import the hamburger menu icon
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AccountCircleOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();
  

  const [drawerOpen, setDrawerOpen] = useState(false); // Manage drawer state

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'black', boxShadow: 10 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left - Hamburger Icon (only visible on xs, sm, and md sizes) */}
        <IconButton
          edge="start"
          sx={{
            color: '#fff',
            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' }
          }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Center - Bookshelf Heading (centered on xs, sm, and md sizes) */}
        <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'left', flexGrow: 0, display: { xs: 'block', sm: 'block',  } }}>
          Bookshelf
        </Typography>

        {/* Center - Navigation Links (Desktop) */}
        <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
          <Button component={Link} to="/dashboard" sx={{ color: '#fff', fontWeight: 'bold', '&:hover': { color: '#fff' } }}>
            HOME
          </Button>
          
         
        </Stack>

        {/* Right Side - Icons */}
        <Stack direction="row" spacing={1}>
       
          <IconButton onClick={() => navigate('/user')} sx={{ color: '#fff' }}>
            <AccountCircleOutlined />
          </IconButton>
        </Stack>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="HOME" />
            </ListItem>
          
            
          </List>
          <Divider />
          <List>
           
            <ListItem button onClick={() => navigate('/user')}>
              <ListItemText primary="Account" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
