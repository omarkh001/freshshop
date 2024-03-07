import axios from "axios";
import { createContext } from "react";


 export let WishlistContext=createContext()


function addTOWishlist(id){
 return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
    productId:id
  },{
    headers:{
      token:localStorage.getItem("userToken")
    }
  }).then((res)=>res).catch((err)=>err)
   

}
function getWishlist(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist"
     ,{
     headers:{
       token:localStorage.getItem("userToken")
     }
   }).then((res)=>res).catch((err)=>err)
    
 
 }

 function deleteWishlist(id){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
     ,{
     headers:{
       token:localStorage.getItem("userToken")
     }
   }).then((res)=>res).catch((err)=>err)  
    
 
 }

  export default function WishlistContextProvider(props){


    return<WishlistContext.Provider value={{addTOWishlist,getWishlist,deleteWishlist}}>

        {props.children}

    </WishlistContext.Provider>
 }