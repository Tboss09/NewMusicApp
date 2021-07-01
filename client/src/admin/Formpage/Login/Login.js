// External files
import React from 'react'
import {
 Box,
 Button,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Input,
} from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from '../../../axios/axiosConfig'
// This is gonna be used for validation of form
import { useForm } from 'react-hook-form'

// internal files
import './login.css'

const Login = () => {
 const toast = useToast()
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = useForm()
 const [redirectToDashBoard, setRedirectToDashBoard] = React.useState(false)
 //  Sending a post request to the server with the username and Password
 const onSubmit = React.useCallback(data => {
  if (data) {
   const { username, password } = data
   axios
    .post('/api/v1/admin', {
     username,
     password,
    })
    .then(res => {
     setRedirectToDashBoard(true)
    })
    .catch(err => {
     toast({
      title: 'Error!.',
      description: `${err.response.data}`,
      status: 'error',
      duration: 5000,
      position: 'top-right',
      isClosable: true,
     })
    })
  }
  data = ''
 }, [])

 return (
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
         minLength: 4,
         maxLength: 18,
        })}
        // Validates what typed in is a Valid email address
       />
       <FormErrorMessage>
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
       <FormErrorMessage>
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
   {redirectToDashBoard && <Redirect to="/dashboard" />}
  </Box>
 )
}

export default Login
