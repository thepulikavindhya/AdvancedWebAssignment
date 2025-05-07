import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {TextField,Grid,Card,CardContent,Typography,CardActions,Button,MenuItem,Select,InputLabel,FormControl,Chip,CircularProgress,CardMedia,Box,} from "@mui/material";
import NavBar from "../Navigation/NavBar";
import home from "../../images/HomeBg.jpeg";
import { getAllBooksReq } from "../../repository/books_repository"; 

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await getAllBooksReq(); // Fetch books from backend
      setBooks(response.data); // Assuming response.data contains the book list
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookClick = (id) => {
    navigate(`/bookdetails/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Filter books locally based on search term
  };

  const filteredBooks = books
    .filter(
      (book) =>
        (filterCategory === "All" || book.category === filterCategory) &&
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOption === "priceLowHigh")
        return parseFloat(a.price) - parseFloat(b.price);
      if (sortOption === "priceHighLow")
        return parseFloat(b.price) - parseFloat(a.price);
      if (sortOption === "az") return a.title.localeCompare(b.title);
      if (sortOption === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div
      style={{margin: 0,padding: 0,width: "100vw",minHeight: "100vh",backgroundColor:'#ffffff',position: "relative",}}>
      
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // Adjust the opacity for darkness
          zIndex: -1,
        }}
      />

      <NavBar />
      
      {/* Hero Section with Image and Caption */}
      <Box
        sx={{display: "flex",flexDirection: { xs: "column", md: "row" },alignItems: "center",justifyContent: "space-between",backgroundColor: "#000", color: "#fff", px: { xs: 2, md: 10 },py: 4,gap: 4,flexWrap: "wrap",height:'600px'}}
      >

      {/* Caption and Search */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Discover Your Next Read</Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Browse from thousands of books. Start exploring now.</Typography>

        <form onSubmit={handleSearchSubmit}>
          <TextField
            label="Search for books..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width:'500px',
              input: { color: "white" },
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#bbb" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            InputLabelProps={{
            style: { color: "#ccc" },
          }}
        />
        </form>
      </Box>

        {/* Right-side Image */}
        <Box
          component="img"
          src={home} // or any other image
          alt="Books"
          sx={{flex: 1, maxWidth: 400,width: "100%",height: "auto",borderRadius: 2,objectFit: "cover",height:'600px'}}/>

      </Box>

      {/* Search and Filters */}
      <form onSubmit={handleSearchSubmit}>
        <Grid container spacing={2}
          alignItems="center"
          sx={{ mb: 4, px: { xs: 2, md: 10 }, width: "100%", margin: 0 , mt:5, }}>

          {/* Search Input */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Search by Title or Author"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
              width:'350px',
                input: { color: "black" },
                label: { color: "black" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "black" },
                  "&:hover fieldset": { borderColor: "black" },
                  "&.Mui-focused fieldset": { borderColor: "black" },
                },
              }}
            />
          </Grid>

          {/* Category Filter */}
          <Grid item xs={6} md={3} sx={{ml:'650px'}}>
            <FormControl sx={{width:'150px'}}>
              <InputLabel
                sx={{ color: "blacke", "&.Mui-focused": { color: "black" } }}
              >
                Category
              </InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
                sx={{
                  color: "black",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Fiction">Fiction</MenuItem>
                <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="Programming">Programming</MenuItem>
                <MenuItem value="Uncategorized">Uncategorized</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sort Filter */}
          <Grid item xs={6} md={3}>
            <FormControl sx={{width:'150px'}}>
              <InputLabel
                sx={{ color: "black", "&.Mui-focused": { color: "black" } }}
              >
                Sort By
              </InputLabel>
              <Select
                value={sortOption}
                label="Sort By"
                onChange={(e) => setSortOption(e.target.value)}
                sx={{
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
                <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
                <MenuItem value="az">A-Z</MenuItem>
                <MenuItem value="za">Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} sx={{mt:6, ml:5}}>
          {filteredBooks.map((book) => (
            <Grid item xs={12} sm={6} md={4} key={book.id} onClick={() => navigate(`/bookdetails/${book.bookId}`)}>
              <Card
                sx={{ height: "100%",display: "flex",flexDirection: "column",justifyContent: "space-between",boxShadow: 3, "&:hover": {boxShadow: 6, },}}>
                
                {book.thumbnail && (
                  <CardMedia
                    component="img"
                    image={
                      book.thumbnail ??
                      "https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY="
                    }
                    alt={book.title}
                    sx={{height: 100,width: "100%",objectFit: "contain",backgroundColor: "#f5f5f5",padding: 2,}} />)}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "blue" },
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Author: {book.author}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${book.price}
                  </Typography>
                  <Chip
                    label={book.stock ? "In Stock" : "Out of Stock"}
                    color={book.stock ? "success" : "error"}
                    sx={{ mt: 1 }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: "#727702", color: "#fff" }}
                    fullWidth
                    disabled={!book.stock}
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
