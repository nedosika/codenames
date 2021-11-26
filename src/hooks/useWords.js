import React, {createContext, useContext, useEffect, useState} from "react";

import FirestoreService, {useStreamCollection} from "../services/Firestore";

const WordsContext = createContext({});

export const useWords = () => {
    const {words} = useContext(WordsContext);

    const getWord = (id) => words.find((word) => word.id === id);

    const getShuffledWords = (count = 25) =>
        words.sort((a, b) => 0.5 - Math.random()).slice(0, count);

    const getWords = (ids) =>
        ids?.map((id) => words?.find((word) => word.id === id));

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

    return {
        words,
        getWord,
        addWords,
        updateWord,
        deleteWord,
        getWords,
        getShuffledWords
    }
}

export const WordsProvider = ({children}) => {
    const {documents: words} = useStreamCollection("words");

    return (
        <WordsContext.Provider value={{words}}>
            {children}
        </WordsContext.Provider>
    )
}
