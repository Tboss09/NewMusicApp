import { Center } from '@chakra-ui/layout'
import React from 'react'
import Loader from 'react-loader-spinner'

const IsLoading = () => {
 return (
  <Center h="80%" w="full" mt={{ base: '24', md: '64', lg: '48' }}>
   <Loader type="BallTriangle" color="blue" height={200} width={200} />
  </Center>
 )
}

export default IsLoading
