import React from 'react';

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
    const board = [3, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
    board.push(Number(Math.random() > 0.5));
    board.sort((a, b) => 0.5 - Math.random());

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
                    board.map((item) => <Item background={COLORS[item]}/>)
                }
            </div>
        </Layout>
    );
};

export default Boards;