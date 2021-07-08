import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import 'react-h5-audio-player/lib/styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

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
