import React from 'react';
import {Outlet, useParams} from 'react-router-dom';

import Layout from "../../layout";
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import background from "../../assets/images/card.png";
import {CardContent} from "@mui/material";
import ButtonsPanel from "./ButtonsPanel";
import {useGames} from "../../hooks/useGames";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: 100,
    minWidth: 166,
    margin: '5px'
}));

const Games = () => {
    const params = useParams();
    const {games, resetGame} = useGames(params.id);
    const game = games[0];

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
                        <Item elevation={3} key={word.id}>
                            <CardContent style={{marginTop: 48, fontWeight: 'bold'}}>
                                {word.value}
                            </CardContent>
                        </Item>
                    )
                }
            </Box>
            <Outlet/>
            <ButtonsPanel onResetGame={() => resetGame(params.id)}/>
        </Layout>
    );
};

export default Games;