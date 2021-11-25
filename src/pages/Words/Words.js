import React from 'react';
import {Outlet} from 'react-router-dom';

import Layout from "../../layout";
import {experimentalStyled as styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import background from "../../assets/images/card.png";
import {useWords} from "../../hooks/useWords";
import {CardContent} from "@mui/material";
import AddWordsButton from "./AddWordsButton";

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

const Words = () => {
    const {words} = useWords();

    return (
        <Layout title='Words'>
            <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {
                    words.map((word) =>
                        <Item elevation={3} key={word.id}>
                            <CardContent style={{marginTop: 48, fontWeight: 'bold'}}>
                                {word.value}
                            </CardContent>
                        </Item>
                    )
                }
            </Box>
            <Outlet/>
            <AddWordsButton/>
        </Layout>
    );
};

export default Words;