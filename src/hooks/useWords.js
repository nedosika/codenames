import React, {createContext, useContext, useEffect, useState} from "react";

import FirestoreService, {useStreamCollection} from "../services/Firestore";

const WordsContext = createContext({});

export const useWords = (ids) => {
    const {words} = useContext(WordsContext);
    const [filteredWords, setFilteredWords] = useState([]);

    const getWord = (id) => words.find((word) => word.id === id);

    useEffect(() => {
        const filteredWords = [];
        words.forEach((word) => {
            if(ids?.includes(word.id))
                filteredWords.push(word);
        });
        setFilteredWords(filteredWords);
    }, [words, ids]);

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

    return {words: ids ? filteredWords : words, getWord, addWords, updateWord, deleteWord}
}

export const WordsProvider = ({children}) => {
    const {documents: words} = useStreamCollection("words");

    return (
        <WordsContext.Provider value={{words}}>
            {children}
        </WordsContext.Provider>
    )
}
