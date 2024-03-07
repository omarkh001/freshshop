import axios from "axios";

const { createContext, useState, useEffect } = require("react");


export let CartContext=  createContext();




 function addToCart(id){
  return  axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
    productId:id    
    },{
        headers:{
            token:localStorage.getItem("userToken") ,
        }
        
    }).then((res)=>res).catch((err)=>err)
 }



 function getCart(){
    return  axios.get("https://ecommerce.routemisr.com/api/v1/cart",
    
      {
          headers:{
              token:localStorage.getItem("userToken") ,
          }
          
      }).then((res)=>res).catch((err)=>err)
   }

   function removeCart(){
    return  axios.delete("https://ecommerce.routemisr.com/api/v1/cart",
    
      {
          headers:{
              token:localStorage.getItem("userToken") ,
          }
          
      }).then((res)=>res).catch((err)=>err)
   }





   function deleteFromCart(id){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    
      {
          headers:{
              token:localStorage.getItem("userToken") ,
          }
          
      }).then((res)=>res).catch((err)=>err)
   }


   function updateCart(id,count){
    return  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        count:count
    },
    
      {
          headers:{
              token:localStorage.getItem("userToken") ,
          }
          
      }).then((res)=>res).catch((err)=>err)
   }







export default function CartContextProvider(props){
    function onlinePayment(shippingAddress){
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
            shippingAddress
        },
        
          {
              headers:{
                  token:localStorage.getItem("userToken") ,
              }
              
          }).then((res)=>res).catch((err)=>err)
    }

    const[number,setnumber]=useState(null)
    const[cartId,setcartId]=useState(null)

async function getInitialgetCart(){
let {data}=await getCart()
setnumber(data?.numOfCartItems)
setcartId(data?.data._id)
}


useEffect(()=>{
    getInitialgetCart();
//  getCart()
},[])


    return<CartContext.Provider value={{addToCart,getCart,deleteFromCart,updateCart,setnumber,number,onlinePayment,removeCart}}>
        {props.children}
    </CartContext.Provider>
}