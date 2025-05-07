import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavBar from "../Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import {
  getUserDataFromCookies,
  setUserDataInCookies,
} from "../../utill/userCoockie";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const userData = getUserDataFromCookies();
    if (userData) {
      console.log(userData);
      setProfile({
        fullName: userData.name,
        email: userData.email,
        mobile: userData.mobile ?? "N/A",
        gender: userData.gender ?? "N/A",
        birthday: userData.birthday ?? "N/A",
        image: userData.image ?? "N/A",
      });
    }
  }, []); // Add dependencies if necessary
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setUserDataInCookies({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleBirthdayChange = (date) => {
    setProfile({
      ...profile,
      birthday: date,
    });
  };

  const handleUpdateProfile = () => {
    console.log("Updated Profile:", profile);
    setEditMode(false);
  };

  const handleCancelProfileEdit = () => {
    setEditMode(false);
  };

  const handleUpdatePassword = () => {
    console.log("Password Change:", passwords);
    setPasswordEditMode(false);
  };

  const handleCancelPasswordEdit = () => {
    setPasswordEditMode(false);
  };

  return (
    <Box
      sx={{
        position: "relative", // Allows layering
        margin: 0,
        padding: 0,
        width: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${newbackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust opacity for brightness
          zIndex: -1, // Place it below the content but above the background
        }}
      />
      <NavBar />
      <Box sx={{ width: "100vw", height: "100vh" }}>
        <Paper elevation={3} sx={{ p: 4, margin: "20px" }}>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Profile
            </Typography>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#727702",
                color: "#fff",
                "&:hover": { backgroundColor: "#C68EFD" },
              }}
              onClick={() => navigate("/orders")}
            >
              Order History
            </Button>
          </Grid>
          <br></br>

          {/* Top Grid: Image + Full Name */}
          <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }}>JD</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6">{profile.fullame}</Typography>
            </Grid>
          </Grid>

          {/* Middle Grid: Info */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={profile.mobile}
                onChange={handleProfileChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birthday"
                  value={profile.birthday} // Controlled value
                  onChange={(newDate) => handleBirthdayChange(newDate)} // Handle date change
                  disabled={!editMode}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            {/* Buttons for edit/update/cancel */}
            <Grid item xs={12}>
              {!editMode ? (
                <Button
                  variant="contained"
                  sx={{
                    mr: 2,
                    backgroundColor: "#727702",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#C68EFD" },
                  }}
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 2,
                      backgroundColor: "#727702",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#C68EFD" },
                    }}
                    onClick={handleUpdateProfile}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      mr: 2,
                      backgroundColor: "#727702",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#C68EFD" },
                    }}
                    onClick={handleCancelProfileEdit}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Grid>
          </Grid>

          {/* Bottom Grid: Change Password */}
          <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
            Change Password
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                disabled={!passwordEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                disabled={!passwordEditMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                disabled={!passwordEditMode}
              />
            </Grid>

            {/* Buttons for edit/update/cancel password */}
            <Grid item xs={12}>
              {!passwordEditMode ? (
                <Button
                  variant="contained"
                  sx={{
                    mr: 2,
                    backgroundColor: "#727702",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#C68EFD" },
                  }}
                  onClick={() => setPasswordEditMode(true)}
                >
                  Change Password
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      mr: 2,
                      backgroundColor: "#727702",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#C68EFD" },
                    }}
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      mr: 2,
                      backgroundColor: "#727702",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#C68EFD" },
                    }}
                    onClick={handleCancelPasswordEdit}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
