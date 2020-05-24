import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    ayatPrimary: {
        fontSize: '2rem',
        textAlign: 'center',
        fontFamily: 'Uthmanic',
        marginBottom: '0.5em',
        lineHeight: '1.7',
        fontWeight: '600',
    },
    div: {
        background: 'white'
    },
    frame: {
        width: '20px'
    }
}));

export default function Bismillah(props) {
    const classes = useStyles();
    const { surah } = props;

    if (surah !== 1 && surah !== 9) {
        return (
            <div className={classes.div}>
                <ListItem alignItems="center">
                    <div className="bismillah" >﻿بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
                </ListItem>
                <Divider component="li" />
            </div>
        )
    }
    return null
}