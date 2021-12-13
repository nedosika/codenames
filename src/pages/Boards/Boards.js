import React from 'react';

import Layout from "../../layout";
import red from "../../assets/images/red.png";
import blue from "../../assets/images/blue.png";
import black from "../../assets/images/black.png";
import yellow from "../../assets/images/neutral.png";
import background from "../../assets/images/board.png";
import redGame from "../../assets/images/red_game.png";
import blueGame from "../../assets/images/blue_game.png";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {experimentalStyled as styled} from '@mui/material/styles';

const COLORS = [red, blue, yellow, black];

const Item = styled('div')(({background}) => ({
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: 65,
    width: 65,
}));

const GameLight = styled('div')(({sx, background}) => ({
    backgroundImage: `url(${background})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    boxSizing: 'border-box',
    height: '57px',
    width: '19px',
    position: "absolute",
    ...sx
}));

const Board = styled('div')(() => ({
    margin: '80px auto 0',
    width: '512px',
    height: '512px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundImage: `url(${background})`,
    backgroundSize: "contain",
    boxSizing: 'border-box',
    padding: 65
}));

const ButtonsPanel = styled(Box)(() => ({
    position: "fixed",
    bottom: 16,
    right: 16,
    '& > :not(style)': {m: 1}
}));

const Boards = () => {
    const [board, setBoard] = React.useState({
        items: [],
        gameColor: null
    });

    const initBoard = () => {
        const board = [3, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
        const owner = Number(Math.random() > 0.5);
        const gameColor = owner ? blueGame : redGame;

        board.push(owner);
        board.sort((a, b) => 0.5 - Math.random());
        setBoard({
            items: [...board],
            gameColor
        });
    }

    React.useEffect(() => {
        initBoard();
    }, [])

    return (
        <Layout title='Boards generator'>
            <Board>
                <GameLight
                    sx={{marginRight: '472px'}}
                    background={board.gameColor}
                />
                <GameLight
                    sx={{marginLeft: '469px'}}
                    background={board.gameColor}
                />
                <GameLight
                    sx={{marginBottom: '472px', transform: 'rotate(90deg)'}}
                    background={board.gameColor}
                />
                <GameLight
                    sx={{marginTop: '467px', transform: 'rotate(90deg)'}}
                    background={board.gameColor}
                />
                {
                    board?.items.map((item) => <Item background={COLORS[item]}/>)
                }
            </Board>
            <ButtonsPanel>
                <Fab color="primary" onClick={initBoard}>
                    <AutorenewIcon/>
                </Fab>
            </ButtonsPanel>
        </Layout>
    );
};

export default Boards;