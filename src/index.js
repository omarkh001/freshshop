import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TokenContextProvider from './Context/Token';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "../node_modules/react-query/es/devtools/devtools";
import CartContextProvider from './Context/Cart';
import WishlistContextProvider from "./Context/Wishlist"
const root = ReactDOM.createRoot(document.getElementById('root'));
let qurey=new QueryClient()
root.render(
  <WishlistContextProvider>
  <CartContextProvider>
  <QueryClientProvider client={qurey}>
  <React.StrictMode>
 <TokenContextProvider>
 <App />
 </TokenContextProvider>
  </React.StrictMode>

  </QueryClientProvider>
  </CartContextProvider>
  </WishlistContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
