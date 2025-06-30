import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const [data,setData] = useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip_code:"",
    country:"",
    phone:""
  })


  const {getTotalCartAmount,food_list,cartItems,token} = useContext(StoreContext);

  const onChangeHandler=(e)=>{
    const{name,value}=e.target
    setData({...data,[name]:value})
  }

  const onSubmitHandler=async(e)=>{
   e.preventDefault();
   let orderItems=[];
   food_list.map((item)=>{
    if(cartItems[item._id]>0){
      let itemInfo = item;
      itemInfo.quantity = cartItems[item._id]
      orderItems.push(itemInfo)
    }
   })
   let orderData = {
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+20
   }
   try {
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    const {session_url} = response.data
    window.location.replace(session_url)
   } catch (error) {
    console.log(error)
   }
  }

  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" placeholder='First Name' value={data.first_name} onChange={onChangeHandler} />
          <input required type="text" placeholder='Last Name' value={data.last_name} onChange={onChangeHandler} />
        </div>
        <input required type="email" name="" placeholder='Email address' id="" value={data.email} onChange={onChangeHandler} />
        <input required type="text" placeholder='Street' value={data.street} onChange={onChangeHandler} />
        <div className="multi-fields">
          <input required type="text" placeholder='City' value={data.city} onChange={onChangeHandler} />
          <input required type="text" placeholder='State'value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input required type="text" placeholder='Zip code' value={data.zip_code} onChange={onChangeHandler} />
          <input required type="text" placeholder='Country' value={data.country} onChange={onChangeHandler}/>
        </div>
        <input required type="text" placeholder='Phone' value={data.phone} onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{!getTotalCartAmount()?0:20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{!getTotalCartAmount()?0:getTotalCartAmount()+20}</p>
            </div>
          </div>
          <button >Proceed to Payment</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
