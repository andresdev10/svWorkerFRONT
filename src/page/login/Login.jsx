import { Route, Routes } from 'react-router-dom'
import LoginComponent from '../../component/login.component/Login.component'

function Login() {
  return (
    // <BrowserRouter>
     <Routes>
      <Route path='/' element={ <LoginComponent /> } />
    </Routes>
    // </BrowserRouter> 
  )
}

export default Login