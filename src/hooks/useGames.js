import React, {createContext, useContext} from "react";
import {useStreamCollection} from "../services/Firestore";
import {useWords} from "./useWords";
import FirestoreService from "../services/Firestore";

const GamesContext = createContext({});

export const useGames = (id) => {
    const {games} = useContext(GamesContext);
    const game = games?.find((game) => game.id === id);
    const {getShuffledWords, getWords} = useWords();

    const updateGame = () => {

    }

    const resetGame = (id) => {
        const shuffledWords = getShuffledWords(25);
        FirestoreService
            .updateDocById('games', id, {id, words: shuffledWords.map((word) => word.id)})
    }

    return {games: id ? [{...game, words: getWords(game?.words)}] : games, resetGame};
}

export const GamesProvider = ({children}) => {
    const {documents: games} = useStreamCollection('games');

    return(
        <GamesContext.Provider value={{games}}>
            {children}
        </GamesContext.Provider>
    )
}

