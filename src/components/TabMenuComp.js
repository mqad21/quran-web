import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Snackbar, SnackbarContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
    const [showSnack] = useState(false);
    const [surahActive] = React.useState(0);
    const { tabSelected, handleChangeTab, type } = props;

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
                            <Tab label={list.nama} component={Link} to={`${process.env.PUBLIC_URL}/${type}/${index+1}`} />
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
