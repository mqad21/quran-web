import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Surah from './pages/Surah';
import TabPanel from './surah/TabPanel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        maxWidth: '100vw',
        marginLeft: -drawerWidth,
    },
}));

const SurahWithId = ({ match }) => {
    return (
        <Surah surah={parseInt(match.params.surahId, 10)} />
    )
}

function Content() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <main className={classes.content}>
            <div className={classes.drawerHeader} />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/surah/:surahId" component={SurahWithId} />
                <Redirect from="/surah" to="/surah/1" />
            </Switch>
        </main>
    )
}

export default Content;