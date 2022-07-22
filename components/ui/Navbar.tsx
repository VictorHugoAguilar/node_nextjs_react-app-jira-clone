import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";

import { AppBar, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { UIContext } from "../../context/ui";
import { showLogs } from "../../utils";
import Cookies from 'js-cookie';
import Router from "next/router";

export const Navbar = () => {
    const { openSideMenu } = useContext(UIContext);

    const [currentTheme, setCurrentTheme] = useState(Cookies.get('darkMode'));
    // const { setThemeMode } = useContext(UIContext);

    const handleChangeTheme = () => {
        showLogs('info', 'Changing theme to', currentTheme);

        Cookies.set('darkMode', Cookies.get('darkMode') === 'true' ? 'false' : 'true');
        localStorage.setItem('darkMode', localStorage.getItem('darkMode') === 'true' ? 'false' : 'true');
        setCurrentTheme(currentTheme === 'true' ? 'false' : 'true');
        showLogs('info', '[handleChangeTheme] Changing to theme to darkMode:', currentTheme);

        // if (currentTheme) {
        // } if (currentTheme == 'darkMode') {
        //     Cookies.set('theme', 'darkMode');
        //     localStorage.setItem('theme', 'darkMode');
        //     setCurrentTheme('darkMode');
        //     showLogs('info', '[handleChangeTheme] Changing to theme:', 'darkMode');
        // }
        // setThemeMode(currentTheme);
        // Router.reload();

    }

    useEffect(() => {
        showLogs('info', '[useEffect] Theme is:', localStorage.getItem('darkMode'));
    }, [currentTheme]);

    const getMode = () => {
        showLogs('info', '[getMode] Theme is:', currentTheme);

        const darkTheme = Cookies.get('darkMode') == 'true' ? true : false;
        showLogs('info', '[getMode] Theme in darkTheme is:', darkTheme);

        return darkTheme ? (<LightModeIcon />) : (<DarkModeIcon />);
    }

    return (
        <AppBar position="sticky" >
            <Grid container display={'flex'} justifyContent={'space-between'}>
                <Grid item>
                    <Toolbar >
                        <IconButton
                            size="large"
                            edge='start'
                            onClick={() => { openSideMenu() }}
                        >
                            <MenuOutlinedIcon />
                        </IconButton>

                        <NextLink
                            href="/"
                            passHref
                        >
                            <Link
                                underline="none"
                                color='white'
                            >
                                <Typography
                                    variant="h6"
                                >
                                    OpenJira
                                </Typography>
                            </Link>
                        </NextLink>
                    </Toolbar>
                </Grid>
                <Grid item
                    display={'flex'}
                    justifyContent={'center'}
                    alignContent={'center'}
                    alignItems={'center'}
                    sx={{
                        marginRight: '1rem'
                    }}
                >
                    <IconButton
                        size="medium"
                        edge='start'
                        onClick={() => { handleChangeTheme() }}
                    >
                        {
                            getMode()
                        }
                    </IconButton>
                </Grid>
            </Grid>
        </AppBar>
    )
}


