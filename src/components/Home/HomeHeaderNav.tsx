import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import grades from "../../lessons/grades";
import {decrementGrade, incrementGrade} from "../../BLL/gradeSlice";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HomeHeaderNav({signOut}: any) {
    const isAuth = useSelector((state: any) => state.user.isAuth)
    const money = useSelector((state: any) => state.money)

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const gradeNum = useSelector( (state: any) => state.grade)
    const dispatch = useDispatch()

    const increment = () => {
        if (gradeNum < grades.length) {
            dispatch(incrementGrade())
        }
    }
    const decrement = () => {
        if (gradeNum > 1) {
            dispatch(decrementGrade())
        }
    }

    return (
        <AppBar position="fixed">
            <Container sx={{maxWidth: "1200px", width: "100%"}}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        M4FS
                    </Typography>
                    <button onClick={signOut}>
                        Sign out
                    </button>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}/>

                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <div style={{marginBottom: 20}}>
                            <button onClick={decrement}> -</button>
                            <span> {gradeNum} </span>
                            <button onClick={increment}> +</button>
                        </div>
                    </Box>

                    <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{my: 2, color: 'white', display: 'block'}}
                        >
                            <NavLink to={'/shop'}>
                                {"Shop " + money + "$"}
                            </NavLink>
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            {isAuth
                                ? <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                                : <NavLink to={"/login"}> Log in </NavLink>}
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <NavLink to={"/profile"}> Profile </NavLink>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    <NavLink to={"/settings"}> Settings </NavLink>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default HomeHeaderNav;
