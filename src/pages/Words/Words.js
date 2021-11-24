import React from 'react';

import Layout from "../../layout";
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import background from "../../assets/images/card.png";

const Item = styled(Paper)(({ theme }) => ({
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
    return (
        <Layout title='Words'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                    {Array.from(Array(25)).map((_, index) => (
                        <Grid item xs={2} sm={2} md={2} key={index}>
                            <Item elevation={3}></Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
};

export default Words;