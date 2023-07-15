import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomePage from "../pages/adminHomePage";
import Book from "../pages/book";
import Login from "../pages/login";
import Register from "../pages/register";
import UserHomePage from "../pages/userHomePage";
import BookDetail from "../pages/bookDetail";
import Cart from "../pages/cart";
import Accounts from "../pages/accounts";
import PageNotFound from "../Components/Error/404";
import NotAuthorPage from "../Components/Error/403";
import Products from "../Components/User/products";
import History from "../Components/User/history";

const RouterPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserHomePage />} >
                    <Route path="/book-detail/:bookcode" element={<BookDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/history" element={<History /> } />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register /> } />
                <Route path='/admin' element={<AdminHomePage />} >
                    <Route path='/admin/book' element={<Book />} />
                    <Route path='/admin/accounts' element={<Accounts />} />
                </Route>
                <Route path='403-error' element={<NotAuthorPage />} />
                <Route path="*" element={<PageNotFound />} />   
            </Routes>
        </Router>
    )
}

export default RouterPages;