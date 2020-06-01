import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemText, ListItemIcon, Menu, MenuItem, Snackbar } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft, ChevronRight, Book, LibraryBooks, Info, MoreVert, Close } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Content from './ContentComp';
import DialogPage from './DialogPageComp';
import Context from '../store/context';
// import { green } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    toolbarq: {
        background: 'linear-gradient(to right top, #01f847, #26f455, #38f062, #46eb6c, #52e776, #43e485, #36e192, #2edd9e, #00d9b1, #00d4c1, #00cecd, #0dc8d4);',
        color: "white",
    },
    toolbarButtons: {
        marginLeft: 'auto'
    },
    img: {
        width: "30px",
        marginRight: "10px"
    }
}));

export default function MainComp() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openToolbar = Boolean(anchorEl);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [typeDialog, setTypeDialog] = React.useState("settings");
    const { state, actions } = useContext(Context);
    const [snackbarMsg, setSnackbarMsg] = React.useState("");
    const [openSnack, setOpenSnack] = React.useState(false);
    const [isSavedAyat, setIsSavedAyat] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onItemClick = title => () => {
        setOpen(!open);
        setTitle(title);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false)
    };

    const ListMenu = [
        { name: 'Baca Surah', icon: LibraryBooks, url: 'surah' },
        { name: 'Baca Juz', icon: Book, url: 'juz' },
        { name: 'Tentang', icon: Info, url: 'tentang' }
    ];

    React.useEffect(() => {
        const urlArr = window.location.href.split("/");
        setTitle(urlArr[4]);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetting = () => {
        handleClose();
        setTypeDialog("settings");
        setOpenDialog(true);
    };

    const showSnack = (message) => {
        actions({
            type: 'setState', payload: {
                ...state, snack: {
                    open: true,
                    message: message
                }
            }
        });
    }

    const closeSnack = () => {
        actions({
            type: 'setState', payload: {
                ...state, snack: {
                    open: false,
                    message: ""
                }
            }
        });
    }

    React.useEffect(() => {
        showSnack("Berhasil menandai ayat!")
        setTimeout(() => {
            closeSnack();
        }, 500)
    }, [state.savedSurah]);

    const handleToSaved = () => {
        actions({
            type: 'setState', payload: {
                ...state, scrollTo: true
            }
        });
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar className={clsx(classes.toolbarq)}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => handleDrawerOpen()}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={process.env.PUBLIC_URL + "/assets/logo-white.png"} className={classes.img} width="30" />
                    <Typography variant="h6" noWrap>
                        Quran Web
                        </Typography>
                    <div className={classes.toolbarButtons}>
                        <IconButton aria-label="display more actions" edge="end" aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => handleMenu(e)} color="inherit">
                            <MoreVert />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={openToolbar}
                            onClose={() => handleClose()}
                        >
                            <MenuItem onClick={handleSetting}>Pengaturan</MenuItem>
                            <MenuItem onClick={handleToSaved} component={Link} to={`/surah/${state.savedSurah.surah}`}>Ke Penanda Ayat</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {ListMenu.map((menu, index) => (
                        <ListItem button key={index} component={Link} to={"/" + menu.url} onClick={onItemClick(menu.url)} selected={title === menu.url}>
                            <ListItemIcon><menu.icon /></ListItemIcon>
                            <ListItemText primary={menu.name} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Content />
            <DialogPage openDialog={openDialog} handleCloseDialog={handleCloseDialog} type={typeDialog} />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={state.snack.open}
                message={state.snack.message}
                autoHideDuration={200}
            />
        </div>
    );
}
