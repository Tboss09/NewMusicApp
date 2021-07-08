import { Box, Button, chakra, Flex, Icon, Image, Link } from '@chakra-ui/react'
import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { FaPause, FaPlay } from 'react-icons/fa'
import useState from 'react-usestateref'
import './music.css'

const Ma = ({ id, musicId }) => {
 const textInput = React.createRef()
 const [play, setPlay] = React.useState(false)
 const [disabled, setDisabled, ref] = useState(false)

 const handlePlay = React.useCallback(
  e => {
   setPlay(!play)

   // Play music
   !play
    ? // if icon == play then play
      textInput.current.audio.current.play()
    : // if icon == pause then pause
      textInput.current.audio.current.pause()
  },
  [textInput, play]
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
      NIKE AIR
     </chakra.h1>
     <chakra.p mt={1} fontSize="sm" color="black">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem
      sequi illum facere recusandae voluptatibus
     </chakra.p>
    </Box>

    <Image
     h={48}
     w="full"
     fit="cover"
     mt={2}
     src="https://peaceful-dry-tortugas-71515.herokuapp.com/upload/e071104fcae5880b1d6b0102885c9a04.jpg"
     alt="NIKE AIR"
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
      <Button variant="unstyled" onClick={handlePlay} isDisabled={disabled}>
       <Icon as={!play ? FaPlay : FaPause} cursor="pointer" />
      </Button>
     </chakra.h1>
     <Button
      as={Link}
      href="https://peaceful-dry-tortugas-71515.herokuapp.com/upload/720a97134c9be88981ca3f6166d76808.mp3"
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
    <Box
     as={AudioPlayer}
     ref={textInput}
     position="absolute"
     bottom="16"
     w="95%"
     mx="auto"
     right="0 "
     left="0 "
     autoPlay={false}
     customVolumeControls={[]}
     stomAdditionalControls={[]}
     customAdditionalControls={[]}
     showJumpControls={false}
     href="https://peaceful-dry-tortugas-71515.herokuapp.com/upload/720a97134c9be88981ca3f6166d76808.mp3"
     onEnded={e => setPlay(false)}
     // other props here
    />
   </Box>
  </>
 )
}

export default Ma
