import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack'
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';
import { lightTheme, darkTheme } from '../theme';

import { useEffect, useState } from 'react';
import { showLogs } from '../utils';
import Cookies from 'js-cookie';

import '../styles/globals.css'

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
    showLogs('info', '[MyApp] Theme is Cookies:', Cookies.get('darkMode'));
    showLogs('info', '[MyApp] Theme is localStorage:', localStorage.getItem('darkMode'));

    var cookieTheme = Cookies.get('darkMode');

    if (!cookieTheme)
      cookieTheme = localStorage.getItem('darkMode') || 'true';

    const selectedTheme = cookieTheme == 'true' ? darkTheme : lightTheme;
    setCurrentTheme(selectedTheme);

    showLogs('info', '[MyApp] Theme in selected is darkMode:', cookieTheme);

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//   const { theme = 'light', name = 'No name' } = req.cookies;
//   const validThemes = ['light','dark','custom'];


//   return {
//       props: {
//           theme: validThemes.includes( theme ) ? theme : 'dark',
//           name,
//       }
//   }
// }

export default MyApp
