import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Surah from './pages/Surah';
import Juz from './pages/Juz';
import Tentang from './pages/Tentang';
import Lapor from './pages/Masukan';
import Cari from './pages/Cari';

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
        <Surah surah={parseInt(match.params.surahId, 10)} ayat={match.params.ayat || null} />
    )
}

const JuzWithId = ({ match }) => {
    return (
        <Juz juz={parseInt(match.params.juzId, 10)} />
    )
}

function Content() {
    const classes = useStyles();
    const baseUrl = process.env.PUBLIC_URL;

    return (
        <main className={classes.content}>
            <div className={classes.drawerHeader} />
            <Switch>
                <Route exact path={`${baseUrl}/surah/:surahId`} component={SurahWithId} />
                <Route exact path={`${baseUrl}/surah/:surahId/:ayat`} component={SurahWithId} />
                <Route path={`${baseUrl}/juz/:juzId`} component={JuzWithId} />
                <Route exact path={`${baseUrl}/cari`} component={Cari} />
                <Route exact path={`${baseUrl}/tentang`} component={Tentang} />
                <Route exact path={`${baseUrl}/masukan`} component={Lapor} />
                <Redirect exact from={`${baseUrl}/surah`} to={`${baseUrl}/surah/1`} />
                <Redirect exact from={`${baseUrl}/juz`} to={`${baseUrl}/juz/1`} />
                <Redirect to={`${baseUrl}/surah/1`} />
            </Switch>
        </main>
    )
}

export default Content;