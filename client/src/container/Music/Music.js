import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import axios from '../../axios/axiosConfig'
import EmptyArray from './DataState/EmptyArray'
import Error from './DataState/Error'
import IsLoading from './DataState/IsLoading'
import MusicContainer from './MusicBox/MusicContainer'
const Music = () => {
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
 console.log()

 if ( data === undefined || data === []  || data.length === 0 ) {
  return <EmptyArray />
 }

 if (error) {
  return (
   <Box>
    <Error error={error} />
   </Box>
  )
 }
 // This makes sure the gotten data is not undefined before assigning it to the variable

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
