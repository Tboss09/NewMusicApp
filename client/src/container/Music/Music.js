import { Box, Heading, SimpleGrid, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import uniqid from 'uniqid'
import AudioFile from '../../components/assets/audio/Caveman.mp3'
import MusicBox from './MusicBox/MusicBox'
import Search from './SearchBar/Search'
const Music = () => {
 const [search, setSearchEvent] = React.useState(null)
 const { isLoading, error, data } = useQuery('allSongs', () =>
  fetch('https://peaceful-dry-tortugas-71515.herokuapp.com/allSongs/').then(
   res => {
    res.json()
   console.log(search)

   }
  )
 )
 if (isLoading) {
  return <div>Is loading</div>
 }
 if (error) {
  return <div>error</div>
 }
 const fetchedData = data.message[0]?.songs
 return (
  // Search for songs

  <Box mx="auto" w={['90%', '95%', '95%', '95%']} mb="32" mt="24">
   <Stack direction={['column', 'row']} pt="12">
    <Heading fontSize="lg">All Music</Heading>
    <Spacer />
    <Search setSearchEvent={search => setSearchEvent(search)} />
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
    {fetchedData.map((user, index) => (
     <React.Fragment key={uniqid()}>
      <MusicBox data={fetchedData} src={AudioFile} index={index} />
     </React.Fragment>
    ))}
    {/* Music player */}
   </SimpleGrid>
  </Box>
 )
}

export default Music
