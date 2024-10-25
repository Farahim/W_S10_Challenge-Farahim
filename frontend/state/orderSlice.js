import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPizzaHx } from "./pizzaSlice";

export const pizzaOrderSubmition = createAsyncThunk(
    'pizzaOrder/pizzaOrderSubmition',
    async (order, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 100))
            const res = await fetch('http://localhost:9009/api/pizza/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            })

            if (!res.ok) {
                const error = await res.json()
                return rejectWithValue(error)
            }
            return await res.json()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const orderSlice = createSlice({
    name: 'pizzaOrder',
    initialState: {
        order: {},
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetState: (state) => {
            state.order = {}
            state.loading = false
            state.error = null
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(pizzaOrderSubmition.pending, (state) => {
            state.loading = true
            state.error = null
            state.success = false
        })
            .addCase(pizzaOrderSubmition.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.order = action.payload
                state.error = null
                fetchPizzaHx()
            })
            .addCase(pizzaOrderSubmition.rejected, (state, action) => {
                state.loading = false
                console.log('Rejected error:', action.payload)
                state.error = action.payload
            })
    }
})

export const { resetState } = orderSlice.actions
export default orderSlice.reducer