import Button from '@mui/material/Button';
import Title from '../title/Title';
import './Login.component.css';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { login } from '../../services/login/login';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [inputsValue, setInputsValues] = useState({
        userName:"",
        password:"",
    })
    const navigate = useNavigate();
    const handleInputsChange = (e) => {
        const { name, value } = e.target;
        setInputsValues({
            ...inputsValue,
            [name]: value
        })
    }
    console.log("inputsValue", inputsValue)
    const sendLogin = async () => {
        try {
          const response = await login(inputsValue.userName, inputsValue.password)
           console.log("good", response) 
           navigate('/home')
        } catch (error) {
            console.log("fallo!!")
            throw error
        }
    }
  return (
    <div>
        <div style={{marginBottom:'30px'}}><Title /></div>
        <div className='container-login'>
            <div className='input-username'>
                <Typography variant='h4' color='white'>Username</Typography>
                <input className='input-value' type="text" name="userName" onChange={handleInputsChange}/>
            </div>
            <div className='input-password'>
                <Typography variant='h4' color='white'>Password</Typography>

                <input className='input-value' type="password" name="password" onChange={handleInputsChange}/>
            </div>
            <div className='button-login'>
                <Button  variant="contained" size="large" onClick={sendLogin} >Login</Button>
            </div>
        </div>
    </div>
  )
}

export default Login