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
            payload: {isLoading: true, enquiresList: []}
        }
        const state = viewEnquiresReducer(initialState, mockAction);
        expect(state.isLoading).toBeTruthy();
        expect(state.enquiresList).toHaveLength(0);
    })
})
