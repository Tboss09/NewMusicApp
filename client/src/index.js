import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import ReactDOM from 'react-dom'
import App from './App'
import 'react-h5-audio-player/lib/styles.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.render(
 <Router>
  <React.StrictMode>
   <ChakraProvider>
    <QueryClientProvider client={queryClient}>
     <App />
    </QueryClientProvider>
   </ChakraProvider>
  </React.StrictMode>
 </Router>,
 document.getElementById('root')
)
