import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/auth";
import Cookies from "js-cookie"; 


export const loginReq = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; 
  } catch (error) {
    
    throw error;
  }
};


export const registerReq = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
      return response.data; 
    } catch (error) {
      throw error;
    }
  };


  export const protectedApiCall = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/protected`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Protected API call error:", error);
      throw error;
    }
  };
  export const logoutUser = () => {
    try {
      console.log('Logging out user...');
      Cookies.remove("token"); // Remove token from cookies
      Cookies.remove("user"); // Remove user data from cookies
      console.log("User logged out successfully.");
      return true;

    } catch (error) {
      console.error("Error during logout:", error);
      return false
    }
  };
  