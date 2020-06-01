import React, { useEffect, useRef, useState, useContext } from 'react';
import TabMenu from '../TabMenuComp';
import TabPanel from '../TabPanelComp';
import SurahCont from '../SurahComp';
import Fab from '@material-ui/core/Fab';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import HeightIcon from '@material-ui/icons/HeightRounded';
import SurahList from '../../json/surah.json';
import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';
import Context from '../../store/context';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
        color: 'white',
    },
    slider: {
        position: 'fixed',
        maxHeight: 'calc(100vh - 260px)',
        bottom: theme.spacing(11),
        left: theme.spacing(2.1),
        transition: '1000ms',
        opacity: 1,
    },
    hide: {
        maxHeight: '0px',
        opacity: 0,
        transition: '1000ms',
    }
}));

const PrettoSlider = withStyles({
    root: {
        color: '#0fc7d5',
        width: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        minWidth: 14,
        borderRadius: 4,
    },
    rail: {
        minWidth: 14,
        borderRadius: 4,
    },
})(Slider);

function Surah(props) {
    const { surah } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [hideScroll, setHideScroll] = React.useState(true);
    const [ayatScroll, setAyatScroll] = React.useState(1);
    const [surahLength, setSurahLength] = React.useState(0);
    const ayatSlider = useRef();
    const { state, actions } = useContext(Context);
    const useOutsideClick = (ref, callback) => {
        const handleClick = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClick);

            return () => {
                document.removeEventListener("click", handleClick);
            };
        });
    };

    useOutsideClick(ayatSlider, () => {
        setHideScroll(true);
    });

    const fab =
    {
        color: 'primary',
        className: classes.fab,
        icon: <HeightIcon style={{ fontSize: 30 }} />,
        label: 'Add',
    };

    const handleChangeTab = (event, value) => {
        setHideScroll(true);
        setAyatScroll(1);
        window.scrollTo(0, 0);
    };

    const handleFabClick = () => {
        setHideScroll(!hideScroll);
    };

    const handleSliderChange = (sliderValue) => {
        var ayatCurrent = surahLength - sliderValue + 1;
        scrollToAyat(ayatCurrent);
    }

    function scrollToAyat(ayatCurrent) {
        if (ayatCurrent < 1) ayatCurrent = 1;
        if (ayatCurrent > 1) {
            var ayatElem = document.getElementById("ayat-" + ayatCurrent);
            ayatElem.scrollIntoView({ behavior: 'auto' });
            var scrolledY = window.scrollY;
            if (scrolledY) {
                window.scroll(0, scrolledY - 99);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }

    React.useEffect(() => {
        if (state.scrollTo) {
            scrollToAyat(state.savedSurah.ayat);
        }
        actions({
            type: 'setState', payload: {
                ...state, scrollTo: false
            }
        });
    }, [state.scrollTo])

    return (
        <React.Fragment>
            <TabMenu tabSelected={surah} list={SurahList} handleChangeTab={handleChangeTab} />
            <TabPanel>
                <SurahCont type="surah" surah={props.surah} setSurahLength={setSurahLength} ayatScroll={ayatScroll} />
            </TabPanel>
            <div ref={ayatSlider}>
                <Fab aria-label={fab.label} className={fab.className} color={fab.color}
                    onClick={handleFabClick}
                >
                    {fab.icon}
                </Fab>
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    color="secondary"
                    orientation="vertical"
                    className={clsx(classes.slider,
                        { [classes.hide]: hideScroll })}
                    step={1}
                    aria-labelledby="vertical-slider"
                    track={false}
                    min={1}
                    max={surahLength}
                    onChangeCommitted={(e, val) => handleSliderChange(val)}
                    valueLabelFormat={(val) => {
                        return (surahLength - val + 1)
                    }}
                    defaultValue={1000}
                />
            </div>
        </React.Fragment>
    );
}

export default Surah;