import { Box, Center, LinkBox, LinkOverlay } from '@chakra-ui/layout'
import React from 'react'
import { Link as Navigate, Route, Switch, useLocation } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import useState from 'react-usestateref'
import 'tachyons'
import uniqid from 'uniqid'
import Admin from './admin/Admin'
import Dashboard from './admin/Dashboard'
import axios from './axios/axiosConfig'
import Footer from './components/footer/Footer'
import Nav from './components/navigation/Nav'
import About from './container/about/About'
import Contact from './container/contact/Contact'
import Home from './container/home/Home'
import Music from './container/Music/Music'

const App = () => {
 const location = useLocation().pathname
 const [changeNav, setChangeNav] = React.useState(false)
 const [authorized, setAuthorized, ref] = useState(false)
 const [item] = useLocalStorage('token', '')

 React.useEffect(() => {
  if (
   window.location.pathname === '/dashboard/uploadsong' ||
   window.location.pathname === '/dashboard/home' ||
   window.location.pathname === '/dashboard'
  ) {
   axios
    .get('/verifyUser', {
     headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${item}`,
     },
    })
    .then(res => {
     console.log(res)
     setAuthorized(true)
    })
    .catch(err => {
     setAuthorized(false)
    })

   setChangeNav(true)
  }
 }, [setAuthorized, item])

 //  Protect users{headers: {

 React.useEffect(() => {
  if (
   window.location.pathname === '/dashboard/uploadsong' ||
   window.location.pathname === '/dashboard/home' ||
   window.location.pathname === '/dashboard'
  ) {
  }

  return
 }, [window.location.pathname])

 return (
  <>
   {!changeNav && <Nav />}

   <Switch>
    <Route exact path="/">
     <Home />
    </Route>

    <Route exact path="/music">
     <Music />
    </Route>

    <Route exact path="/contact">
     <Contact />
    </Route>

    <Route exact path="/about">
     <About />
    </Route>

    <Route exact path="/admin">
     <Admin />
    </Route>

    {ref.current ? (
     <>
      <Route exact path="/dashboard">
       <Dashboard />
      </Route>

      <Route exact path="/dashboard/:params">
       <Dashboard key={uniqid()} />
      </Route>
     </>
    ) : (
     <Center h={{ base: '300px', md: '300px', lg: '500px' }}>
      <LinkBox
       maxW="container.md"
       bg="gray.100"
       mx="auto"
       p="5"
       borderWidth="1px"
       rounded="md"
      >
       <Box fontSize="lg">
        You need to be
        <LinkOverlay
         px="2"
         as={Navigate}
         to="/admin"
         color="blue"
         fontWeight="500"
        >
         Logged in
        </LinkOverlay>
        to access this page
       </Box>
      </LinkBox>
     </Center>
    )}
   </Switch>

   {!changeNav && <Footer />}
  </>
 )
}
export default App
