import {
 Box,
 Button,
 chakra,
 Flex,
 Icon,
 Image,
 Link,
 SlideFade,
 useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { FaPause, FaPlay } from 'react-icons/fa'
import './music.css'

const Ma = ({ data }) => {
 const link = 'https://peaceful-dry-tortugas-71515.herokuapp.com/upload/'
 const { song, image, author, songName } = data[0]
 const { isOpen, onToggle } = useDisclosure()
 const textInput = React.createRef()
 const [play, setPlay] = React.useState(false)

 const handlePlay = React.useCallback(
  e => {
   onToggle()

   setPlay(!play)

   // Play music
   !play
    ? // if icon == play then play
      textInput.current.audio.current.play()
    : // if icon == pause then pause
      textInput.current.audio.current.pause()
  },
  [textInput, play, onToggle]
 )

 return (
  <>
   <Box position="relative" maxW="lg" mx="auto" shadow="lg" rounded="md">
    <Box px={4} py={2}>
     <chakra.h1
      color="black"
      fontWeight="bold"
      fontSize="3xl"
      textTransform="uppercase"
     >
      {songName}
     </chakra.h1>
     <chakra.p mt={1} fontSize="sm" color="black">
      {author}
     </chakra.p>
    </Box>

    <Image
     h={48}
     w="full"
     fit="cover"
     mt={2}
     src={`${link}${image}`}
     fallbackSrc="https://via.placeholder.com/3050"
     alt={`A Song written by ${author} titled ${songName}`}
    />

    <Flex
     alignItems="center"
     justifyContent="space-between"
     px={6}
     py={3}
     bg="gray.900"
     roundedBottom="lg"
    >
     <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
      <Button variant="unstyled" onClick={handlePlay}>
       <Icon as={!play ? FaPlay : FaPause} cursor="pointer" />
      </Button>
     </chakra.h1>
     <Button
      as={Link}
      download
      px={4}
      py={2}
      bg="white"
      fontSize="xs"
      color="gray.900"
      fontWeight="bold"
      rounded="sm"
      textTransform="uppercase"
      _hover={{
       bg: 'gray.200',
      }}
      _focus={{
       bg: 'gray.400',
      }}
     >
      Download
     </Button>
    </Flex>

    <SlideFade in={isOpen} offsetY="30px">
     <Box
      as={AudioPlayer}
      ref={textInput}
      position="absolute"
      bg="blackAlpha.400"
      color="white"
      bottom="16"
      w="95%"
      mx="auto"
      right="0 "
      left="0 "
      src={`${link}${song}`}
      class="musicAudio"
      autoPlay={false}
      customVolumeControls={[]}
      stomAdditionalControls={[]}
      customAdditionalControls={[]}
      showJumpControls={false}
      onEnded={e => setPlay(false)}
      // other props here
     />
    </SlideFade>
   </Box>
  </>
 )
}

export default Ma
