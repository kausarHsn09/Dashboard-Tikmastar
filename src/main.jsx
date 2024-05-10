import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from './store.js';
import App from './App.jsx'
import './index.css'



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={client}>
       
    <App />
    </QueryClientProvider>
     </Provider>
  </React.StrictMode>,
)
