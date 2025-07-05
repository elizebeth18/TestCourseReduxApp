import courseListReducer,{fetchCourseList} from "../store/courseListSlice";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('fetchCourseList thunk', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        course: courseListReducer,
      },
    });
  });

  it('handles success response correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: {
        "name": "Cloud Computing",
        "fee": "24500",
        "img": "A.png",
        "details": "Cloud computing"
      } });

    await store.dispatch(fetchCourseList());

    const state = store.getState().course;
    expect(state.isLoading).toBe(false);
    expect(state.listOfCourses).toEqual({
        "name": "Cloud Computing",
        "fee": "24500",
        "img": "A.png",
        "details": "Cloud computing"});
  });

  it("handles error response", async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    await store.dispatch(fetchCourseList());

    const state = store.getState().course;
    expect(state.error).toBe("Network Error")
  });

});


describe('courseList extraReducers', () => {

  const initialState = {
        listOfCourses: [],
        isLoading : false,
        error: null
    };

  it('should handle fetchCourseList.pending', () => {
    const action = { type: fetchCourseList.pending.type };
    const state = courseListReducer(initialState, action);
    expect(state.listOfCourses).toHaveLength(0);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle fetchCourseList.fulfilled",() => {

    const mockCourse = {
        "name": "Cloud Computing",
        "fee": "24500",
        "img": "https://miro.medium.com/max/469/1*24oTbi-r9SXkkJjtV2_B2A.png",
        "details": "Cloud computing"
    }
    const action = {
        type: fetchCourseList.fulfilled.type,
        payload: mockCourse,
    };
    const state = courseListReducer(initialState,action);
    expect(state.listOfCourses).toEqual(mockCourse);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("should handle fetchCourseList.rejected",() => {
    const action = {
        type: fetchCourseList.rejected.type,
        error: {message: "Failed to fetch courses"}
    };
    const state = courseListReducer(initialState,action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Failed to fetch courses")
  })

});