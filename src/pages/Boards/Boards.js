import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {CardContent} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';

import Layout from "../../layout";
import background from "../../assets/images/board.png";
import red from "../../assets/images/red.png";
import blue from "../../assets/images/blue.png";
import black from "../../assets/images/black.png";
import yellow from "../../assets/images/neutral.png";

const COLORS = [red, blue, yellow, black];

const Item = styled('div')(({background}) => ({
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: 65,
    width: 65,
}));

const Boards = () => {
    const board = new Array(25).fill(0)
    return (
        <Layout title='Boards generator'>
            <div style={{
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
            }}>
                {
                    board.map(() => <Item background={COLORS[2]}/>)
                }
            </div>
        </Layout>
    );
};

export default Boards;