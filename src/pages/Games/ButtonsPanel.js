import React from 'react';
import {useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const ButtonsPanel = ({onResetGame}) => {
    const navigate = useNavigate();

    const handleOpenCreateProcessDialog = () => {
        navigate(`add`);
    };

        return (
            <Box sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                '& > :not(style)': {m: 1}
            }}>
                <Fab color="primary" onClick={onResetGame}>
                    <AutorenewIcon/>
                </Fab>
                <Fab color="primary" onClick={handleOpenCreateProcessDialog}>
                    <AddIcon/>
                </Fab>
            </Box>
        );
};

export default ButtonsPanel;