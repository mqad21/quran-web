import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Home from './pages/Home';
import Surah from './pages/Surah';
import Juz from './pages/Juz';
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

const JuzWithId = ({ match }) => {
    return (
        <Juz juz={parseInt(match.params.juzId, 10)} />
    )
}

function Content() {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <main className={classes.content}>
            <div className={classes.drawerHeader} />
            <Switch>
                <Route path="/surah/:surahId" component={SurahWithId} />
                <Route path="/juz/:juzId" component={JuzWithId} />
                <Redirect exact from="/" to="/surah/1" />
                <Redirect exact from="/surah" to="/surah/1" />
                <Redirect exact from="/juz" to="/juz/1" />
                <Redirect to="/surah/1"/>
            </Switch>
        </main>
    )
}

export default Content;