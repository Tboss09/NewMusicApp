import AudioFile from '../../components/assets/audio/Caveman.mp3'
import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import uniqid from 'uniqid'
import ImageOne from '../../components/assets/img/bg1.jpg'
import MusicBox from './MusicBox/MusicBox'

const Music = () => {
 const dummyArray = [
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
  {
   uniq: uniqid(),
  },
 ]

 const [dummyArrayForMusic, setDummyArrayForMusic] = React.useState(dummyArray)

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
   {dummyArrayForMusic.map((user, index) => (
    <MusicBox
     image={ImageOne}
     audio={AudioFile}
     key={uniqid()}
     musicId={user.uniq}
    />
   ))}

   {/* Music player */}

   {/* Music player */}
  </SimpleGrid>
 )
}

export default Music
