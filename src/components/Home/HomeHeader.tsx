import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {decrementGrade, incrementGrade} from "../../BLL/gradeSlice";
import s from './home.module.css'

const GRADES_COUNT = 2
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function HomeHeader({signOut}: any) {
    const userPhotoURL = useSelector((state: any) => state.firebase.user.photoURL)
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

    const gradeNum = useSelector((state: any) => state.grade)
    const dispatch = useDispatch()

    const increment = () => {
        if (gradeNum < GRADES_COUNT) {
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
            <Container sx={{width: '100%', maxWidth: 1600}}>
                <Box className={s.header}>
                    <Box sx={{display: {xs: 'none', sm: 'flex'}}} className={s.logoContainer}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="a"
                            href="/"
                            sx={{fontFamily: 'Cunia'}}
                            className={s.logo}
                        >
                            M4FS
                        </Typography>
                    </Box>

                    <Box className={s.grade}>
                        <button onClick={decrement}> - </button>
                        <span> {gradeNum} </span>
                        <button onClick={increment}> + </button>
                    </Box>

                    <Box className={s.profile}>
                        <NavLink to={'/shop'}>
                            <span className={s.money}>
                                {money}<span className={s.dollar}>$</span>
                            </span>
                        </NavLink>
                        <button onClick={signOut} className={s.signOut}>
                            Sign out
                        </button>
                        <IconButton onClick={handleOpenUserMenu} className={s.icon}>
                            <Avatar alt="AA" src={userPhotoURL}/>
                        </IconButton>
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
                </Box>
            </Container>
        </AppBar>
    );
}

export default HomeHeader;
