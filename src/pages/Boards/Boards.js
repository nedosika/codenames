import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {CardContent} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';

import Layout from "../../layout";
import background from "../../assets/images/card.png";

const COLORS = ['red', 'blue', 'yellow', 'black'];

const Item = styled(Paper)(({theme}) => ({
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

const Boards = () => {
    return (
        <Layout title='Boards generator'>
            <Box sx={{
                margin: '80px auto 0',
                maxWidth: '1040px',
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {
                    []?.words?.map((word) =>
                        <Item
                            elevation={3}
                            key={word.id}
                        >
                            <CardContent style={{marginTop: 48, fontWeight: 'bold'}}>

                            </CardContent>
                        </Item>
                    )
                }
            </Box>
        </Layout>
    );
};

export default Boards;