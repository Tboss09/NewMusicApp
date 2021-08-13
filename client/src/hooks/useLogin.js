import { useToast } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import useState from 'react-usestateref'
import { reactLocalStorage } from 'reactjs-localstorage'
import axios from '../axios/axiosConfig'
// internal files
const useLogin = () => {
 const [tokenStoredInLocalStorage, setTokenStoredInLocalStorage, ref] =
  useState('')
 const toast = useToast()
 const {
  register,
  reset,
  handleSubmit,
  formState: { errors },
 } = useForm()

 const onSubmit = React.useCallback(
  data => {
   if (data) {
    const { username, password } = data
    axios
     .post('/admin', {
      username,
      password,
     })
     //  Then get the jwt token and store it in the localStorage and also validate the user
     .then(res => {
      reactLocalStorage.set('newMusicAppToken', res.data.token)
      setTokenStoredInLocalStorage(reactLocalStorage.get('newMusicAppToken'))
      console.log(ref.current)
     })
     //  Else Show an error
     .catch(err => {
      console.log(err)
      toast({
       title: 'Error!.',
       description: `${err.response.data}`,
       status: 'error',
       duration: 5000,
       position: 'top-right',
       isClosable: true,
      })
     })
    reset([])
    reset({ image: '' })
    reset({ song: '' })
   }
  },

  [reset, toast, ref, setTokenStoredInLocalStorage]
 )

 return { ref, errors, register ,handleSubmit,onSubmit}
}

export default useLogin
