import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api/books";
import { getTokenFromCookies } from "../utill/tokenCookieSet";
import { toast } from "react-toastify";
import { logoutUser, protectedApiCall } from "../repository/auth_repository";

const handleUnauthorized = () => {
  toast.error("Token is not valid or expired. Please log in again.");
};

export const getAllBooksReq = async () => {
  try {
    const token = getTokenFromCookies();
    const isProtected = await protectedApiCall(token);
    if (isProtected.status !== 401) {
      const response = await axios.get(`${API_BASE_URL}/allbooks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      handleUnauthorized();
      return null;
    }
  } catch (error) {
    console.error("Error fetching all books:", error);
    throw error;
  }
};

export const getBookByIdReq = async (id) => {
  try {
    const token = getTokenFromCookies();
    const isProtected = await protectedApiCall(token);
    if (isProtected.status !== 401) {
      const response = await axios.get(`${API_BASE_URL}/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      handleUnauthorized();
      return null;
    }
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw error;
  }
};

export const createBookReq = async (book) => {
  try {
    const token = getTokenFromCookies();
    const isProtected = await protectedApiCall(token);
    if (isProtected.status !== 401) {
      const response = await axios.post(`${API_BASE_URL}/create`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      handleUnauthorized();
      return null;
    }
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const updateBookReq = async (book) => {
  try {
    const token = getTokenFromCookies();
    const isProtected = await protectedApiCall(token);
    if (isProtected.status !== 401) {
      const response = await axios.put(`${API_BASE_URL}/${book.id}`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      handleUnauthorized();
      return null;
    }
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

export const deleteBookReq = async (id) => {
  try {
    const token = getTokenFromCookies();
    const isProtected = await protectedApiCall(token);
    if (isProtected.status !== 401) {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      handleUnauthorized();
      return null;
    }
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw error;
  }
};