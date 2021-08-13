// External files
import React from 'react'

import {
 Box,
 FormControl,
 FormErrorMessage,
 FormLabel,
 Input,
} from '@chakra-ui/react'
import { Redirect } from 'react-router-dom'
import useLogin from '../../../hooks/useLogin'
// internal files
import './login.css'

const Login = () => {
 const { ref, errors, register, handleSubmit, onSubmit } = useLogin()
 //  Sending a post request to the server with the username and Password

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
          })}
          // Validates what typed in is a Valid email address
         />
         <FormErrorMessage w="48" mx="auto">
          {errors.username && 'Username must not be less than  12 characters'}
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
