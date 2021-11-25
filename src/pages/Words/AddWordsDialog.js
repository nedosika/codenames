import React from 'react';
import Dialog from "../../components/Dialog";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import {useWords} from "../../hooks/useWords";

const AddWordsDialog = () => {
    const navigate = useNavigate();
    const [words, setWords] = React.useState('');
    const {addWords} = useWords();

    const handleChange = (event) => {
        setWords(event.target.value)
    }

    const handleClose = () => {
        navigate('/words');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(words.split(','));
        addWords(words.split(','));
        handleClose();
    }

    return (
        <Dialog title="Добавление" description="Добавление слов" open onClose={handleClose} onSubmit={handleSubmit}>
            <TextField
                label="Words"
                multiline
                rows={4}
                value={words}
                onChange={handleChange}
                fullWidth
            />
        </Dialog>
    );
};

export default AddWordsDialog;