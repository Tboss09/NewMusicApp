import { Button } from '@chakra-ui/button'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import React from 'react'
const Search = ({ setSearchEvent, setIndex }) => {
 const [search, setSearch] = React.useState('Song')
 const [index, setSearchIndex] = React.useState(null)
 const [text, setText] = React.useState('')
 const handleChange = React.useCallback(
  e => {
   setText(e.target.value)
   setSearchEvent(text)
   setIndex(index)
  },
  [text, index]
 )
 return (
  <Stack
   direction={['row']}
   align="center"
   justifyContent="center"
   maxW="lg"
   flex="1"
  >
   <Input
    onChange={handleChange}
    placeholder="Search by Song or Author"
    size="md"
    w="70%"
   />
   <Menu w="10%">
    <MenuButton
     as={Button}
     rightIcon={<ChevronDownIcon />}
     size="md"
     variant="solid"
    >
     {search}
    </MenuButton>
    <MenuList >
     <MenuItem
      onClick={e => {
       setSearch(e.target.textContent)
       setSearchIndex(0)
      }}
     >
      Song
     </MenuItem>
     <MenuItem
      onClick={e => {
       setSearch(e.target.textContent)
       setSearchIndex(1)
      }}
     >
      Author
     </MenuItem>
    </MenuList>
   </Menu>
  </Stack>
 )
}

export default Search
