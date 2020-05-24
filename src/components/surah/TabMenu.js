import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import TabPanel from './TabPanel';
import SurahList from '../../json/surah.json';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        zIndex: '0',
        position: 'sticky',
        top: '56px'
    },
}));

export default function TabMenu(props) {
    const classes = useStyles();

    const { surahSelected } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="white">
                <Tabs
                    value={surahSelected - 1}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {
                        SurahList.map((surah, index) => (
                            <Tab label={surah.nama} component={Link} to={(index + 1).toString()} selected={true} />
                        ))
                    }
                </Tabs>
            </AppBar>
            <TabPanel />
        </div>
    );
}
