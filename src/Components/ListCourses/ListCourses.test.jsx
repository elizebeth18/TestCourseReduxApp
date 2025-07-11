import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ListCourses from "./ListCourses";
import courseListReducer, { fetchCourseList, selectCourseList } from '../../store/courseListSlice';

// 👇 mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedNavigate = vi.fn();

vi.mock('../../store/courseListSlice', async () => {
  const actual = await vi.importActual('../../store/courseListSlice');
  return {
    ...actual,
    fetchCourseList: () => () => { }, // stub thunk
  }
})

describe("ListCourses Component", () => {
  it("renders correctly", () => {

    const mockStore = configureStore({
      reducer: {
        courseList: courseListReducer,
      },
      preloadedState: {
        courseList: {
          listOfCourses: [
            {
              "name": "Cloud Computing",
              "fee": "24500",
              "img": "https://miro.medium.com/max/469/1*24oTbi-r9SXkkJjtV2_B2A.png",
              "details": "Cloud computing",
              "id": "a70f"
            },
          ],
          isLoading: false,
          error: null,
        },
      },
    });
    render(<Provider store={mockStore}>
      <ListCourses />
    </Provider>);
  })
})

