import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'styles/globals.css'
import { AlertProvider } from 'src/context/alert.context'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </QueryClientProvider>
  )
}

export default App
