import React from 'react';
import {Outlet, useParams} from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {CardContent} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';

import Layout from "../../layout";
import ButtonsPanel from "./ButtonsPanel";
import {useGames} from "../../hooks/useGames";
import cardBackground from "../../assets/images/card.png";
import redManBackground from "../../assets/images/red_man.png";
import redWomanBackground from "../../assets/images/red_woman.png";
import blueManBackground from "../../assets/images/blue_man.png";
import blueWomanBackground from "../../assets/images/blue_woman.png";
import grayManBackground from "../../assets/images/gray_man.png";
import greyWomanBackground from "../../assets/images/gray_woman.png";
import blackManBackground from "../../assets/images/black_man.png";

const COLORS = [redManBackground, blueWomanBackground, grayManBackground, blackManBackground];

const Card = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    cursor: 'pointer',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundImage: `url(${cardBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: 100,
    minWidth: 166,
    margin: '5px',
}));

const CoveredCard = styled(Paper)(({background, theme}) => ({
    ...theme.typography.body2,
    cursor: 'pointer',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: 100,
    minWidth: 166,
    margin: '5px',
}));

const Games = () => {
    const {id} = useParams();
    const {games, updateGame, resetGame} = useGames(id);
    const game = games[0];

    const handleClick = (id) => (event) => {
        const word = game.words?.find((item) => item.id === id);
        const color = word.color > 3 ? 0 : word.color + 1 || 0;

        const newGame = {
            ...game,
            words: game.words.map((word) => {
                if (word.id === id)
                    return {...word, color}
                return {...word}
            })
        }

        updateGame(newGame);
    }

    const handleResetGame = () => {
        resetGame(id);
    }

    return (
        <Layout title='Codenames'>
            <Box sx={{
                margin: '80px auto 0',
                maxWidth: '1040px',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {
                    game?.words?.map((word) =>
                        COLORS[word?.color]
                            ?
                            <CoveredCard
                                elevation={3}
                                key={word.id}
                                background={COLORS[word.color]}
                                onClick={handleClick(word.id)}
                            />
                            :
                            <Card
                                elevation={3}
                                key={word.id}
                                onClick={handleClick(word.id)}
                            >
                                <CardContent style={{marginTop: 48, fontWeight: 'bold'}}>
                                    {word.value}
                                </CardContent>
                            </Card>
                    )
                }
            </Box>
            <Outlet/>
            <ButtonsPanel onResetGame={handleResetGame}/>
        </Layout>
    );
};

export default Games;