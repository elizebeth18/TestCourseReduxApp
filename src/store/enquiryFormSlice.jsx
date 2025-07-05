import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isSuccess: false
}

export const postEnquiryForm = createAsyncThunk('enquiry/post', async (data) => {
    const response = await axios.post("http://localhost:9112/enquiry", JSON.stringify(data), {
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return response.data;
})

const enquirySlice = createSlice({
    name: 'enquiryForm',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(postEnquiryForm.pending, state => {
                state.isSuccess = false;
            })
            .addCase(postEnquiryForm.fulfilled, (state, action) => {
                state.isSuccess = true;
            })
            .addCase(postEnquiryForm.rejected, (state, action) => {
                state.isSuccess = false;
            })
    }
});

export default enquirySlice.reducer;