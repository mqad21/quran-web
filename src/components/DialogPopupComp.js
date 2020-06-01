import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Slider, Grid, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import { FontDownloadOutlined, Brightness7, Brightness4 } from '@material-ui/icons';
import Context from '../store/context';


export default function DialogPopup(props) {
    const { state, actions } = useContext(Context);
    const { onClose, open, type } = props;
    const [fontSize, setFontSize] = React.useState(state.fontSize);
    const [darkMode, setDarkMode] = React.useState(state.darkMode);

    const handleClose = () => {
        actions({ type: 'setState', payload: { ...state, fontSize: fontSize, darkMode: darkMode } });
        onClose();
    };

    const handleFontSize = (event, value) => {
        setFontSize(value)
    };

    const handleDarkMode = (event, value) => {
        setDarkMode(value);
    }

    const content = () => {
        var title, body = null;
        switch (type) {
            case 'fontSize':
                title = 'Ukuran Font';
                body = (
                    <DialogContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <FontDownloadOutlined fontSize="small" />
                            </Grid>
                            <Grid item xs>
                                <Slider
                                    value={fontSize}
                                    onChange={handleFontSize}
                                    aria-labelledby="input-slider"
                                    step={0.01}
                                    min={0.8}
                                    max={1.2}
                                />
                            </Grid>
                            <Grid item>
                                <FontDownloadOutlined fontSize="large" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                );
                break;
            case 'darkMode':
                title = 'Dark Mode';
                body = (
                    <DialogContent>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox icon={<Brightness7 />}
                                    checked={darkMode}
                                    checkedIcon={<Brightness4 />} name="darkMode" onChange={handleDarkMode} />}
                                label={darkMode ? 'Aktif' : "Tidak Aktif"}
                            />
                        </FormGroup>
                    </DialogContent>
                )
        }
        return {
            title: title,
            body: body
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true}>
            <DialogTitle id="simple-dialog-title">{content().title}</DialogTitle>
            {content().body}
        </Dialog>
    );
}