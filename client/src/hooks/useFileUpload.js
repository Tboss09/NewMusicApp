import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { useHistory } from 'react-router'
import useState from 'react-usestateref'
import axios from '../axios/axiosConfig'

const useFileUpload = () => {
 const history = useHistory()
 const toast = useToast()
 const [responseFromServer, setResponseFromServer] = useState(true)
 const [resetFileInput, setResetFileInput] = useState('')
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
  unregister,
  clearErrors,
  reset,
  formState: { errors },
 } = useForm()

 useEffect(() => {
  register('song', { required: 'Audio file is required' })
  register('image', { required: 'Image file is required' })
  return () => {
   unregister('image')
   unregister('image')
  }
 }, [register,unregister])

 function ThatResetsTheFileInput() {
  let randomString = Math.random().toString(36)
  setResetFileInput(randomString)
  return randomString
 }
 const onSubmit = form => {
  //  If user is done submitting
  setFilePreview({
   img: null,
   audio: null,
  })

  setResponseFromServer(false)
  if (form) {
   const file = new File([form.image], form.image.name, {
    type: form.image.type,
    lastModified: new Date().getTime(),
   })
   const { author, songName } = form
   let data_array = []
   data_array.push(form.song, file)
   const data = new FormData()
   for (var x = 0; x < data_array.length; x++) {
    data.append('file', data_array[x])
   }

   axios.post('/upload', { songName, author })
   axios
    .post('/upload/song', data, {
     headers: {
      'Content-Type': 'multipart/form-data',
     },
    })
    .then(res => {
     form.image = ''
     form.song = ''
     console.log(form)
     data_array.length = []
     reset()
     setResponseFromServer(true)
     toast({
      title: 'Successful',
      description: 'Song was successfully added',
      status: 'success',
      duration: 4000,
      position: 'top-right',
      isClosable: true,
      onCloseComplete: () => history.go(0),
     })
    })
    .catch(err => {
     setResponseFromServer(true)
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
  ThatResetsTheFileInput()
 }

 return {
  onSubmit,
  handleSubmit,
  responseFromServer,
  errors,
  register,
  setValue,
  setFilePreview,
  filePreview,
  clearErrors,
  setError,
  newFile,
  resetFileInput,
 }
}

export default useFileUpload
