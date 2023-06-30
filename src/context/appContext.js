import { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [book, setBook] = useState({});
    const [disabled, setDisabled] = useState(true);

    const props = {book, setBook, disabled, setDisabled};

    return (
        <AppContext.Provider value={props} >
            {children}
        </AppContext.Provider>
    )
}