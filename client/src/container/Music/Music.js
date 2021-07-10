import { Box, Heading, SimpleGrid, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import useState from 'react-usestateref'
import MusicContainer from './MusicBox/MusicContainer'
import Search from './SearchBar/Search'
import { useQuery } from 'react-query'
import axios from '../../axios/axiosConfig'
import IsLoading from './DataState/IsLoading'
import Error from './DataState/Error'
const Music = () => {
 const [search, setSearchEvent] = useState('')
 const [index, setIndex] = useState(null)
 const getAllSongs = React.useCallback(async () => {
  const { data } = await axios.get('/allSongs')
  return data.data
 }, [])

 const { isLoading, error, data } = useQuery('create', getAllSongs)

 // This makes sure the gotten data is not undefined before assigning it to the variable
 const fetchedData =
  data !== undefined && data[0] !== undefined && data[0].songs

 if (isLoading) {
  return (
   <Box>
    <IsLoading />
   </Box>
  )
 }

 if (error) {
  return (
   <Box>
    <Error error={error} />
   </Box>
  )
 }
 // This makes sure the gotten data is not undefined before assigning it to the variable

 console.log(search)

 return (
  // Search for songs
  <Box mx="auto" w={['90%', '95%', '95%', '95%']} mb="32" mt="24">
   <Stack direction={['column', 'row']} pt="12">
    {/* <Heading fontSize="lg">All Music</Heading>
    <Spacer />
    <Search
     setSearchEvent={search => setSearchEvent(search)}
     setIndex={index => setIndex(index)}
    /> */}
   </Stack>
   {/* // Search for songs */}
   <SimpleGrid
    mt="12"
    columns={[1, 2, 2, 3]}
    spacing={10}
    alignItems="center"
    justifyContent="center"
   >
    {/* Arrays of music folders here */}

    {/* Music player */}
    <MusicContainer fetchedData={fetchedData} />
    {/* Music player */}
   </SimpleGrid>
  </Box>
 )
}

export default Music
