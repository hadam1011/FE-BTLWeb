import { createContext, useEffect, useState } from "react";
import * as bookService from '../services/bookServices';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [book, setBook] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            const data = await bookService.getAllBook();
            setBookList(data);
        }
        fetchBook();    
    }, [])

    const props = {book, setBook, disabled, setDisabled, bookList, setBookList};

    return (
        <AppContext.Provider value={props} >
            {children}
        </AppContext.Provider>
    )
}