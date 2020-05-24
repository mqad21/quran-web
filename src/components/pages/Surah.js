import React from 'react';
import { Typography } from "@material-ui/core";
import TabMenu from '../surah/TabMenu';
import TabPanel from '../surah/TabPanel';
import Ayats from '../surah/Ayats';

function Surah(props) {
    const { surah } = props;

    return (
        <Typography paragraph>
            <TabMenu surahSelected={surah} />
            <TabPanel>
                <Ayats type="surah" surah={props.surah} />
            </TabPanel>
        </Typography>
    );
}

export default Surah;