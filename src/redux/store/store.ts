import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../slices/weatherSlice'

const store = configureStore({
  reducer: { weather: weatherReducer },
})

export type AppDispatch = typeof store.dispatch
export default store
