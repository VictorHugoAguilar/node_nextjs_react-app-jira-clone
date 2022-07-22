import { useContext, useState } from "react";
import NextLink from "next/link";

import { AppBar, Grid, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';

import { UIContext } from "../../context/ui";
import { showLogs } from "../../utils";


export const Navbar = () => {
    const { openSideMenu } = useContext(UIContext);

    const [currentTheme, setCurrentTheme] = useState('darkMode');
    const { setThemeMode } = useContext(UIContext);

    const handleChangeTheme = () => {
        if (currentTheme === 'darkMode') {
            setCurrentTheme('lightMode');
        } else {
            setCurrentTheme('darkMode');
        }
        setThemeMode(currentTheme);
        showLogs('info', 'Changing to theme:', currentTheme);
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
                            currentTheme === 'darkMode' ?
                                <NightlightIcon /> :
                                <LightModeIcon />
                        }
                    </IconButton>
                </Grid>
            </Grid>
        </AppBar>
    )
}