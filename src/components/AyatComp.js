import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Alfatihah from '../json/alfatihah.json';
import { replaceHarf } from '../library/replaceHarf';

const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
    ava: {
        width: '50px',
        height: '50px',
        fontSize: '1rem',
        color: '#0fc7d5',
        fontWeight: 'bold',
        background: `url(./assets/ayat.png)`,
        backgroundSize: '55px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    avaList: {
        minWidth: '55px',
        marginRight: '5px'
    },
    ayatPrimary: {
        fontSize: '2rem',
        textAlign: 'right',
        fontFamily: 'Uthmanic',
        marginBottom: '0.5em',
        lineHeight: '1.7',
        fontWeight: '600'
    },
    ayatSecondary: {
        fontSize: '1rem'
    }
}));

function replaceAyat(replaceHarf, ayat, number) {
    var newAyat = ayat;
    for (var i = 0; i < replaceHarf.length; i++) {
        newAyat = newAyat.replace(replaceHarf[i].search, replaceHarf[i].new)
    }
    if (number == 1 && ayat.length >= 40 && ayat.substring(0,2) == 'بِ') {
        newAyat = removeBismillah(newAyat)
    }
    return newAyat;
}

function removeBismillah(ayat) {
    return ayat.substring(38,ayat.length)
}

export default function Ayat(props) {
    const classes = useStyles();
    const { ayat } = props;

    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar className={classes.avaList}>
                    <Avatar className={classes.ava}>{ayat.numberInSurah}</Avatar>
                </ListItemAvatar>
                <ListItemText classes={{ primary: classes.ayatPrimary, secondary: classes.ayatSecondary }}
                    primary={replaceAyat(replaceHarf, ayat.text, ayat.numberInSurah)}
                    secondary={ayat.trans}
                />
            </ListItem>
            <Divider component="li" />
        </div>
    )
}