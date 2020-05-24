import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import Book from '@material-ui/icons/Book';
import { Link } from 'react-router-dom';
import Content from './ContentComp';
import Theme from './ThemeComp';
import { ThemeProvider } from '@material-ui/core/styles';

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
    img: {
        width: "30px",
        marginRight: "10px"
    }
}));

export default function MainComp() {
    const classes = useStyles();
    const theme = useTheme();
    const urlArr = window.location.pathname.split("/");
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState(urlArr[1]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onItemClick = title => () => {
        setOpen(!open);
        setTitle(title);
    }

    const ListMenu = [
        { name: 'Beranda', icon: Home, url: '' },
        { name: 'Baca Surah', icon: Book, url: 'surah' }
    ];

    return (
        <ThemeProvider theme={Theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                    title={<img src="/assets/logo-white.png" />}
                >
                    <Toolbar className={clsx(classes.toolbarq)}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src="/assets/logo-white.png" className={classes.img} width="30"/>
                        <Typography variant="h6" noWrap>
                            Quran Web
                        </Typography>
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
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
            </div>
        </ThemeProvider>

    );
}
