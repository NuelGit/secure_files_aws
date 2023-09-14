import React from 'react'
import './Home.css'
// import { Link } from 'react-router-dom'

const Home = () => {

  return (
<div className='home-container'>
          
      <h1>Welcome to Secure File Storage</h1>
      <p>
        This is the home page of a secure file storage application, that uses hybrid cryptography to protect your files. 
        <br/> Designed and Implemented by <strong> Ebele Emmanuel Nweke</strong>. <br/> under the supervision of 
        <strong> Prof Asagba Oghenekaro</strong>, October 2023.
        <br/> You can use this platform to upload, manage, and securely store your files in the cloud.
      </p>
      <p>
        To get started, please log in or register if you don't have an account yet. Once logged in, you'll have access to the dashboard, file
        management, and other features.
      </p>

      <div> 
      {/* <p>
        Please <Link to='/login'> Log-in </Link> or <Link to='/create-user'>  Register </Link> to get started.
      </p> */}
      </div>
      
    </div>
  )
}

export default Home