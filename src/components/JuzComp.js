import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import Ayat from './AyatComp';
import { makeStyles } from '@material-ui/core/styles';
import Loading from './LoadingComp';
import Bismillah from './BismillahComp';
import AyatJSON from '../json/quran-simple.json';
import TransJSON from '../json/translation.json';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2),
        marginBottom: '1px',
        paddingRight: '0',
        minHeight: '100vh'
    },
    hide: {
        display: 'none'
    }
}));

function JuzCont(props) {
    const classes = useStyles();
    const [juzArr, setJuzArr] = useState([]);
    const { juz } = props;
    const [juzId, setJuzId] = useState(1);
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
    }, [])

    const juzFilter = (filter, obj) => {
        return new Promise((resolve, reject) => {
            var ayatsSelected = [];
            var transSelected = [];
            var surahId = [];
            var juzLength = 0;
            var ayatArr = [];
            for (var i = 0; i < obj.length; i++) {
                var ayats = obj[i].ay.ayahs.filter((ay) => {
                    return ay.juz == filter;
                });
                juzLength += ayats.length;
                ayatsSelected.push(ayats);
                var trans = obj[i].tr.ayahs.filter((tr) => {
                    return tr.juz == filter;
                });
                transSelected.push(trans);
                if (ayats.length !== 0) surahId.push(obj[i].ay.number);
                ayats.forEach((ay) => {
                    ayatArr.push(ay.numberInSurah)
                });
            }
            ayatsSelected = ayatsSelected.filter(ay => {
                return ay.length !== 0;
            });
            transSelected = transSelected.filter(tr => {
                return tr.length !== 0;
            });
            var juzSelected = {
                ay: ayatsSelected,
                tr: transSelected,
                length: juzLength,
                surahId: surahId,
                ayatArr: ayatArr
            };
            resolve(juzSelected);
        });
    }

    const setToState = (juz) => {
        return new Promise((resolve, reject) => {
            props.setJuzLength(juz.length);
            props.setAyatArr(juz.ayatArr);
            setJuzArr(juz);
            console.log(juz)
            resolve(true)
        });
    }

    function fetchAyat() {
        juzFilter(juzId, quranData)
            .then(juz => setToState(juz))
            .then(status => {
                if (status) {
                    setLoading(false)
                }
            });
    }

    useEffect(() => {
        setJuzId(juz)
    }, [juz]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (quranData.length !== 0) {
                fetchAyat();
            }
        }, 500)
    }, [juzId, quranData])

    const surahContent = (surahId, ayatArr, transArr, hide, firstIdx) => {

        return (
            <div>
                <div className={clsx({ [classes.hide]: hide })}>
                    <Bismillah surah={surahId} />
                </div>
                {
                    ayatArr.map((ayat, index) => {
                        const idx = ayat.number - firstIdx + 1;
                        return (
                            <Ayat id={"ayat-" + idx} surah={surahId} key={index} ayat={{
                                numberInSurah: ayat.numberInSurah,
                                text: ayat.text,
                                trans: transArr[index].text
                            }} />
                        )
                    })
                }
            </div >
        )
    }

    const ayatContent = () => {
        if (isLoading) {
            return (
                <Loading />
            )
        } else {
            return (
                <div>
                    {
                        juzArr.ay.map((juz, index) => {
                            if (juz[0].numberInSurah !== 1) var hide = true;
                            var firstIdx = juzArr.ay[0][0].number;
                            return surahContent(juzArr.surahId[index], juz, juzArr.tr[index], hide, firstIdx);
                        })
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

export default JuzCont;