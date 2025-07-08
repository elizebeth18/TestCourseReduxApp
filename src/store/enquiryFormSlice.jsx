import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isEnquirySuccess: false
}

export const submitEnquiry = createAsyncThunk('enquiryForm/submitEnquiry', async (data) => {
    try {
        const response = await axios.post("http://localhost:9112/enquiry", JSON.stringify(data), {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (err) {
        return err;
    }
});

const enquiryFormSlice = createSlice({
    name: 'enquiryForm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(submitEnquiry.pending, (state) => {
                state.isEnquirySuccess = false;
            })
            .addCase(submitEnquiry.fulfilled, (state) => {
                state.isEnquirySuccess = true;
            })
            .addCase(submitEnquiry.rejected, (state) => {
                state.isEnquirySuccess = false;
            })
    },
});

export const selectEnquiryIsSuccess = state => state.enquiryForm.isEnquirySuccess; 
export default enquiryFormSlice.reducer;