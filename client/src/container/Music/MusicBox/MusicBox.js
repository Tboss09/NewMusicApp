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
import useState from 'react-usestateref'
import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { FaPause, FaPlay } from 'react-icons/fa'
import './music.css'
import axios from '../../../axios/axiosConfig'
const Ma = ({ data }) => {
 const link = 'https://peaceful-dry-tortugas-71515.herokuapp.com/display'
 const { song, image, author, songName, _id } = data
 const { isOpen, onToggle } = useDisclosure()
 const textInput = React.createRef()
 const [play, setPlay] = React.useState(false)
 const [fileDownload, setFileDownload, ref] = useState(false)

 //  THis is sent everytime a file is downloaded
 const handleDownload = React.useCallback(() => {
  setFileDownload(true)
 
  if (ref.current) {
   axios
    .post('/upload/fileDownload', null, {
     params: {
      amountOfDownload: 1,
      _id: _id,
     },
    })
    .then(res => {
     setFileDownload(false)
     console.log(res)
    })
    .catch(err => {
     setFileDownload(false)
     console.log(err)
    })
  }
 }, [ref, fileDownload])

 const handlePlay = React.useCallback(
  e => {
   onToggle()
   setPlay(!play)
   const audios = document.querySelectorAll('audio')
   for (var i = 0, len = audios.length; i < len; i++) {
    if (
     audios[i].attributes[0].nodeValue !==
     textInput.current.audio.current.src.trim()
    ) {
     audios[i].currentTime = 0 * 1000
     audios[i].pause()
    }
    play
     ? textInput.current.audio.current.pause()
     : textInput.current.audio.current.play()
   }

   // Play music
  },
  [textInput, play, onToggle, setPlay]
 )

 return (
  <>
   <Box position="relative" w="100%" mx="auto" shadow="lg" rounded="md">
    <Box px={4} py={2}>
     <chakra.h1
      color="black"
      fontWeight="bold"
      fontSize="3xl"
      textTransform="uppercase"
     >
      {songName}
     </chakra.h1>
     <chakra.p mt={1} fontSize="md" color="black">
      By {author}
     </chakra.p>
    </Box>

    <Image
     h="52"
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
     <Box>
      <Button variant="unstyled" onClick={handlePlay}>
       <Icon as={!play ? FaPlay : FaPause} cursor="pointer" color="white" />
      </Button>
     </Box>
     <Box onClick={handleDownload}>
      <Button
       as={Link}
       href={`${link}${song}`}
       download={`${songName.charAt(0).toUpperCase() + songName.slice(1)}-by-${
        author.charAt(0).toUpperCase() + author.slice(1)
       }.mp3`}
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
     </Box>
    </Flex>

    <SlideFade in={isOpen} offsetY="30px">
     <Box
      as={AudioPlayer}
      ref={textInput}
      position="absolute"
      data-set="audio"
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
      customAdditionalControls={[]}
      showJumpControls={false}
      onEnded={e => setPlay(false)}
      onPause={e => setPlay(false)}
      // other props here
     />
    </SlideFade>
   </Box>
  </>
 )
}

export default Ma
