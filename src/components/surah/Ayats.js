import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import axios from 'axios';
import Ayat from '../AyatComp';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '../LoadingComp';
import Bismillah from '../BismillahComp';
import AyatJSON from '../../json/quran-simple.json';
import TransJSON from '../../json/translation.json';

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

function Ayats(props) {
    const classes = useStyles();
    const [ayatArr, setAyatArr] = useState([]);
    const [transArr, setTransArr] = useState([]);
    const { type, surah } = props;
    const [surahId, setSurahId] = useState(surah);
    const [isLoading, setLoading] = useState(true)

    const ayat = AyatJSON.data.surahs;
    const trans = TransJSON.data.surahs;
    var quranArr = [];
    for (let i = 0; i < ayat.length; i++) {
        quranArr.push({ ay: ayat[i], tr: trans[i] })
    }
    console.log(quranArr)

    const setLoadingBar = (obj) => {
        return new Promise((resolve, reject) => {
            setLoading(true);
            resolve(obj)
        })
    }

    const surahFilter = (filter, obj) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    obj.filter((surah) => {
                        return surah.ay.number == filter;
                    })[0]
                )
            }, 500);
        })
    }

    const setToState = (surah) => {
        return new Promise((resolve, reject) => {
            console.log(surah)
            setAyatArr(surah.ay.ayahs);
            setTransArr(surah.tr.ayahs);
            resolve(true)
        })
    }

    function fetchAyat() {
        setLoadingBar(quranArr)
            .then(ayat => surahFilter(surah, ayat))
            .then(surah => setToState(surah))
            .then(status => {
                if (status) {
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        fetchAyat();
    }, [surahId]);

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

    useEffect(() => {
        setSurahId(surah)
    });

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
                        // ayatArr.map((ayat, index) => (
                        //     <Ayat key={index} ayat={{
                        //         numberInSurah: ayat.ay.numberInSurah,
                        //         text: ayat.ay.text,
                        //         trans: ayat.tr.text
                        //     }} />
                        // ))
                        ayatArr.map((ayat, index) => (
                            <Ayat key={index} ayat={{
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

export default Ayats;