import React from 'react';
import { describe,it } from "vitest";
import ListCourses from "./ListCourses";
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
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