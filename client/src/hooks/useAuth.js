import { useQuery } from 'react-query'
import React from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import axiosConfig from '../axios/axiosConfig'

const useAuth = () => {
 const item = reactLocalStorage.get('newMusicAppToken')

 const { isLoading, error, data, isError, isSuccess } = useQuery(
  'authorizeUser',
  async () => {
   const { data } = await axiosConfig.get('/verifyUser', {
    headers: {
     'Access-Control-Allow-Origin': '*',
     'Content-type': 'Application/json',
     Authorization: `Bearer ${item}`,
    },
   })
   return await data
  }
 )

 return { isLoading, data, error, isError, isSuccess }
}

export default useAuth
