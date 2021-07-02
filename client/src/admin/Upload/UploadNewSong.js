import AudioPlayer from 'react-h5-audio-player'
import { useForm } from 'react-hook-form'

import {
 Box,
 Button,
 chakra,
 Flex,
 FormControl,
 FormLabel,
 GridItem,
 Heading,
 Icon,
 Image,
 Input,
 InputGroup,
 SimpleGrid,
 Stack,
 Text,
 Tooltip,
 useColorModeValue,
 VisuallyHidden,
} from '@chakra-ui/react'
import { RiImageAddLine } from 'react-icons/ri'
import { CgMusic } from 'react-icons/cg'
import { useToast } from '@chakra-ui/react'
import React from 'react'
import FileBase64 from 'react-file-base64'

export default function Component() {
 const toast = useToast()
 const initialState = {
  songName: '',
  author: '',
  audio: '',
  audioCoverImage: '',
 }
 const [newSong, setNewSong] = React.useState({ initialState })

 //  Validation of forms
 const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
 } = useForm()
 const onSubmit = data => console.log(data)

 //  Validation of forms
 //  THis handles Images Upload
 const handleImageUpload = file => {
  const imageSize = parseInt(file.size)
  if (imageSize >= 8000) {
   toast({
    title: 'Image Size Limit exceeded',
    description: 'Image uploaded must not be greater than 8mb',
    status: 'warning',
    duration: 5000,
    position: 'top-right',
    isClosable: true,
   })
   console.log('image too large')
  } else if (parseInt(file.size) <= 8000) {
   setNewSong({ ...newSong, audioCoverImage: file.base64 })
  }
 }

 //  THis handles Song Upload
 const handleSongUpload = song => {
  const songSize = parseInt(song.size)
  if (songSize >= 10000) {
   toast({
    title: 'Song Size Limit exceeded',
    description: 'Song uploaded must be less than 10mb',
    status: 'error',
    variant: 'left-accent',
    duration: 5000,
    position: 'top-right',
    isClosable: true,
   })
  } else if (songSize <= 10000) {
   setNewSong({ ...newSong, audio: song.base64 })
  }
 }
 return (
  <Box bg={useColorModeValue('gray.200', 'inherit')} p={10} pt={12}>
   <Box>
    <SimpleGrid
     display={{ base: 'initial', md: 'grid' }}
     maxW="md"
     mx="auto"
    >
     <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
      <chakra.form
       shadow="lg"
       rounded={[null, 'md']}
       overflow={{ sm: 'hidden' }}
       onSubmit ={handleSubmit(onSubmit)}
      >
       <Stack
        px={4}
        py={5}
        bg={useColorModeValue('white', 'gray.700')}
        spacing={6}
        p={{ sm: 6 }}
       >
        <SimpleGrid columns={3} spacing={6}>
         <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
           fontSize="md"
           fontWeight="sm"
           color={useColorModeValue('gray.700', 'gray.50')}
          >
           Name Of Song
          </FormLabel>
          <InputGroup size="sm">
           <Input
            type="text"
            placeholder="Eg, Chioma my lover"
            focusBorderColor="brand.400"
            rounded="md"
           />
          </InputGroup>
         </FormControl>
        </SimpleGrid>

        <FormControl maxW="md" mx="auto">
         <FormLabel
          fontSize="md"
          fontWeight="md"
          color={useColorModeValue('gray.700', 'gray.50')}
         >
          Song Upload:
         </FormLabel>
         <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          borderColor={useColorModeValue('gray.300', 'gray.500')}
          borderStyle="dashed"
          rounded="md"
         >
          <Stack spacing={1} align="center" w="100%">
           <Flex
            alignSelf="center"
            w="100%"
            justify="center"
            flexDir="column"
            h="32"
            align="center"
           >
            {!newSong.audio ? (
             <Icon as={CgMusic} w="32" h="20" color="blackAlpha.500" />
            ) : (
             <Box>
              <Text align="center" pb="3">
               Name of file here
              </Text>
              <Box
               as={AudioPlayer}
               align="center"
               w="80"
               showJumpControls={false}
               showSkipControls={false}
               autoPlay={false}
               customVolumeControls={[]}
               bg="transparent"
               shadow="md"
               customAdditionalControls={[]}
               className="audio-player"
               src={newSong.audio}
               onPlay={e => console.log('onPlay')}
              />
             </Box>
            )}
           </Flex>

           <Flex
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.400')}
            alignItems="baseline"
           >
            <Flex flexDir="column">
             <chakra.label
              htmlFor="song-upload"
              cursor="pointer"
              alignSelf="center"
              rounded="md"
              fontSize="md"
              mr="-10"
              color={useColorModeValue('brand.600', 'brand.200')}
              pos="relative"
              _hover={{
               color: useColorModeValue('brand.400', 'brand.300'),
              }}
              _focus={{
               color: useColorModeValue('brand.400', 'brand.300'),
              }}
             >
              <Box>
               <Button
                my="2"
                as="span"
                size="lg"
                w="80%"
                mx="auto"
                variant="outline"
                color="blue.700"
                _hover={[{ bg: 'blue.900' }, { color: 'white' }]}
               >
                Browse File
               </Button>
              </Box>
              <VisuallyHidden>
               <Input
                as={FileBase64}
                id="song-upload"
                accept="audio/*"
                multiple={false}
                onDone={handleSongUpload}
                type="file"
               />
              </VisuallyHidden>
             </chakra.label>
            </Flex>
           </Flex>
           <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.50')}>
            Mp3, Mp4 files not less than 8mb
           </Text>
          </Stack>
         </Flex>
        </FormControl>

        <div>
         <FormControl id="songAuthor" mt={1} as={GridItem} colSpan={[3, 2]}>
          <FormLabel
           fontSize="md"
           fontWeight="md"
           color={useColorModeValue('gray.700', 'gray.50')}
          >
           Song Author:
          </FormLabel>
          <Input
           placeholder="eg, abm music"
           mt={1}
           rows={3}
           shadow="sm"
           focusBorderColor="brand.400"
           fontSize={{ sm: 'sm' }}
          />
         </FormControl>
        </div>

        <FormControl maxW="lg" mx="auto">
         <FormLabel
          fontSize="md"
          fontWeight="md"
          color={useColorModeValue('gray.700', 'gray.50')}
         >
          Cover image (optional):
         </FormLabel>
         <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          borderColor={useColorModeValue('gray.300', 'gray.500')}
          borderStyle="dashed"
          rounded="md"
         >
          <Stack spacing={1} align="center">
           <Flex alignSelf="center" h="32" w="100%" align="center">
            {!newSong.audioCoverImage ? (
             <Icon as={RiImageAddLine} w="32" h="20" color="blackAlpha.500" />
            ) : (
             <Image
              src={newSong.audioCoverImage}
              shadow="lg"
              w="40%"
              mx="auto"
              h="full"
              objectFit="cover"
              fallbackSrc="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
             />
            )}
           </Flex>

           <Flex
            fontSize="md"
            color={useColorModeValue('gray.600', 'gray.400')}
            alignItems="baseline"
           >
            <Flex flexDir="column">
             <chakra.label
              htmlFor="image-upload"
              cursor="pointer"
              alignSelf="center"
              rounded="md"
              fontSize="md"
              mr="-10"
              color={useColorModeValue('brand.600', 'brand.200')}
              pos="relative"
              _hover={{
               color: useColorModeValue('brand.400', 'brand.300'),
              }}
             >
              <Box>
               <Button
                mt="6"
                mb="2"
                as="span"
                size="lg"
                w="80%"
                mx="auto"
                variant="outline"
                color="blue.700"
                _hover={[{ bg: 'blue.900' }, { color: 'white' }]}
               >
                Browse File
               </Button>
              </Box>
              <VisuallyHidden>
               <Input
                as={FileBase64}
                id="image-upload"
                accept="image/*"
                multiple={false}
                onDone={handleImageUpload}
                type="file"
               />
              </VisuallyHidden>
             </chakra.label>
            </Flex>
           </Flex>
           <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.50')}>
            PNG, JPG up to 8MB
           </Text>
          </Stack>
         </Flex>
        </FormControl>
       </Stack>

       <Box
        px={{ base: 4, sm: 6 }}
        py={3}
        bg={useColorModeValue('gray.50', 'gray.900')}
        textAlign="right"
       >
        <Button
         type="submit"
         color="#fff"
         bg="#1A365D"
         _focus={{ shadow: '' }}
         fontWeight="md"
        >
         Upload
        </Button>
       </Box>
      </chakra.form>
     </GridItem>
    </SimpleGrid>
   </Box>
   <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
    <Box py={5}>
     <Box
      borderTop="solid 1px"
      borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
     ></Box>
    </Box>
   </Box>

   <Box mt={[10, 0]}>
    <SimpleGrid
     display={{ base: 'initial', md: 'grid' }}
     columns={{ md: 3 }}
     spacing={{ md: 6 }}
    ></SimpleGrid>
   </Box>

   <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
    <Box py={5}>
     <Box
      borderTop="solid 1px"
      borderTopColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
     ></Box>
    </Box>
   </Box>

   <Box mt={[10, 0]}>
    <SimpleGrid
     display={{ base: 'initial', md: 'grid' }}
     columns={{ md: 3 }}
     spacing={{ md: 6 }}
    ></SimpleGrid>
   </Box>
  </Box>
 )
}
