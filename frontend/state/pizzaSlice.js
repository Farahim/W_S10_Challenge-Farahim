import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzaHx = createAsyncThunk(
    'pizza/fetchPizzaHx',
    async () => {
        const res = await fetch('http://localhost:9009/api/pizza/history')
        const data = await res.json()
        return data
    }
)

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        loading: false,
        history: [],
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzaHx.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchPizzaHx.fulfilled, (state, action) => {
                state.loading = false
                state.history = action.payload
                state.error = ''
            })
            .addCase(fetchPizzaHx.rejected, (state, action) => {
                state.loading = false
                state.history = []
                state.error = action.error.message

            })
    }

})

export default pizzaSlice.reducer