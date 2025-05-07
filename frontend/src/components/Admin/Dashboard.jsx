import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { getAllBooksReq } from "../../repository/books_repository";
import { BookCard } from "../Admin/BookCard";
import Adminnav from "../Navigation/Adminnav";

export const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const fetchedBooks = await getAllBooksReq();
        console.log(fetchBooks);
        setBooks(fetchedBooks.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Stop loading after API call
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box
      sx={{
        position: "relative", // Allows layering
        margin: 0,
        padding: 0,
        width: "100vw",
        minHeight: "100vh",
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
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Adjust opacity for brightness
        zIndex: 0, // Lower zIndex to ensure it's below interactive elements
      }}
      />
      <Adminnav />
      <Container sx={{ pt: 6, pb: 6, zIndex: 2 }}>
        {/* Add Book Button - Moved to the top */}
        <Box textAlign="right" mb={2}>
          <Button
            variant="contained"
            onClick={() => navigate("/addbook")}
            sx={{
              backgroundColor: "#727702",
              "&:hover": { backgroundColor: "#732d91" },
            }}
          >
            ➕ Add Book
          </Button>
        </Box>

        <Box
          sx={{
            position: "relative",
            color: "white",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Background darkening for text clarity
            px: 3,
            py: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#fff" }}>
            📚 Books in Store
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#fff", mt: 1 }}
          >
            Explore and manage your book collection
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }}
            >
              <CircularProgress color="inherit" />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <BookCard book={book} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" sx={{ color: "#fff", mt: 4 }}>
                  No books found in the store.
                </Typography>
              )}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;