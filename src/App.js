import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Regester from './Components/Regester/Regester';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import { useEffect } from 'react';
import { useContext } from 'react';
import { TokenContext } from './Context/Token';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Details from './Components/Details/Details';
import Checkout from "./Components/Checkout/Checkout"
import  Allorders from "./Components/Allorders/Allorders"
import Wishlist from "./Components/Wishlist/Wishlist"
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import Restpassword from './Components/Restpassword/Restpassword';
function App() {
let {setToken}=useContext(TokenContext)

const routes= createBrowserRouter([
  {path:"",element:<Layout/> ,children :[
    {path:"freshshop/home" ,element: <ProtectedRoutes><Home/></ProtectedRoutes> },
    {path:"freshshop/products",element: <ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:"freshshop/brands",element: <ProtectedRoutes><Brands/></ProtectedRoutes>},
    {path:"freshshop/wishlist",element: <ProtectedRoutes><Wishlist/></ProtectedRoutes>},
    {path:"freshshop/categories",element: <ProtectedRoutes><Categories/></ProtectedRoutes>},
    {path:"freshshop/cart",element: <ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:"freshshop/checkout",element: <ProtectedRoutes><Checkout/></ProtectedRoutes>},
    {path:"freshshop/details/:id",element: <ProtectedRoutes><Details/></ProtectedRoutes>},
    {path:"allorders",element: <ProtectedRoutes><Allorders/></ProtectedRoutes>},      
    {path:"freshshop", index:true,element:<Login/>},
    {path:"freshshop/login",element:<Login/>},
    {path:"freshshop/regester",element:<Regester/>},
    {path:"freshshop/forgetpassword",element:<Forgetpassword/>},
    {path:"freshshop/restpassword",element:<Restpassword/>},
    {path:"*",element:<Notfound/>},
  ]}
])

useEffect(()=>{
if(localStorage.getItem("userToken")!=null){
  setToken(localStorage.getItem("userToken"))
}


},[])


  return <RouterProvider router={routes}></RouterProvider>
}

export default App;
