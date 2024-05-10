import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './src/features/authSlice'
export const store = configureStore({
  reducer: {
    auth:authSlice, 
  },
})