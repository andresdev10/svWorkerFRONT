import { BrowserRouter } from "react-router-dom"
import Login from "./login/Login"
import Home from "./home/Home"
const Index = () => {
  return (
    <BrowserRouter>
   
        <Login />
        <Home />
    </BrowserRouter>
  )
}

export default Index