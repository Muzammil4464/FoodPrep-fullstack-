import React from 'react'
import './verify.css'
import {StoreContext} from '../../context/StoreContext'
import {useSearchParams , useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import  Loader from '../../Components/Loader/Loader'
import axios from 'axios'
import { useEffect } from 'react'

const verify = () => {

    const[searchParams,setSearchParams] = useSearchParams()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')
    
    const navigate = useNavigate() 


    console.log(success,orderId)
    const {url} = useContext(StoreContext)

    const verifyPayment = async()=>{
      try {
        const response = await axios.post(url+"/api/order/verify",{success,orderId})
        if(response.data.message==='Not Paid')
          navigate('/')
        else
          navigate('/myorders')
      } catch (error) {
      console.log(error);
      }

    }

    useEffect(()=>{
      verifyPayment()
    },[])

  return (
    <div>
      <Loader/>
    </div>
  )
}

export default verify
