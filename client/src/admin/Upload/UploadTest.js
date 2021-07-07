import { Button, Input, Link, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from '../../axios/axiosConfig'
const UploadTest = () => {
 const [selectedFile, setSelectedFile] = useState([])
 const [text, setText] = useState('')
 const [textTwo, setTextTwo] = useState('')
 const handleSubmit = e => {
  console.log(text, selectedFile)
  e.preventDefault()

  if (selectedFile) {
   const data = new FormData()
   for (var x = 0; x < selectedFile.length; x++) {
    data.append('file', selectedFile[x])
   }
   axios
    .post('upload', data, {
     headers: {
      'Content-Type': 'multipart/form-data',
     },
    })
    .then(data => {
     console.log(data)
     setSelectedFile([])
    })

   axios.post('upload', { songName: text, author: textTwo })
  
}
 }

 return (
  <VStack
   spacing="3"
   as="form"
   onSubmit={handleSubmit}
   shadow="lg"
   mt="12"
   h="80"
   maxW="lg"
   p="4"
   mx="auto"
  >
   <Input type="text" name="upload" onChange={e => setText(e.target.value)} />
   <Input
    type="text"
    name="upload"
    onChange={e => setTextTwo(e.target.value)}
   />
   <Input
    type="file"
    name="file"
    onChange={e =>
     setSelectedFile(oldSelectedFile => [...oldSelectedFile, e.target.files[0]])
    }
   />
   <Input
    type="file"
    name="file"
    onChange={e =>
     setSelectedFile(oldSelectedFile => [e.target.files[0], ...oldSelectedFile])
    }
   />
   <Button type="submit" colorScheme="red">
    Submit
   </Button>

   <Link download="http://localhost:4000/upload/24602a1183e6c1656c0f92cef4b87d6a.mp3">
    download here
   </Link>
  </VStack>
 )
}

export default UploadTest
