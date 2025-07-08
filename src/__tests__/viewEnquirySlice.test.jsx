import viewEnquiresReducer, { fetchEnquiresList } from '../store/viewEnquiresSlice';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

describe("ViewEnquries ExtraReducer", () => {
    const initialState = {
        enquiresList: [],
        isLoading: false,
        error: null
    }
    it("should render pending", () => {
        const mockAction = {
            type: fetchEnquiresList.pending.type,
            payload: { isLoading: true, enquiresList: [] }
        }
        const state = viewEnquiresReducer(initialState, mockAction);
        expect(state.isLoading).toBeTruthy();
        expect(state.enquiresList).toHaveLength(0);
    });

    it("should render fuilfilled", () => {
        const mockAction = {
            type: fetchEnquiresList.fulfilled.type,
            payload: [
                {
                    "id": "2dae",
                    "name": "Dasappan",
                    "phoneNumber": "7412589630",
                    "email": "jilu_das18@yahoo.co.in",
                    "enquiryMessage": "what is C",
                    "courseName": "Learn and Master C Programming For Absolute Beginners!",
                    "errors": {
                        "enquiryMessage": ""
                    }
                }]
        }
        const state = viewEnquiresReducer(initialState, mockAction);
        expect(state.enquiresList).toEqual(mockAction.payload);
        expect(state.isLoading).toBeFalsy();
        expect(state.error).toBeNull();
    });

    it("should render rejected", () => {
        const mockAction = {
            type: fetchEnquiresList.rejected.type,
            error: {
                message: "Failed to load data"
            }
        }
        const state = viewEnquiresReducer(initialState, mockAction);
        expect(state.error).toEqual(mockAction.error.message);
        expect(state.isLoading).toBeFalsy();
    });
})
