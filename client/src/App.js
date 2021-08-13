import { Box, Center, LinkBox, LinkOverlay } from '@chakra-ui/layout'
import React from 'react'
import { Link as Navigate, Route, Switch, useLocation } from 'react-router-dom'
import useState from 'react-usestateref'
import { reactLocalStorage } from 'reactjs-localstorage'
import 'tachyons'
import uniqid from 'uniqid'
import Admin from './admin/Admin'
import Dashboard from './admin/Dashboard'
import Footer from './components/footer/Footer'
import Nav from './components/navigation/Nav'
import About from './container/about/About'
import Contact from './container/contact/Contact'
import Home from './container/home/Home'
import Music from './container/Music/Music'

const App = () => {
 const location = useLocation()
 const [changeNav, setChangeNav] = React.useState(null)
 React.useEffect(() => {
  if (
   location.pathname === '/admin' ||
   location.pathname === '/dashboard' ||
   location.pathname === '/dashboard/upload'
  ) {
   setChangeNav(true)
  } else {
   setChangeNav(false)
  }

  console.log(location)
 }, [location])

 //  Protect users{headers: {

 return (
  <React.Fragment>
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
    <Route exact path="/dashboard">
     <Dashboard />
    </Route>
    <Route exact path="/dashboard/:params">
     <Dashboard key={uniqid()} />
    </Route>
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
   </Switch>

   {!changeNav && <Footer />}
  </React.Fragment>
 )
}
export default App
