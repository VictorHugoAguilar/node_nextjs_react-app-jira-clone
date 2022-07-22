import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack'
import { UIContext, UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';
import { lightTheme, darkTheme } from '../theme';

import '../styles/globals.css'
import { useContext } from 'react';
import { showLogs } from '../utils';

function MyApp({ Component, pageProps }: AppProps) {

  const { themeMode } = useContext(UIContext);

  showLogs('info', 'DarkMode is', themeMode);

  return (
    <SnackbarProvider maxSnack={3} >
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={themeMode === 'lightMode' ? lightTheme : darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider >
  )
}

export default MyApp
