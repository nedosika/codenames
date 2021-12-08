import React from 'react';
import {Outlet, useParams} from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {CardContent} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';

import Layout from "../../layout";
import ButtonsPanel from "./ButtonsPanel";
import {useGames} from "../../hooks/useGames";
import background from "../../assets/images/card.png";

const COLORS = ['red', 'blue', 'yellow', 'black'];

const Item = styled(Paper)(({borderColor, theme}) => ({
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
        boxShadow: `inset 0px 0px 25px 5px ${borderColor}`
}));

const Games = () => {
    const {id} = useParams();
    const {games, updateGame, resetGame} = useGames(id);
    const game = games[0];
    //const [board, setBoard] = React.useState([]);

    const handleClick = (id) => (event) => {
        //const color = board[id]?.color > 3 ? 0 : board[id]?.color + 1 || 0;

        // setBoard({
        //     ...board,
        //     [id]: {color}
        // })

        const word = game.words?.find((item) => item.id === id);
        const color = word.color > 3 ? 0 : word.color + 1;

        console.log(color)

        updateGame(game.id, {...game, words: game.words.map((word) => {
            if(word.id === id){
                return {...word, color}
            }
            return {...word}
            })});
    }

    const handleResetGame = () => {
        //setBoard([]);
        resetGame(id);
    }

    return (
        <Layout title='Games'>
            <Box sx={{
                margin: '80px auto 0',
                maxWidth: '1040px',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {
                    game?.words?.map((word) =>
                        <Item
                            elevation={3}
                            key={word.id}
                            onClick={handleClick(word.id)}
                            borderColor={COLORS[word.color]}
                        >
                            <CardContent style={{marginTop: 48, fontWeight: 'bold'}}>
                                {word.value}
                            </CardContent>
                        </Item>
                    )
                }
            </Box>
            <Outlet/>
            <ButtonsPanel onResetGame={handleResetGame}/>
        </Layout>
    );
};

export default Games;