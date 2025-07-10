import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ListCourses from "./ListCourses";
import { fetchCourseList\ } from '../../store/courseListSlice';
import { BrowserRouter } from 'react-router-dom';

// 👇 mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// 👇 Mock hooks
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

const mockedNavigate = vi.fn();

describe("ListCourses Component",() => {

    it("render list of items",() => {
        render(<BrowserRouter><ListCourses /></BrowserRouter>)
    })
})