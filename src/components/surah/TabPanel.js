import React from 'react';
import Ayat from './Ayats';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        maxWidth: '100vw',
        position: 'relative',
        zIndex: '-20'
    },
}));

function TabPanel(props) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            {props.children}
        </div>
    );
}

export default TabPanel;