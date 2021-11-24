import React from 'react';
import { Outlet } from 'react-router-dom';

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
    width: 166
}));

const Words = () => {
    const {words} = useWords();

    console.log(words)

    return (
        <Layout title='Words'>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 10, sm: 10, md: 10}}>
                    {
                        words.map((word) =>
                            <Grid item xs={2} sm={2} md={2} key={word.id}>
                                <Item elevation={3}>
                                    <CardContent style={{marginTop: 48, fontWeight: 'bold'}}>
                                        {word.value}
                                    </CardContent>
                                </Item>
                            </Grid>)
                    }
                </Grid>
            </Box>
            <Outlet/>
            <AddWordsButton/>
        </Layout>
    );
};

export default Words;