import {
 Avatar,
 Box,
 Collapse,
 Drawer,
 DrawerContent,
 DrawerOverlay,
 Flex,
 Icon,
 IconButton,
 Input,
 InputGroup,
 InputLeftElement,
 Text,
 useColorModeValue,
 useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { FaBell, FaRss } from 'react-icons/fa'
import { FiMenu, FiSearch, FiUploadCloud } from 'react-icons/fi'
import { HiCode } from 'react-icons/hi'
import { MdHome, MdKeyboardArrowRight } from 'react-icons/md'
import { NavLink as Navigate, useParams } from 'react-router-dom'
import ProtectedRoute from '../../../axios/ProtectedRoute'
import UploadSong from '../../Upload/UploadNewSong'

export default function Swibc() {
 const sidebar = useDisclosure()
 const integrations = useDisclosure()
 const [location, setLocation] = React.useState({
  home: false,
  upload: false,
 })

 let { params } = useParams()

 //  Changes content of div based on params
 React.useEffect(() => {
  params === 'uploadsong' && setLocation({ upload: true })
  params === 'home' && setLocation({ home: true })
  return () => {
   setLocation({
    home: false,
    upload: false,
   })
  }
 }, [params])

 const NavItem = props => {
  const { icon, children, ...rest } = props
  return (
   <Flex
    align="center"
    px="4"
    pl="4"
    py="3"
    cursor="pointer"
    color={useColorModeValue('inherit', 'gray.400')}
    _hover={{
     bg: useColorModeValue('gray.100', 'gray.900'),
     color: useColorModeValue('gray.900', 'gray.200'),
    }}
    role="group"
    fontWeight="semibold"
    transition=".15s ease"
    {...rest}
   >
    {icon && <Icon mr="2" boxSize="4" as={icon} />}
    {children}
   </Flex>
  )
 }

 const SidebarContent = props => (
  <Box
   as="nav"
   pos="fixed"
   top="0"
   left="0"
   zIndex="sticky"
   h="full"
   pb="10"
   overflowX="hidden"
   overflowY="auto"
   bg={useColorModeValue('white', 'gray.800')}
   borderColor={useColorModeValue('inherit', 'gray.700')}
   borderRightWidth="1px"
   w="60"
   {...props}
  >
   <Flex px="4" py="5" align="center">
    <Text
     fontSize="2xl"
     ml="2"
     color={useColorModeValue('brand.500', 'white')}
     fontWeight="semibold"
    >
     Dashboard
    </Text>
   </Flex>
   <Flex
    direction="column"
    as="nav"
    fontSize="sm"
    color="gray.600"
    aria-label="Main Navigation"
   >
    <NavItem icon={MdHome} as={Navigate} to="/dashboard/home">
     Home
    </NavItem>
    <NavItem icon={FaRss}>Articles</NavItem>
    <NavItem icon={FiUploadCloud} as={Navigate} to="/dashboard/uploadsong">
     Upload New Song
    </NavItem>
    <NavItem icon={HiCode} onClick={integrations.onToggle}>
     Integrations
     <Icon
      as={MdKeyboardArrowRight}
      ml="auto"
      transform={integrations.isOpen && 'rotate(90deg)'}
     />
    </NavItem>
    <Collapse in={integrations.isOpen}>
     <NavItem pl="12" py="2">
      Shopify
     </NavItem>
     <NavItem pl="12" py="2">
      Slack
     </NavItem>
     <NavItem pl="12" py="2">
      Zapier
     </NavItem>
    </Collapse>
   </Flex>
  </Box>
 )

 return (
     <ProtectedRoute>
  <Box as="section" bg={useColorModeValue('gray.50', 'gray.700')} minH="100vh">
   <SidebarContent display={{ base: 'none', md: 'unset' }} />
   <Drawer
    isOpen={sidebar.isOpen}
    onClose={sidebar.onClose}
    placement="left"
    size="sm"
   >
    <DrawerOverlay />
    <DrawerContent>
     <SidebarContent borderRight="none" />
    </DrawerContent>
   </Drawer>
   <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
    <Flex
     as="header"
     align="center"
     justify="space-between"
     w="full"
     px="4"
     bg={useColorModeValue('white', 'gray.800')}
     borderBottomWidth="1px"
     borderColor={useColorModeValue('inherit', 'gray.700')}
     h="14"
    >
     <IconButton
      aria-label="Menu"
      display={{ base: 'inline-flex', md: 'none' }}
      onClick={sidebar.onOpen}
      icon={<FiMenu />}
      size="sm"
     />
     <InputGroup w="96" display={{ base: 'none', md: 'flex' }}>
      <InputLeftElement color="gray.500" children={<FiSearch />} />
      <Input placeholder="Search for articles..." />
     </InputGroup>

     <Flex align="center">
      <Icon color="gray.500" as={FaBell} cursor="pointer" />
      <Avatar
       ml="4"
       size="sm"
       name="anubra266"
       src="https://avatars.githubusercontent.com/u/30869823?v=4"
       cursor="pointer"
      />
     </Flex>
    </Flex>

    <Box as="main" p="4">
     {location.upload && <UploadSong />}
     {/* {location.upload && <UploadTest />}  */}
     {location.home && 'Home here'}
    </Box>
   </Box>
  </Box>
  </ProtectedRoute>

 )
}
