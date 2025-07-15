import enquiryFormReducer, { submitEnquiry } from '../store/enquiryFormSlice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('axios');

describe("renders extra reducers", () => {

    const initialState = {
        isEnquirySuccess: false
    }

    it("should render pending state correctly", () => {
        const action = { type: submitEnquiry.pending.type };
        const state = enquiryFormReducer(initialState, action);
        expect(state.isEnquirySuccess).toBeFalsy();
    });

    it("renders fulfilled state correctly", () => {
        const action = { type: submitEnquiry.fulfilled.type };
        const state = enquiryFormReducer(initialState, action)
        expect(state.isEnquirySuccess).toBeTruthy();
    });

    it("renders rejected state correctly", () => {
        const action = { type: submitEnquiry.rejected.type };
        const state = enquiryFormReducer(initialState, action);
        expect(state.isEnquirySuccess).toBeFalsy();
    });
})

describe("enquiryForm/submitEnquiry thunk", () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: enquiryFormReducer,
        })
    });

    it('renders success', async () => {
        // Mocks axios.post() so it doesn't actually hit a server
        // It will resolve once with { data: { success: true } }
        const mockData = { success: true };
        axios.post.mockResolvedValueOnce({ data: mockData });

        //This is the data you're "submitting" via the thunk
        const thunkArg = {
            "name": "Dasappan",
            "phoneNumber": "7412589630",
            "email": "jilu_das18@yahoo.co.in",
            "enquiryMessage": "what is C",
            "courseName": "C",
            "errors": {
                "enquiryMessage": ""
            }
        };
        //Here u'r manually calling the thunk like Redux Toolkit does under the hood.
        // The thunk function returned by createAsyncThunk is actually a thunk creator 
        // you pass in the data, then call it with: (dispatch, getState, extraArgument)
        const result = await submitEnquiry(thunkArg)(vi.fn(), () => ({}), undefined);

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:9112/enquiry',
            JSON.stringify(thunkArg),
            {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        expect(result.payload).toEqual(mockData);

    });

    it("renders error state", async () => {
        const error = new Error('Request failed');
        axios.post.mockRejectedValueOnce(error);

        const result = await submitEnquiry({})(vi.fn(), () => ({}), undefined);
        expect(result.payload).toBe(error);
    })
})