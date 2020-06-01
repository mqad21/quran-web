import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Checkbox, Grid, FormControlLabel, CircularProgress } from '@material-ui/core';
import { BookmarkBorderOutlined, BookmarkOutlined } from '@material-ui/icons';
import { replaceHarf } from '../library/replaceHarf';
import Context from '../store/context';

function replaceAyat(replaceHarf, ayat, number) {
    var newAyat = ayat;
    for (var i = 0; i < replaceHarf.length; i++) {
        newAyat = newAyat.replace(replaceHarf[i].search, replaceHarf[i].new)
    }
    if (number == 1 && ayat.length >= 40 && ayat.substring(0, 2) == 'بِ') {
        newAyat = removeBismillah(newAyat)
    }
    return newAyat;
}

function removeBismillah(ayat) {
    return ayat.substring(38, ayat.length)
}

export default function Ayat(props) {
    const { state, actions } = useContext(Context);
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
            background: `url(${process.env.PUBLIC_URL}/assets/ayat.png)`,
            backgroundSize: '55px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        avaList: {
            minWidth: '55px',
        },
        ayatPrimary: {
            fontSize: `${state.fontSize * 1.9}rem`,
            textAlign: 'right',
            fontFamily: 'Uthmanic',
            marginBottom: '0.5em',
            lineHeight: '1.7',
            fontWeight: '600'
        },
        ayatSecondary: {
            fontSize: `${state.fontSize * 1.1}rem`
        }
    }));

    const classes = useStyles();
    const { surah, ayat } = props;
    const [isLoadingSave, setIsLoadingSave] = React.useState(false);

    const handleSave = () => {
        setIsLoadingSave(true);
    };

    React.useEffect(() => {
        if (isLoadingSave) {
            const currAyat = ayat.numberInSurah;
            const currSurah = surah;
            setTimeout(() => {
                actions({
                    type: 'setState', payload: {
                        ...state, savedSurah: {
                            surah: currSurah,
                            ayat: currAyat
                        }
                    }
                });
            }, 500);
        }
    }, [isLoadingSave]);

    React.useEffect(() => {
        setIsLoadingSave(false);
    }, [state.savedSurah]);

    const isSaved = (
        state.savedSurah.ayat == ayat.numberInSurah && state.savedSurah.surah == surah
    )

    // const showSnackBar = (message) => {
    //     setOpenSnack(true);
    //     setSnackbarMsg(message);
    // };

    // const handleCloseSnack = () => {
    //     setOpenSnack(false);
    // }

    const savedButton = () => {
        if (isLoadingSave) {
            return (
                <CircularProgress
                    style={{
                        marginTop: '5px'
                    }}
                    size={25}
                    thickness={3}
                    value={50}
                    color="secondary"
                />
            )
        } else {
            return (
                <FormControlLabel style={{ margin: '0' }} control={
                    <Checkbox
                        icon={<BookmarkBorderOutlined />}
                        checkedIcon={<BookmarkOutlined />}
                        checked={isSaved}
                        onChange={handleSave} />}
                    labelPlacement="bottom"
                />
            )
        }
    }

    return (
        <div className="ayat" id={props.id} data-surah={props.surah}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar className={classes.avaList}>
                    <Grid container direction="column" alignItems="center" justify="center">
                        <Avatar className={classes.ava}>{ayat.numberInSurah}</Avatar>
                        {savedButton()}
                    </Grid>
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