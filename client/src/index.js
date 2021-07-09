import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-h5-audio-player/lib/styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'
const twentyFourHoursInMs = 60 * 1000;
const queryClient =  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });
ReactDOM.render(
 <Router>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
   <ChakraProvider>
     <App />
   </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
 </Router>,
 document.getElementById('root')
)
