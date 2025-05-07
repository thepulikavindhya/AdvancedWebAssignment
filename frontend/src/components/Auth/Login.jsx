import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Tabs,
  Tab,
  useMediaQuery,
  Container,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { loginReq, registerReq } from "../../repository/auth_repository";
import { setTokenInCookies } from "../../utill/tokenCookieSet";
import { setUserDataInCookies } from "../../utill/userCoockie";
import login from "../../images/Login.jpeg"; // Make sure path is correct

const Login = () => {
  const [value, setValue] = useState(0);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUserName,setSignupUserName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    clearControllers();
  };


  const clearControllers=()=>{
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupUserName("");
    setLoginEmail("");
    setLoginPassword("");
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupEmail || !signupUserName || !signupPassword || !signupConfirmPassword) {
      toast.error("Please fill in all signup fields.");
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      console.log("Calling registerReq...");
      const res = await registerReq(signupUserName, signupEmail, signupPassword);
      console.log("registerReq response:", res);
      toast.success(res.message);
      setValue(0);
      setLoginEmail(signupEmail);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred during signup. Please try again.";
      console.error("Error during signup:", errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginReq(loginEmail, loginPassword);
      toast.success(response.message);
      setTokenInCookies(response.token);
      setUserDataInCookies(response.user)
      if(response.user.isAdmin){
        navigate("/dashboard");
      }else{

        navigate("/bookhome");
      }
      
     
    } catch (error) {
      const errorMessage =
        error.response?.data.error ||
        "An error occurred during login. Please try again.";
      console.log(errorMessage);
      toast.error(errorMessage);
      clearControllers
    }
  };


  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isSmallScreen ? "column" : "row",
          zIndex: 1,
          px: 2,
        }}
      >

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: "center",
          justifyContent: "center", // <- important change here
          padding: 4,
          gap: isSmallScreen ? 4 : 6,
        }}
      >

          {/* Login/Signup Form */}
          <Paper
            elevation={4}
            sx={{
              padding: { xs: 2, sm: 3 },
              borderRadius: 3,
              width: isSmallScreen ? "90%" : 400,
              maxWidth: 400,
              backgroundColor: "rgba(255,255,255,0.95)", // optional transparency
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)", // subtle soft shadow
              backdropFilter: "blur(4px)", // optional for glassmorphism
            }}
          >

            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>

            {value === 0 && (
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  variant="outlined"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <Typography
                  variant="body2"
                  sx={{ mt: 1, mb: 2, color: "#370617", cursor: "pointer" }}
                >
                  Forgot password?
                </Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    borderRadius: 1,
                    color: "#fff",
                    backgroundColor: "#483248",
                    "&:hover": {
                      backgroundColor: "#370617",
                    },
                  }}
                >
                  Login
                </Button>
                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                  Not a member?{" "}
                  <Typography
                    component="span"
                    sx={{ color: "#483248", cursor: "pointer" }}
                    onClick={() => setValue(1)}
                  >
                    Signup now
                  </Typography>
                </Typography>
              </Box>
            )}

            {value === 1 && (
              <Box component="form" onSubmit={handleSignup} sx={{ mt: 2, }}>
               <TextField
                  fullWidth
                  label="User Name"
                  margin="normal"
                  variant="outlined"
                  type="name"
                  value={signupUserName}
                  onChange={(e) => setSignupUserName(e.target.value)}
                  required
                /> 
                <TextField
                  fullWidth
                  label="Email Address"
                  margin="normal"
                  variant="outlined"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    py: 1.5,
                    borderRadius: 1,
                    mt: 2,
                    backgroundColor: "#483248",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#370617",
                    },
                  }}
                >
                  Signup
                </Button>
              </Box>
            )}
          </Paper>

          
          
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
