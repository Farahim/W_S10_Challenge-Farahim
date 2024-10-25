import { configureStore } from '@reduxjs/toolkit'
import pizzaReducer from './pizzaSlice'
import orderReducer from './orderSlice'
import filterReducer from './filterSlice'
//import { getDefaultNormalizer } from '@testing-library/react'

export const resetStore = () => configureStore({
  reducer: {
    pizza: pizzaReducer,
    pizzaOrder: orderReducer,
    sizeFilter: filterReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export const store = resetStore()
export default store
