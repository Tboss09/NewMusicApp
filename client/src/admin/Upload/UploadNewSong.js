import {
 Box,
 Button,
 chakra,
 Flex,
 FormControl,
 FormErrorMessage,
 FormLabel,
 GridItem,
 Icon,
 Image,
 Input,
 SimpleGrid,
 Stack,
 Text,
 useColorModeValue,
 VisuallyHidden,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GiMusicalNotes } from 'react-icons/gi'
import useState from 'react-usestateref'
import axios from '../../axios/axiosConfig'
import AudioPlayer from 'react-h5-audio-player'

export default function Component() {

 const [filePreview, setFilePreview, newFile] = useState({
  img: null,
  audio: null,
 })
 useEffect(() => {
  register('song', { required: 'Audio file is required' })
  register('image', { required: 'Image file is required' })
 }, [])

 const {
  register,
  handleSubmit,
  setError,
  setValue,
  clearErrors,
  formState: { errors },
 } = useForm()
 const onSubmit = form => {
  //  If user is done submitting
  if (form) {
   const { author,songName } = form
   let data_array = []
   data_array.push(form.song, form.image)
   console.log(data_array)
   const data = new FormData()
   for (var x = 0; x < data_array.length; x++) {
    data.append('file', data_array[x])
   }

   axios
    .post('upload', { songName, author })
    .then(res => {
     console.log(res)
     axios.post('upload/song', data, {
      headers: {
       'Content-Type': 'multipart/form-data',
      },
     })
    })
    .then(res => {})
    .catch(err => {
     console.log('Error :', err)
    })
  }
 }

 return (
  <Box
   contentEditable={false}
   bg={useColorModeValue('gray.50', 'inherit')}
   maxW={{ base: 'initial', md: '8xl' }}
   mx={{ base: 'initial', md: 'auto' }}
  >
   <Box w={{ base: 'full', md: 'full', lg: '80%' }} mx="auto">
    <Box
     w="full"
     display={{ base: 'initial' }}
     justifyContent={{ base: 'initial', md: 'center' }}
    >
     <Box mt={[5, null, 0]}>
      <chakra.form
       onSubmit={handleSubmit(onSubmit)}
       shadow="base"
       rounded={[null, 'md']}
       overflow={{ sm: 'hidden' }}
      >
       <Stack
        px={4}
        py={5}
        bg={useColorModeValue('white', 'gray.700')}
        spacing={12}
        p={{ sm: 6 }}
       >
        <SimpleGrid columns={6} spacing={6}>
         <FormControl
          as={GridItem}
          colSpan={[6, 3]}
          isInvalid={errors.songName}
         >
          <FormLabel
           fontSize="base"
           fontWeight="500"
           color={useColorModeValue('gray.700', 'gray.50')}
          >
           Song Name
          </FormLabel>
          <Input
           size="md"
           type="text"
           name="first_name"
           {...register('songName', {
            required: true,
            minLength: 4,
            maxLength: 20,
           })}
           placeholder="Eg, Chioma my lover"
           mt={1}
           focusBorderColor="blue.400"
           shadow="sm"
           w="full"
           rounded="md"
          />
          <FormErrorMessage>
           {errors.songName && 'Value must be up to 4 Letters'}
          </FormErrorMessage>
         </FormControl>

         <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={errors.author}>
          <FormLabel
           fontSize="base"
           fontWeight="500"
           color={useColorModeValue('gray.700', 'gray.50')}
          >
           Song Author
          </FormLabel>
          <Input
           type="text"
           name="last_name"
           {...register('author', {
            required: 'Name of author is required',
            minLength: 4,
            maxLength: 20,
           })}
           mt={1}
           focusBorderColor="blue.400"
           shadow="sm"
           size="md"
           w="full"
           rounded="md"
          />
          <FormErrorMessage>
           {errors.author && 'Value must be up to 4 Letters'}
          </FormErrorMessage>
         </FormControl>
        </SimpleGrid>
        <Stack direction={['column', 'row']} spacing={12}>
         {/*Image of song here  */}
         <FormControl isInvalid={errors.image}>
          <FormLabel
           fontSize="lg"
           fontWeight="500"
           color={useColorModeValue('gray.700', 'gray.50')}
          >
           Song Image
          </FormLabel>
          <Flex alignItems="center" mt={1}>
           <Image
            boxSize={'40'}
            rounded="none"
            objectFit="cover"
            src={newFile.current.img}
            fallbackSrc="https://via.placeholder.com/200"
            bg={useColorModeValue('gray.100', 'gray.800')}
           />
           <chakra.label
            htmlFor="file-upload"
            pl="4"
            cursor="pointer"
            rounded="md"
            fontSize="md"
            color={useColorModeValue('blue.600', 'blue.200')}
            pos="relative"
            _hover={{
             color: useColorModeValue('blue.400', 'blue.300'),
            }}
           >
            <Button as="span" variant="outline">
             UPLOAD
            </Button>
            <VisuallyHidden>
             <input
              id="file-upload"
              accept="image/png, image/jpeg"
              onChange={e => {
               const value = e.target.files[0]
               const pattern = /image-*/
               if (!value || value === 0) {
                setError('image', {
                 type: 'manual',
                 message: 'Please upload a image',
                })
                return
               }
               if (!value.type.match(pattern)) {
                setError('image', {
                 type: 'manual',
                 message: 'Only images ending in PNG, JPG are accepted  ',
                })
                return
               } else {

                setFilePreview({
                 ...filePreview,
                 img: URL.createObjectURL(value),
                })
                setValue('image', value)
                clearErrors('image')
               }
              }}
              name="file"
              type="file"
             />
            </VisuallyHidden>
           </chakra.label>
          </Flex>
          {errors.image && (
           <FormErrorMessage>{errors.image.message}</FormErrorMessage>
          )}
         </FormControl>
         {/*Image of song here  */}

         <FormControl isInvalid={errors.song}>
          <FormLabel
           fontSize="md"
           fontWeight="500"
           color={useColorModeValue('gray.700', 'gray.50')}
          >
           Song
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
           <Stack spacing={1} textAlign="center" w="full">
            {newFile.current.audio ? (
             <Box
              as={AudioPlayer}
              width="full"
              showJumpControls={false}
              showSkipControls={false}
              autoPlayAfterSrcChange={false}
              layout="horizontal-reverse"
              customVolumeControls={[]}
              customAdditionalControls={[]}
              src={newFile.current.audio}
             />
            ) : (
             <Icon
              mx="auto"
              boxSize={12}
              color="gray.400"
              aria-hidden="true"
              as={GiMusicalNotes}
             />
            )}
            <Flex
             fontSize="sm"
             color={useColorModeValue('gray.600', 'gray.400')}
             alignItems="center"
             justifyContent="center"
            >
             <chakra.label
              htmlFor="song-upload"
              cursor="pointer"
              rounded="md"
              fontSize="md"
              color={useColorModeValue('blue.600', 'blue.200')}
              pos="relative"
              _hover={{
               color: useColorModeValue('blue.400', 'blue.300'),
              }}
             >
              <Button
               variant="ghost"
               as="span"
               fontWeight="500"
               textTransform="uppercase"
              >
               Upload a Song
              </Button>
              <VisuallyHidden>
               <input
                id="song-upload"
                onChange={e => {
                 const value = e.target.files[0]
                 const pattern = /audio-*/
                 if (!value || value === 0) {
                  setError('song', {
                   type: 'manual',
                   message: 'Please upload a audio',
                  })
                  return
                 }
                 if (!value.type.match(pattern)) {
                  setError('song', {
                   type: 'manual',
                   message:
                    'Only Audio file with Extension mp3,mp4 are accepted',
                  })
                  return
                 } else {
                  setFilePreview({
                   ...filePreview,
                   audio: URL.createObjectURL(value),
                  })
                  setValue('song', value)
                  clearErrors('song')
                 }
                }}
                name="file"
                accept="audio/*"
                multiple={false}
                type="file"
               />
              </VisuallyHidden>
             </chakra.label>
            </Flex>
            <Text
             fontSize="xs"
             color={useColorModeValue('gray.500', 'gray.50')}
            >
             MP3, MP4 up to 10MB
            </Text>
           </Stack>
          </Flex>
          {errors.song && (
           <FormErrorMessage>{errors.song.message}</FormErrorMessage>
          )}
         </FormControl>
        </Stack>
       </Stack>

       <Box
        px={{ base: 4, sm: 6 }}
        py={3}
        bg={useColorModeValue('gray.50', 'gray.900')}
        textAlign="right"
       >
        <Button
         type="submit"
         colorScheme="teal"
         _focus={{ shadow: '' }}
         fontWeight="md"
        >
         Upload
        </Button>
       </Box>
      </chakra.form>
     </Box>
    </Box>
   </Box>
  </Box>
 )
}
