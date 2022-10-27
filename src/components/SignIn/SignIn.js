import React, {useState} from 'react'
import './styles.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function SignIn() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [alert,setAlert] = useState('');
  const { currentUser , createUser, error} = useAuth();

  function clearAlert()
  {
    setAlert('');
  }

  function SignInHandler(){
    if(email===''||password==='')
    {
      setAlert('Kindly make sure all the fields have been filled!');
    }
    else
    {
      clearAlert();
      createUser(email,password);
    }
  }

  return (
    <div className='body'>
      {currentUser ? <Navigate to="/" /> :
      <>
      <div className='row text'>
      <strong>CodePasta</strong><br/>
      #1 Destination for all your tech doubts
      </div>
      <div className='row box'>
      <TextField label="Email" value={email} type='email' variant="filled" size='small' onChange={(e)=>setEmail(e.target.value)}/>
      <TextField label="Password" value={password} type='password' variant="filled" size='small' onChange={(e)=>setPassword(e.target.value)}/>
      <Button variant="contained" color="secondary" onClick={()=>SignInHandler()}>Sign In</Button>
      </div>
      {alert && <Alert severity="error">{alert}</Alert>}{error && <Alert severity="error">{error}</Alert>}
      </>
      }
    </div>
  )
}
