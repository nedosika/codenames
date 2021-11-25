import React, {createContext, useContext} from "react";

import FirestoreService from "../services/Firestore";

const WordsContext = createContext({});

export const useWords = () => {
    const {documents: words} = FirestoreService.useStreamCollection("words");

    const getWord = (id) => words.find((word) => word.id === id);

    const updateWord = (word) =>
        FirestoreService
            .updateDocById("words", word.id, word);

    const addWords = (words) =>
        Promise.all(
            words.map((word) =>
                FirestoreService.addDocument("words", {value: word}))
        );

    const deleteWord = (id) =>
        FirestoreService
            .deleteDocument("words", id);

    return {words, getWord, addWords, updateWord, deleteWord}
}

export const WordsProvider = ({children}) => {
    const {words} = useContext(WordsContext);

    return (
        <WordsContext.Provider value={{words}}>
            {children}
        </WordsContext.Provider>
    )
}
