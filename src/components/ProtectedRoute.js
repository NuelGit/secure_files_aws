import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import {useUser} from '../hooks/useUser'


const ProtectedRoute = () => {
    const {userData} = useUser()

  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute