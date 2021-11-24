import React, {createContext, useContext} from "react";
import FirebaseService from "../services/Firebase";

const WordsContext = createContext({});

export const useWords = () => {
    const {documents: words} = FirebaseService.useStreamCollection("words");

    return {words}
}

export const WordsProvider = ({children}) => {
    const {words} = useContext(WordsContext);

    return(
        <WordsContext.Provider value={{words}}>
            {children}
        </WordsContext.Provider>
    )
}
