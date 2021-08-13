import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = ({ children }) => {
 const { data, isLoading, error, isError, isSuccess } = useAuth()

 if (isLoading) {
  return <div>Loading</div>
 }

 if (isError) {
  return <Redirect to="/admin"></Redirect>
 }

 if (isSuccess) {
  return children
 }
}

export default ProtectedRoute
