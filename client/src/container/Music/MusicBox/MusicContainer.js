import { Box } from '@chakra-ui/layout'
import React from 'react'
import uniqid from 'uniqid'
import MusicBox from './MusicBox'

const MusicContainer = ({ fetchedData }) => {


 return (
  <>
   {fetchedData.map(user => (
    <Box key={uniqid()}>
     <MusicBox data={user} allData={fetchedData} />
    </Box>
   ))}
  </>
 )
}

export default MusicContainer
