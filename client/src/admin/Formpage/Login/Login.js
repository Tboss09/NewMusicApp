// External files
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast
} from '@chakra-ui/react'
import React from 'react'
// This is gonna be used for validation of form
import { useForm } from 'react-hook-form'
import { Redirect } from 'react-router-dom'
import useState from 'react-usestateref'
import { reactLocalStorage } from 'reactjs-localstorage'
import axios from '../../../axios/axiosConfig'
// internal files
import './login.css'

const Login = () => {
 const [tokenStoredInLocalStorage, setTokenStoredInLocalStorage, ref] =
  useState('')
 const toast = useToast()
 const {
  register,
  reset,
  handleSubmit,
  formState: { errors },
 } = useForm()

 //  Sending a post request to the server with the username and Password
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
      reactLocalStorage.set('token', res.data.token)
      setTokenStoredInLocalStorage(reactLocalStorage.get('token'))
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
  
  [reset, toast,ref,setTokenStoredInLocalStorage]
 )
 return (
  <>
   {!ref.current ? (
    <Box className="box login">
     <Box className="w100 main">
      <article className="br2 ba dark-gray shadow-4 article b--black-10 w-100 w-50-m w-25-l mw8 pa4 center">
       {/* Form starts here */}
       <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="username" isInvalid={errors.username}>
         <FormLabel>User Name</FormLabel>
         <Input
          type="text"
          {...register('username', {
           required: true,
           minLength: 4,
           maxLength: 18,
          })}
          // Validates what typed in is a Valid email address
         />
         <FormErrorMessage w="48" mx="auto">
          {errors.username &&
           'Username must not be less than or equals to 12 characters'}
         </FormErrorMessage>
        </FormControl>

        <FormControl id="password" my="5" isInvalid={errors.password}>
         <FormLabel>Passsword</FormLabel>
         <Input
          // Validates Password Typed in
          {...register('password', {
           required: true,
           minLength: 4,
           maxLength: 20,
          })}
          type="password"
          //  Validates what user types in
         />
         <FormErrorMessage w="48" mx="auto">
          {errors.password &&
           'Password must not be less than or equals to 12 characters'}
         </FormErrorMessage>
        </FormControl>

        <button
         type="submit"
         className="f6 link dim br2 ph3 pv2 mb2 dib white bg-dark-blue"
        >
         Login
        </button>
       </Box>
       {/* Form starts here */}
      </article>
     </Box>
    </Box>
   ) : (
    <Redirect to="/dashboard" />
   )}
  </>
 )
}

export default Login
