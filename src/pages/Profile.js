import React from 'react'
import useUser from '../hooks/useUser'

const Profile = () => {
    const {userData, isLoading} =useUser()

    if (isLoading) {
        return <div>Loading...</div>}

  return (
        
    <div className='container'>

    <h1> User Profile </h1>

    {userData ? ( 
    
    <div> 
      <p><strong>Email:</strong> {userData.email}! </p>
        {/* <p> Welcome, {userData.email}!</p>  */}
        <p> Your ID: {userData.uid}</p>
    </div>

    ): ( <p>You are not logged in. Please log in to view your profile.</p>) }
    
    
</div>

  )
}

export default Profile