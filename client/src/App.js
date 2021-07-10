import { Box, Center, LinkBox, LinkOverlay } from '@chakra-ui/layout'
import React from 'react'
import { Link as Navigate, Route, Switch } from 'react-router-dom'
import useState from 'react-usestateref'
import { reactLocalStorage } from 'reactjs-localstorage'
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
 const [changeNav, setChangeNav] = React.useState(false)
 const [authorized, setAuthorized, ref] = useState(false)
 const [item, setItem] = React.useState(reactLocalStorage.get('token'))
 const date = new Date().getSeconds()

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
     console.error(err.response.message)
     reactLocalStorage.remove('token')
    })

   setChangeNav(true)
  }
 }, [
  setAuthorized,
  item,
  window.location.pathname,
  reactLocalStorage.get,
  reactLocalStorage.remove,
 ])

 //  Protect users{headers: {

 return (
  <React.Fragment key={date}>
   {!changeNav && <Nav />}

   <Switch key={date}>
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
     <React.Fragment>
      <Route exact path="/dashboard">
       <Dashboard />
      </Route>

      <Route exact path="/dashboard/:params">
       <Dashboard key={uniqid()} />
      </Route>
     </React.Fragment>
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
  </React.Fragment>
 )
}
export default App
