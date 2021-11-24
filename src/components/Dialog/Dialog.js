import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";

export default function ({
                             children,
                             title,
                             description,
                             onSubmit,
                             onClose,
                             open
                         }) {
    return (
        <Dialog
            component="form"
            onSubmit={onSubmit}
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <LoadingButton
                    loading={false}
                    variant="outlined"
                    type="submit"
                >
                    Подтвердить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
;