import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, Button, TextField, Backdrop, CircularProgress } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import DialogFullComp from '../DialogFullComp';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
    },
    button: {
        color: 'white !important'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function Lapor() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = React.useState(false);
    const { register, errors, handleSubmit } = useForm();
    const [dialog, setDialog] = React.useState({
        open: false,
        title: "",
        content: ""
    });

    const onSubmit = (report, e) => {
        setIsLoading(true);
        const URL = "https://api.mqad21.my.id/quranweb/insert.php";
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(report)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error: " + response.statusText);
                } else {
                    showDialog("Terima kasih!", "Semoga senantiasa diberi keberkahan dalam hidup :)");
                    setIsLoading(false);
                    e.target.reset();   
                }
            }).catch(err => {
                showDialog("Ups! Terdapat Kesalahan", "Coba periksa koneksi Anda");
                setIsLoading(false);
            })
    };

    const showDialog = (title, content) => {
        setDialog({
            open: true,
            title: title,
            content: content
        });
    };

    const closeDialog = () => setDialog({ open: false, title: "", content: "" });

    return (
        <Box m={3}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                <FormControl className={classes.formControl}>
                    <TextField inputRef={register({ required: true })}
                        error={errors.title}
                        name="title"
                        size="medium"
                        aria-describedby="my-helper-text" fullWidth variant="outlined"
                        helperText={errors.title && "Wajib diisi"}
                        label="Judul" />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <TextField inputRef={register({ required: true })} name="content" multiline rows={5}
                        error={errors.content}
                        size="medium"
                        aria-describedby="my-helper-text" fullWidth variant="outlined"
                        helperText={errors.content && "Wajib diisi"}
                        label="Isi" />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Button type="submit" className={classes.button} variant="contained" color="primary" size="large" endIcon={<Send />}>
                        Kirim
                    </Button>
                </FormControl>
            </form>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <DialogFullComp open={dialog.open} title={dialog.title} content={dialog.content} closeDialog={closeDialog} />
        </Box>
    );
}
