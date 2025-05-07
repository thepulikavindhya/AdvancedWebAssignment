import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import BookHome from './components/Books/BookHome';
import BookDetails from './components/Books/BookDetails';
import CheckoutForm from './components/Checkout/CheckoutForm';
import OrderSummary from './components/Checkout/OrderSummary';
import PaymentSelection from './components/Checkout/PaymentSelection';
import NavBar from './components/Navigation/NavBar';
import OrderConfirmation from './components/Checkout/OrderConfirmation';
import UserProfile from './components/Profile/UserProfile';
import Cart from './components/ShoppingCart/Cart';
import Orders from './components/Profile/Orders';
import AboutUs from './components/Navigation/Aboutus';
import ContactUs from './components/Navigation/ContactUs';
import AdminDashboard from './components/Admin/Dashboard';
import { BookProvider } from './components/Context/BookContext';
import AddBook  from './components/Admin/AddBook';
import  AddBookForm  from './components/Admin/AddBookForm';
import BookCard from './components/Admin/BookCard';
import {ToastContainer} from 'react-toastify';


function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <ToastContainer />
          <Routes>
       
              <Route path="/bookhome" element={<BookHome/>} /> 
              <Route path="/" element={<Login/>} />
              <Route path="/bookdetails/:id" element={<BookDetails/>}/>
              <Route path="/checkoutform" element={<CheckoutForm/>} />
              <Route path="/ordersummary" element={<OrderSummary/>} />
              <Route path="/payment" element={<PaymentSelection/>} />
              <Route path="/orderconfirmation" element={<OrderConfirmation/>} />
              <Route path="/user" element={<UserProfile/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/navbar" element={<NavBar/>} />
              <Route path="/orders" element={<Orders/>} />
              <Route path="/aboutus" element={<AboutUs/>} />
              <Route path="/contactus" element={<ContactUs/>} />
              <Route path="/dashboard" element={<AdminDashboard/>} />
              <Route path="/addbook" element={<AddBook/>} />
              <Route path="/addbookform" element={<AddBookForm/>} />
              <Route path="/bookcard" element={<BookCard/>} />
              
        
          </Routes>
          
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;

