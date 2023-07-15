import { createContext, useEffect, useState } from "react";
import * as bookService from '../services/bookServices';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [book, setBook] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [bookList, setBookList] = useState([]);

    const fetchBook = async () => {
        const data = await bookService.getAllBook();
        setBookList(data);
    }

    useEffect(() => {
        fetchBook();    
    }, [])

    const props = {book, setBook, disabled, setDisabled, bookList, setBookList, fetchBook};

    return (
        <AppContext.Provider value={props} >
            {children}
        </AppContext.Provider>
    )
}