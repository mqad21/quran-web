import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Slide, AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import DialogPopup from './DialogPopupComp';
import Context from '../store/context';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        background: 'linear-gradient(to right top, #01f847, #26f455, #38f062, #46eb6c, #52e776, #43e485, #36e192, #2edd9e, #00d9b1, #00d4c1, #00cecd, #0dc8d4);',
        color: "white",

    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function DialogPage(props) {
    const classes = useStyles();

    const { openDialog, handleCloseDialog, type } = props;
    const [openPopup, setOpenPopup] = React.useState(false);
    const [typePopup, setTypePopup] = React.useState("fontSize");
    const { state } = useContext(Context);

    const getFontSizeType = (fontSize) => {
        var fontText;
        if (fontSize <= 0.8) fontText = 'Kecil';
        else if (fontSize <= 1.1) fontText = 'Sedang';
        else fontText = 'Besar';
        fontText += ` (${Math.round(fontSize * 100)}%)`;
        return fontText;
    }

    const handleSettingMenu = (menu) => {
        switch (menu) {
            case "fontSize":
                setTypePopup("fontSize");
                break;
            case "darkMode":
                setTypePopup("darkMode");
                break;
            default:
                return;
        }
        setOpenPopup(true);
    }

    const content = () => {
        var title, body = null;
        switch (type) {
            case 'settings':
                title = 'Pengaturan';
                body = (
                    <List>
                        <ListItem>
                            <ListItemText primary="Ukuran Font" secondary={getFontSizeType(state.fontSize)} onClick={() => handleSettingMenu("fontSize")} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Mode Gelap" secondary={state.darkMode ? 'Aktif' : 'Tidak Aktif'} onClick={() => handleSettingMenu("darkMode")} />
                        </ListItem>
                    </List>
                );
                break;
            default: 
                return;
        }
        return {
            title: title,
            body: body
        }
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
    }

    return (
        <Dialog fullScreen open={openDialog} onClose={handleCloseDialog} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {content().title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <DialogPopup open={openPopup} onClose={handleClosePopup} type={typePopup} />
            {content().body}
        </Dialog>

    )
}