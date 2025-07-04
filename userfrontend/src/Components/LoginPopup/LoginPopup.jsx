import  { useState , useEffect } from 'react'
import { useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios'
import {toast} from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {
  
    const {url,token,setToken} = useContext(StoreContext)

    const[curState,setCurState] = useState('Log In');
    const [data,setData] = useState({
      name : "",
      email : "",
      password:"",
    });

    const onChangeHandler = (e)=>{
      const {name,value} = e.target;
      setData({...data,[name]:value});
    }

    const onSubmitHandler = async(e) =>{
      e.preventDefault()

      let newUrl = url;
      if(curState === "Log In"){
        newUrl+='/api/user/login'
      }
      else{
        newUrl += '/api/user/register'
      }

      try {
        const response = await axios.post(newUrl,data)
        if(curState === 'Sign up'){
          toast.success("Account created successfully!\n Please Log in")
          setCurState("Log In")
        }
        else{
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
          setShowLogin(false)
        }
      } catch (error) {
        console.log(error.response.data.message)
      }

    }



  return (
    <div className='login-popup'>
      <form onSubmit={onSubmitHandler} className='login-popup-container'action="">
        <div className="login-popup-title">
            <h2>{curState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt='cross-icon' />
        </div>
        <div className="login-popup-inputs">
            {curState!=="Log In"?<input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder='UserName' required/>:<></>}
             <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='UserEmail' required/>
              <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required/>
        </div>
        <button type='submit' className="btn">
            {curState}
        </button>
        <div className="login-popup-condition">
             <input type="checkbox" required />
             <p>By continuing, I agree to terms & privacy policy.</p>
        </div>
        {
            curState === 'Log In' ? <p>Create a new account? <span onClick={()=>setCurState("Sign up")}>Click here</span></p>
            : <p>Already have an account?<span onClick={()=>setCurState("Log In")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
