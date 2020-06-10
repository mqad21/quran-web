import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '1rem'
    }
}));

export default function Tentang(props) {
    const classes = useStyles();

    return (
        <Box m={3}>
            <Typography variant="h5" className={classes.title}>
                Tentang Quran Web
            </Typography>
            <Typography paragraph>
                Quran Web merupakan aplikasi web yang dibangun menggunakan <i>library</i> React Js. Selain React Js, aplikasi ini juga menerapkan konsep <i>Progressive Web App</i> (PWA) menggunakan <i>library</i> Workbox.
            </Typography>
            <Typography paragraph>
                Dengan menerapkan PWA, aplikasi ini diharapkan dapat berjalan mirip dengan karakteristik aplikasi <i>native</i>, yaitu dapat berjalan tanpa koneksi internet, tampilan yang <i>mobile-friendly</i>, performa yang cepat dan lain sebagainya.
            </Typography>
            <Typography paragraph>
                Aplikasi Quran Web dibuat sebagai latihan seorang pembelajar sehingga segala isinya tak luput dari kesalahan. Oleh sebab itu, kritik dan masukan dari pengguna sangat diharapkan agar kemurnian Al-Quran dapat terjaga dan aplikasi ini dapat menjadi lebih baik lagi.  
            </Typography>
        </Box>
    );
}