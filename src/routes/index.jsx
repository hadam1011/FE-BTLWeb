import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminHomePage from "../pages/adminHomePage";
import Book from "../pages/book";
import { useState } from "react";
import Login from "../pages/login";
import Register from "../pages/register";
import UserHomePage from "../pages/userHomePage";
import BookDetail from "../pages/bookDetail";
import Cart from "../pages/cart";

const RouterPages = () => {
    const [book, setBook] = useState({});
    const [disabled, setDisabled] = useState(true);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserHomePage />} >
                    <Route path="/book-detail" element={<BookDetail />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register /> } />
                <Route path='/admin' element={<AdminHomePage setBook={setBook} setDisabled={setDisabled} />} >
                    <Route path='/admin/book' element={<Book book={book} disabled={disabled} />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default RouterPages;