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
import {useState} from "react";
import ProfileModal from "../Profile/ProfileModal";

const GRADES_COUNT = 2
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header({signOut}: any) {
    const avatar = useSelector((state: any) => state.userData.avatarUrl)
    const money = useSelector((state: any) => state.money)
    const streak = useSelector((state: any) => state.streak)
    const stars = useSelector((state: any) => state.stars)

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

    const [showProfile, setShowProfile] = useState(false)
    const handleOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
        setShowProfile(true)
    };

    const profileProps = {showProfile, setShowProfile, signOut}

    return (
        <AppBar position="fixed" style={{backgroundColor: 'var(--main-color)'}}>

            {showProfile && <ProfileModal {...profileProps} />}

            <Container sx={{width: '100%', maxWidth: 1600}}>
                <Box className={s.header}>
                    <Box className={s.logoContainer}>
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
                        <button onClick={decrement}> -</button>
                        <span> {gradeNum} </span>
                        <button onClick={increment}> +</button>
                    </Box>

                    <Box className={s.headerStreak} sx={{display: {xs: 'flex', md: 'none'}}}>
                        <span>{streak.streakIsIncrementable ? '🕔 ' : '🔥 '}{streak.streak}</span>
                        <span className={s.stars}>⭐ {stars}</span>
                    </Box>

                    <Box className={s.profile}>
                        {/*<NavLink to={'/shop'}>*/}
                        <span className={s.money}>
                                {money}<span className={s.dollar}>$</span>
                            </span>
                        {/*</NavLink>*/}
                        <button onClick={signOut} className={s.signOut}>
                            Sign out
                        </button>
                        <Avatar alt="AA" src={avatar} onClick={handleOpenProfile} className={s.avatar}/>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                    <span onClick={signOut}>
                                        Sign out
                                    </span>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </AppBar>
    );
}

export default Header;
