import React ,{useState}from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Cart  from './screens/Cart/Cart'
import verify from './screens/verify/verify'
import Home from './screens/Home/Home'
import MyOrders from './screens/MyOrders/MyOrders'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify'
const App = () => {

  const[showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer />
     {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
     <div className='app'>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
      <Routes>
        <Route path='' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={<PlaceOrder/>}></Route>
        <Route path='verify' element={<verify/>}></Route>
        <Route path='/myorders' element={<MyOrders/>}></Route>
      </Routes>
    </div>
    <Footer />
    </>
   
  )
}

export default App

