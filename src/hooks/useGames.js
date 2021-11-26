import React, {createContext, useContext} from "react";
import {useStreamCollection} from "../services/Firestore";
import {useWords} from "./useWords";

const GamesContext = createContext({});

export const useGames = (id) => {
    const {games} = useContext(GamesContext);
    const game = games?.find((game) => game.id === id);
    const {words} = useWords(game?.words);

    return {games: id ? [{...game, words}] : games};
}

export const GamesProvider = ({children}) => {
    const {documents: games} = useStreamCollection('games');

    return(
        <GamesContext.Provider value={{games}}>
            {children}
        </GamesContext.Provider>
    )
}

