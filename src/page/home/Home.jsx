import { Route, Routes } from 'react-router-dom'
import HomeComponent from '../../component/home.component/Home.component'
function Home() {
  return (
    // <BrowserRouter>
     <Routes>
      <Route path='/home' element={ <HomeComponent /> } />
    </Routes>
    // </BrowserRouter> 
  )
}

export default Home