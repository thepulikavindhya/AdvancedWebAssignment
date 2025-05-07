import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Box,
  IconButton,
  Typography,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu"; // Import the hamburger menu icon
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { LogoutOutlined ,AccountCircle} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CartItemCount } from '../../utill/cartItemCount'; 
import { removeTokenFromCookies } from "../../utill/tokenCookieSet";
import {logoutUser} from "../../repository/auth_repository";

const NavBar = () => {
  const navigate = useNavigate();
   // Get the cart count

  const [drawerOpen, setDrawerOpen] = useState(false); // Manage drawer state

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#483248", boxShadow: 10 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left - Hamburger Icon (only visible on xs, sm, and md sizes) */}
        <IconButton
          edge="start"
          sx={{
            color: "#fff",
            display: {
              xs: "block",
              sm: "block",
              md: "block",
              lg: "none",
              xl: "none",
            },
          }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* Center - Bookshelf Heading (centered on xs, sm, and md sizes) */}
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "left",
            flexGrow: 0,
            display: { xs: "block", sm: "block" },
          }}
        >
          Lavender
        </Typography>

        {/* Center - Navigation Links (Desktop) */}
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
        >
          <Button
            component={Link}
            to="/bookhome"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { color: "#c99d4f" },
            }}
          >
            HOME
          </Button>

          <Button
            component={Link}
            to="/aboutus"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { color: "#c99d4f" },
            }}
          >
            ABOUT US
          </Button>
          <Button
            component={Link}
            to="/contactus"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              "&:hover": { color: "#c99d4f" },
            }}
          >
            CONTACT US
          </Button>
        </Stack>

        {/* Right Side - Icons */}
        <Stack direction="row" spacing={1}>
          <IconButton sx={{ color: "#000" }} onClick={() => navigate("/cart")}>
            <Badge badgeContent={CartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton sx={{ color: "#fff" }} onClick={() => navigate("/user")}>
    <AccountCircle />
  </IconButton>
          <IconButton
            sx={{ color: "#fff" }}
            onClick={async () => {
              await logoutUser();
              await removeTokenFromCookies();
              await navigate("/");
            }}
          >
            <LogoutOutlined />
          </IconButton>
        </Stack>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button component={Link} to="/bookhome">
              <ListItemText primary="HOME" />
            </ListItem>
            <ListItem button component={Link} to="/bookdetails">
              <ListItemText primary="Book Details" />
            </ListItem>
            <ListItem button component={Link} to="/aboutus">
              <ListItemText primary="ABOUT US" />
            </ListItem>
            <ListItem button component={Link} to="/contactus">
              <ListItemText primary="CONTACT US" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => navigate("/cart")}>
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem button onClick={() => navigate("/user")}>
              <ListItemText primary="Profile" />
            </ListItem>

            <ListItem
              button
              onClick={async () => {
                await logoutUser();
                navigate("/");
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
