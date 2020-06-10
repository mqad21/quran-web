import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@material-ui/core';

export default function DialogFull(props) {
    const { open, title, content, closeDialog } = props;

    return (
        <Dialog
            fullWidth
            maxWidth={'sm'}
            open={open}
            onClose={closeDialog}
            aria-labelledby="dialog"
        >
            <DialogTitle id="dialog">{title}</DialogTitle>
            <DialogContent>
                <Typography paragraph>
                    {content}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}
