import { describe, expect, it } from "vitest";
import DisplayEnquiry from "./DisplayEnquiry";
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// 👇 mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const mockedNavigate = vi.fn();

describe("DisplayEnquires Component", () => {

  const mockData = {
    "id": "2dae",
    "name": "Dasappan",
    "phoneNumber": "7412589630",
    "email": "jilu_das18@yahoo.co.in",
    "enquiryMessage": "what is C",
    "courseName": "Learn and Master C Programming For Absolute Beginners!"
  }

  it("renders correct number of rows", () => {
    render(<DisplayEnquiry listOfEnquiry={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(1)
  })
})