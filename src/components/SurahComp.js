import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Ayat from './AyatComp';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './LoadingComp';
import Bismillah from './BismillahComp';
import AyatJSON from '../json/quran-uthmani.json';
import TransJSON from '../json/translation.json';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        marginBottom: '1px',
        paddingRight: '0',
        minHeight: '100vh'
    },
}));

function SurahCont(props) {
    const classes = useStyles();
    const [ayatArr, setAyatArr] = useState([]);
    const [transArr, setTransArr] = useState([]);
    const { surah, ayatScroll } = props;
    const [surahId, setSurahId] = useState(1);
    const [isLoading, setLoading] = useState(true)
    const [quranData, setQuranData] = useState([]);

    useEffect(() => {
        const ayat = AyatJSON.data.surahs;
        const trans = TransJSON.data.surahs;

        var quranArr = [];
        for (let i = 0; i < ayat.length; i++) {
            quranArr.push({ ay: ayat[i], tr: trans[i] })
        }

        setQuranData(quranArr);
        console.log(quranArr);
    }, [])

    const surahFilter = (filter, obj) => {
        return new Promise((resolve, reject) => {
            resolve(
                obj.filter((surah) => {
                    return surah.ay.number ===filter;
                })[0]
            )
        });
    }

    const setToState = (surah) => {
        console.log(surah)
        return new Promise((resolve, reject) => {
            props.setSurahLength(surah.ay.ayahs.length);
            setAyatArr(surah.ay.ayahs);
            setTransArr(surah.tr.ayahs);
            resolve(true)
        });
    }

    const scrollToAyat = (ayatCurrent) => {
        if (ayatCurrent < 1) ayatCurrent = 1;
        if (ayatCurrent > 1) {
            var ayatElem = document.getElementById("ayat-" + ayatCurrent);
            if (ayatElem !==null)
                ayatElem.scrollIntoView({ behavior: 'auto' });
            var scrolledY = window.scrollY;
            if (scrolledY) {
                window.scroll(0, scrolledY - 99);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }

    function fetchAyat() {
        console.log(quranData)
        surahFilter(surahId, quranData)
            .then(surah => setToState(surah))
            .then(status => {
                if (status) {
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                    setTimeout(() => {
                        scrollToAyat(ayatScroll)
                    }, 2000)
                }
            });
    }

    useEffect(() => {
        setSurahId(surah)
    }, [surah]);

    useEffect(() => {
        setLoading(true);
        if (quranData.length !== 0) {
            fetchAyat();
        }
    }, [surahId, quranData])

    // const baseUrl = "https://api.alquran.cloud/v1/";

    // const url = () => {
    //     switch (type) {
    //         case 'surah':
    //             var url = baseUrl + "surah/" + surah + "/editions/quran-simple-enhanced,id.indonesian";
    //             return url;
    //     }
    // };

    // useEffect(() => {
    //     async function fetchAyat() {
    //         setLoading(true);
    //         // alert('fetch is called')
    //         const res = await fetch(url())
    //         res
    //             .json()
    //             .then(res => {
    //                 const ayah = res.data[0].ayahs;
    //                 const trans = res.data[1].ayahs;
    //                 var ayatArr = [];
    //                 for (let i = 0; i < ayah.length; i++) {
    //                     ayatArr.push({ ay: ayah[i], tr: trans[i] })
    //                 }
    //                 console.log(ayatArr)
    //                 setAyatArr(ayatArr);
    //                 setLoading(false)
    //             })
    //             .catch(err => console.error(err))
    //     }
    //     fetchAyat();
    // }, [surahId]);

    const ayatContent = () => {
        if (isLoading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div>
                    <Bismillah surah={surah} />
                    {
                        ayatArr.map((ayat, index) => (
                            <Ayat id={"ayat-" + ayat.numberInSurah} surah={surah} key={index} ayat={{
                                numberInSurah: ayat.numberInSurah,
                                text: ayat.text,
                                trans: transArr[index].text
                            }} />
                        ))
                    }
                </div>
            )
        }
    }

    return (
        <List className={classes.root}>
            {
                ayatContent()
            }
        </List>
    );
}

export default SurahCont;