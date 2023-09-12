import React from 'react'
import {} from 'react-router-dom'
import {useUser} from '../hooks/useUser'


const ProtectedRoute = () => {
    const {userData} = useUser()

  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute