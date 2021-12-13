import React from 'react';

import Box from "@mui/material/Box";

const ButtonsPanel = ({children}) => {
    return (
        <Box sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            '& > :not(style)': {m: 1}
        }}>
            {children}
        </Box>
    );
};

export default ButtonsPanel;