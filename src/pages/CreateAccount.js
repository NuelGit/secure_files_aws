import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

const CreateAccount = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    
    const navigate = useNavigate()

    const handleEmailChange = (e) =>{
      setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) =>{
      setPassword(e.target.value)
    }
    const handleConfrimPasswordChange = (e) =>{
      setConfirmPassword(e.target.value)
    }
    
    const createAccount = async () =>{
      if(password !==confirmPassword){
        setError('Passowrd and Confirm Password must Match')
        return
      }
      try {
        await createUserWithEmailAndPassword(getAuth(), email, password)
        navigate('/profile')

      } catch (e) {
        setError(e.message)
      }
  
    }
  
    return (
    <div>
      <h1> Create User Account</h1>
    {error && <p style={{ color: 'red'}}> {error}</p>}
  
    <div >
      <label>Email: </label>
      <input type='text' placeholder='Your Email Address' value={email} onChange={handleEmailChange}/>
    </div>
  
    <div>
  
      <label>Password: </label>
      <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
      
    </div>
    <div>
  
      <label>Confirm Password: </label>
      <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={handleConfrimPasswordChange} />
      
    </div>

  <div className='button'> 
    <button onClick={createAccount}> Create Account </button>
  </div>
  <Link to='/login' >Already have an Account ? Log In here </Link>

   </div>
    
  )
}

export default CreateAccount