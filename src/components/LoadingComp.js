import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorLinearProgress = withStyles({
    colorPrimary: {
        backgroundColor: 'white',
    },
    barColorPrimary: {
        backgroundColor: '#0fc7d5',
    },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'transparent',
        position: 'absolute',
        zIndex: '1000',
        top: '0',
    },
    margin: {
        width: '100vw',
        height: '3px',
    },
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ColorLinearProgress className={classes.margin} />
        </div>
    );
}