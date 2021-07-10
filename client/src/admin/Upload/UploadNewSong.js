import {
 Box,
 Button,
 Center,
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
 useToast,
 VisuallyHidden,
} from '@chakra-ui/react'
import imageCompression from 'browser-image-compression'
import React, { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import { useForm } from 'react-hook-form'
import { GiMusicalNotes } from 'react-icons/gi'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import useState from 'react-usestateref'
import axios from '../../axios/axiosConfig'
export default function Component() {
 const toast = useToast()
 const [responseFromServer, setResponseFromServer] = useState(true)
 const [filePreview, setFilePreview, newFile] = useState({
  img: null,
  audio: null,
 })

 // react hook form
 const {
  register,
  handleSubmit,
  setError,
  setValue,
  reset,
  unregister,
  clearErrors,
  formState: { errors },
 } = useForm()

 useEffect(() => {
  register('song', { required: 'Audio file is required' })
  register('image', { required: 'Image file is required' })
  return () => {
   unregister('image')
   unregister('image')
  }
 }, [register])

 const onSubmit = form => {
  document.forms[0].reset()
  //  If user is done submitting
  setFilePreview({
   img: null,
   audio: null,
  })

  setResponseFromServer(false)

  if (form) {

   const { author, songName } = form
   let data_array = []
   data_array.push(form.song, form.image)
   const data = new FormData()
   for (var x = 0; x < data_array.length; x++) {
    data.append('file', data_array[x])
   }

   axios.post('upload', { songName, author })

   axios
    .post('upload/song', data, {
     headers: {
      'Content-Type': 'multipart/form-data',
     },
    })
    .then(res => {
      reset({},{keepValues:false})
     data_array.length = []
     setResponseFromServer(true)
     toast({
      title: 'Successful',
      description: 'Song was successfully added',
      status: 'success',
      duration: 4000,
      position: 'top-right',
      isClosable: true,
     })
    })
    .catch(err => {
      reset({},{keepValues:false})
     setResponseFromServer(true)
     document.getElementById('uploadForm').reset()
     data_array.length = 0
     console.log('Error:', err)
     toast({
      title: 'Error',
      description: `Error ${err}`,
      status: 'error',
      position: 'top-right',
      duration: 4000,
      isClosable: true,
     })
    })
  }
 }

 return (
  <Box
   contentEditable={false}
   bg="gray.50"
   maxW={{ base: 'initial', md: '8xl' }}
   mx={{ base: 'initial', md: 'auto' }}
  >
   {responseFromServer ? (
    <Box
     w={{ base: 'full', md: 'full', lg: '80%' }}
     mx="auto"
     position="relative"
    >
     <Box
      w="full"
      display={{ base: 'initial' }}
      justifyContent={{ base: 'initial', md: 'center' }}
     >
      <Box mt={[5, null, 0]}>
       <chakra.form
        id="uploadForm"
        onSubmit={handleSubmit(onSubmit)}
        shadow="base"
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
       >
        <Stack px={4} py={5} bg="white" spacing={12} p={{ sm: 6 }}>
         <SimpleGrid columns={6} spacing={6}>
          <FormControl
           as={GridItem}
           colSpan={[6, 3]}
           isInvalid={errors.songName}
          >
           <FormLabel fontSize="base" fontWeight="500" color="gray.700">
            Song Name
           </FormLabel>
           <Input
            size="md"
            type="text"
            name="first_name"
            {...register('songName', {
             required: true,
             minLength: 2,
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
           <FormLabel fontSize="base" fontWeight="500" color="gray.700">
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
           <FormLabel fontSize="lg" fontWeight="500" color="gray.700">
            Song Image
           </FormLabel>
           <Flex alignItems="center" mt={1}>
            <Image
             boxSize={'40'}
             rounded="none"
             objectFit="cover"
             src={newFile.current.img}
             fallbackSrc="https://via.placeholder.com/200"
             bg="gray.100"
            />
            <chakra.label
             htmlFor="file-upload"
             pl="4"
             cursor="pointer"
             rounded="md"
             fontSize="md"
             color="blue.600"
             pos="relative"
             _hover={{
              color: 'blue.400',
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
                 // No need to compress on server, this compresses the image from the front end
                 ;(async function handleImageUpload(event) {
                  const imageFile = value
                  console.log(
                   'originalFile instanceof Blob',
                   imageFile instanceof Blob,
                   imageFile
                  ) // true
                  console.log(
                   `originalFile size ${imageFile.size / 1024 / 1024} MB`,
                   imageFile
                  )

                  const options = {
                   maxSizeMB: 1,
                   maxWidthOrHeight: 1920,
                   useWebWorker: true,
                  }

                  try {
                   const compressedFile = await imageCompression(
                    imageFile,
                    options
                   )
                   console.log(
                    'compressedFile instanceof Blob',
                    compressedFile instanceof Blob
                   ) // true
                   console.log(
                    `compressedFile size ${
                     compressedFile.size / 1024 / 1024
                    } MB`,
                    compressedFile
                   ) // smaller than maxSizeMB
                   setValue('image', compressedFile)
                   setFilePreview({...filePreview, 
                    img: URL.createObjectURL(compressedFile),

                  })
                  } catch (error) {
                   setError('image', {
                    type: 'manual',
                    message: `'Error:${error}'`,
                   })
                   console.log(error)
                  }
                 })()
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
           <FormLabel fontSize="md" fontWeight="500" color="gray.700">
            Song
           </FormLabel>
           <Flex
            mt={1}
            justify="center"
            px={6}
            pt={5}
            pb={6}
            borderWidth={2}
            borderColor="gray.300"
            borderStyle="dashed"
            rounded="md"
           >
            <Stack spacing={1} textAlign="center" w="full">
             {newFile.current.audio ? (
              <Box
               as={AudioPlayer}
               className = "audio"
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
              color="gray.600"
              alignItems="center"
              justifyContent="center"
             >
              <chakra.label
               htmlFor="song-upload"
               cursor="pointer"
               rounded="md"
               fontSize="md"
               color="blue.600"
               pos="relative"
               _hover={{
                color: 'blue.400',
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
             <Text fontSize="xs" color="gray.500">
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

        <Box px={{ base: 4, sm: 6 }} py={3} bg="gray.50" textAlign="right">
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
   ) : (
    <Box
     top="0"
     position="absolute"
     zIndex="popover"
     w="100%"
     d="100%"
     bg="blackAlpha.400"
     right="0"
     left="0"
     bottom="0"
    >
     <Center h="100%" w="100%">
      <Loader type="ThreeDots" color="gray" height={150} width={150} />
     </Center>
    </Box>
   )}
  </Box>
 )
}
