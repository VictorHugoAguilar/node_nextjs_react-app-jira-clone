import type { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack'
import { UIContext, UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';
import { lightTheme, darkTheme } from '../theme';

import '../styles/globals.css'
import { useContext, useEffect, useState } from 'react';
import { showLogs } from '../utils';
import Cookies from 'js-cookie';

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps, theme = 'darkMode' }: Props) {

  // const { themeMode } = useContext(UIContext);

  // showLogs('info', 'DarkMode is', themeMode);

  // showLogs('info', 'theme is', theme);

  // const currentTheme = themeMode === 'darkMode' ? darkTheme : lightTheme;

  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'lightMode';
    const selectedTheme = cookieTheme === 'lightMode' ? lightTheme : darkTheme;
    setCurrentTheme(selectedTheme);
    showLogs('info', '[MyApp] Theme is:', cookieTheme);
  }, []);

  return (
    <SnackbarProvider maxSnack={3} >
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider >
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const theme = appContext.ctx.req ? (appContext.ctx.req as any).cookies : Cookies.get('theme');

//   showLogs('info', 'Theme is', theme);

//   const validTheme = ['lightMode', 'darkMode'];

//   return {
//     theme: validTheme.includes(theme) ? theme : 'darkMode'
//   }

// }

export default MyApp
