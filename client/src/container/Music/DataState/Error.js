import { Image } from '@chakra-ui/image'
import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

const Error = ({ error }) => {
 console.log(error.response.data.message)
 return (
  <Box w="80%" mx="auto" mt="32">
   <Image
    w={{ base: '50%', md: '40%', lg: '20%' }}
    mx="auto"
    objectFit="cover"
    src="https://image.flaticon.com/icons/png/512/463/463612.png"
   />

   <Box pt="12" w="80%" mx="auto" fontSize ="xl">
    <Text>
     {' '}
     <Text as="span" fontWeight ="700" > Error</Text> : {error.response.data.message.message}
    </Text>
   </Box>
  </Box>
 )
}

export default Error
