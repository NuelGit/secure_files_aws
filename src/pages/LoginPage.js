import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    
    const navigate = useNavigate()

    const handleEmailChange = (e) =>{
      setEmail(e.target.value)
    }
    
    const handlePasswordChange = (e) =>{
      setPassword(e.target.value)
    }
    
    const handleLogin = async () =>{
      if(!email || !password){
        setError('Please provide both Email and Passowrd')
        return
      }
      try {
        await signInWithEmailAndPassword(getAuth(), email, password)
        navigate('/profile')

      } catch (e) {
        setError(e.message)
      }
  
    }
  
    return (
    <div className='login-container'>
      <h1> User Login</h1>
      {error && <p className="error-message">{error}</p>}
  
    <div className='form-group'>
      <label>Email: </label>
      <input type='text' placeholder='Your Email Address' value={email} onChange={handleEmailChange}/>
    </div>
  
    <div className='form-group'>
      <label>Password: </label>
      <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
    </div>

  <div className='btn'> 
    <button onClick={handleLogin}> Login </button>
  </div>

   </div>
    )
  }

  // const history = useHistory();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     history.push('/dashboard'); // Redirect to the dashboard after successful login
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  // return (
  //   <div className="login-container">
  //     <h2>Login</h2>
  //     <form onSubmit={handleLogin}>
  //       <div className="form-group">
  //         <label>Email:</label>
  //         <input
  //           type="email"
  //           placeholder="Email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //       </div>
  //       <div className="form-group">
  //         <label>Password:</label>
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>
  //       <button type="submit">Login</button>
  //     </form>
  //     {error && <p className="error-message">{error}</p>}
  //   </div>
  // );

export default LoginPage