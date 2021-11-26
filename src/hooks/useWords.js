import React, {createContext, useContext, useEffect, useState} from "react";

import FirestoreService, {useStreamCollection} from "../services/Firestore";

const WordsContext = createContext({});

export const useWords = (ids) => {
    const {words} = useContext(WordsContext);
    //const [filteredWords, setFilteredWords] = useState([]);

    const getWord = (id) => words.find((word) => word.id === id);


    // useEffect(() => {
    //     const filteredWords = ids?.map((id) => words?.find((word) => word.id === id));
    //     setFilteredWords([...filteredWords]);
    // }, [words, ids]);

    //console.log(filteredWords)

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
        words: ids
            ? ids?.map((id) => words?.find((word) => word.id === id))
            : words,
        getWord,
        addWords,
        updateWord,
        deleteWord
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
