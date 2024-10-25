import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
    name: 'sizeFilter',
    initialState: 'All',
    reducers: {
        setSizeFilter: (state, action) => action.payload
    }
})

export const { setSizeFilter } = filterSlice.actions

export const filterHistory = (state) => {

    const zaHistory = state.pizza.history
    const zaSize = state.sizeFilter

    return zaSize === 'All' ? zaHistory : zaHistory.filter(pizza => pizza.size === zaSize)

}

export default filterSlice.reducer