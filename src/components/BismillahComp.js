import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Context from '../store/context';

export default function Bismillah(props) {
    const { state } = useContext(Context);
    const { surah } = props;

    const useStyles = makeStyles((theme) => ({
        bismillah: {
            fontSize: `${state.fontSize * 1.9}rem`,
        }
    }));

    const classes = useStyles(state.fontSize);

    if (surah !== 1 && surah !== 9) {
        return (
            <div className={classes.div}>
                <ListItem alignItems="center">
                    <div className={classes.bismillah + " bismillah"} >﻿بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ</div>
                </ListItem>
                <Divider component="li" />
            </div>
        )
    }
    return null
}