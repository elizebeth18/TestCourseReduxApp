import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    enquiresList:[],
    isLoading: false,
    error: null
}

export const fetchEnquiresList = createAsyncThunk('viewEnquiresList/get', async() => {
     const response = await axios.get('http://localhost:9112/enquiry')
     return response.data;
})

const viewEnquires = createSlice({
    name: 'viewEnquires',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEnquiresList.pending, state => {
            state.isLoading = true
        })
        .addCase(fetchEnquiresList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.enquiresList = action.payload;
        })
        .addCase(fetchEnquiresList.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoading = false;
        })
    }
});

export default viewEnquires.reducer;