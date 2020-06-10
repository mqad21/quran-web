import React, { useEffect, useRef } from 'react';
import TabMenu from '../TabMenuComp';
import TabPanel from '../TabPanelComp';
import JuzCont from '../JuzComp';
import Fab from '@material-ui/core/Fab';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import HeightIcon from '@material-ui/icons/HeightRounded';
import JuzList from '../../json/juz.json';
import Slider from '@material-ui/core/Slider';
import clsx from 'clsx';

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

function Juz(props) {
    const { juz } = props;
    const classes = useStyles();
    const [hideScroll, setHideScroll] = React.useState(true);
    const [ayatScroll, setAyatScroll] = React.useState(1);
    const [juzLength, setJuzLength] = React.useState(0);
    const ayatSlider = useRef();
    const [ayatArr, setAyatArr] = React.useState([]);

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

    const handleChangeTab = (event, newValue) => {
        setHideScroll(true);
        setAyatScroll(1);
        window.scrollTo(0, 0);
    };

    const handleFabClick = () => {
        setHideScroll(!hideScroll);
    };

    const handleSliderChange = (sliderValue) => {
        var ayatCurrent = juzLength - sliderValue + 1;
        scrollToAyat(ayatCurrent)
    }

    const formatLabel = (val) => {
        return ayatArr[juzLength - val];
    }

    function scrollToAyat(ayatCurrent) {
        if (ayatCurrent < 1) ayatCurrent = 1;
        var ayatElem = document.getElementById("ayat-" + ayatCurrent);
        ayatElem.scrollIntoView({ behavior: 'auto' });
        var scrolledY = window.scrollY;
        if (scrolledY) {
            window.scroll(0, scrolledY - 99);
        }
    }

    return (
        <div>
            <TabMenu tabSelected={juz} list={JuzList} handleChangeTab={handleChangeTab} type="juz"/>
            <TabPanel>
                <JuzCont type="juz" juz={props.juz} setJuzLength={setJuzLength} setAyatArr={setAyatArr} ayatScroll={ayatScroll} />
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
                    max={juzLength}
                    onChangeCommitted={(e, val) => handleSliderChange(val)}
                    valueLabelFormat={(val) => formatLabel(val)}
                    defaultValue={1000}
                />
            </div>
        </div>
    );
}

export default Juz;