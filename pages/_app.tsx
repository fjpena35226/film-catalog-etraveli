import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

import 'styles/globals.css'
import { AlertProvider } from 'src/context/alert.context'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
