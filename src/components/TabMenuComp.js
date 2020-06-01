import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Snackbar, SnackbarContent } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SurahList from '../json/surah.json';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        zIndex: '1',
        position: 'sticky',
        top: '56px'
    },
    snackbar: {
        [theme.breakpoints.down('lg')]: {
            top: 55,
            position: 'absolute',
            width: '50vw',
            transformX: 'translate(-50%)',
            padding: 0,
            justifyContent: 'center'
        },
        [theme.breakpoints.down('md')]: {
            left: '25%'
        },
        opacity: 0.7,
    },
    snackbarContent: {
        textAlign: 'center',
        width: 'auto',
        display: 'block',
        padding: 0
    }
}));

export default function TabMenu(props) {
    const classes = useStyles();
    const [showSnack, setShowSnack] = useState(false);
    const [surahActive, setSurahActive] = React.useState(0);
    const { tabSelected, handleChangeTab } = props;
    var x;

    const getTopSurahId = () => {
        var ayats = document.getElementsByClassName('ayat');
        for (var i = 0; i < ayats.length; i++) {
            if (ayats[i].getBoundingClientRect().top > 0) return ayats[i].getAttribute('data-surah');
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", (e) => {
            clearTimeout(x);
            e.preventDefault();
            if (!showSnack) {
                var id = getTopSurahId();
                setSurahActive(SurahList[id - 1] === undefined ? '' : SurahList[id - 1].nama);
                setShowSnack(true);
            }
            x = setTimeout(() => {
                if (showSnack) {
                    setShowSnack(false)
                }
            }, 500);
        })
    });

    return (
        <div className={classes.root}>
            <AppBar position="static" color="white">
                <Tabs
                    value={tabSelected - 1}
                    onChange={handleChangeTab}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {
                        props.list.map((list, index) => (
                            <Tab label={list.nama} component={Link} to={(index + 1).toString()} />
                        ))
                    }
                </Tabs>
            </AppBar>
            <Snackbar
                className={classes.snackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={showSnack && surahActive !== ''}
            >
                <SnackbarContent className={classes.snackbarContent} message={surahActive} />
            </Snackbar>
        </div>
    );
}
