import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import MusicBox from './MusicBox/MusicBox'

const Music = () => {
 const { isLoading, error, data } = useQuery('allSongs', () =>
  fetch('http://localhost:4000/allSongs').then(res => res.json())
 )
 if (isLoading) {
  return <div>Is loading</div>
 }
 if (error) {
  return <div>error</div>
 }

 return (
  // Grid layout for the Music showcase

  <SimpleGrid
   columns={[1, 2, 2, 3]}
   mt="24"
   mb="32"
   spacing={10}
   w={['90%', '95%', '95%', '95%']}
   mx="auto"
   alignItems="center"
   justifyContent="center"
  >
   {/* Arrays of music folders here */}
   <MusicBox data={data} />

   {/* Music player */}

   {/* Music player */}
  </SimpleGrid>
 )
}

export default Music
