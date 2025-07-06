import { describe, expect, it } from "vitest";
import DisplayEnquiry from "./DisplayEnquiry";
import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

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

  const mockData = [{
    "id": "2dae",
    "name": "Dasappan",
    "phoneNumber": "7412589630",
    "email": "jilu_das18@yahoo.co.in",
    "enquiryMessage": "what is C",
    "courseName": "Learn and Master C Programming For Absolute Beginners!"
  }]

  it("renders correct number of rows", () => {
    render(<DisplayEnquiry listOfEnquiry={mockData} />);
    const tbody = screen.getByTestId('table-body');
    const rows = within(tbody).getAllByRole('row');
    expect(rows).toHaveLength(1);
  });

  it("should correct data", () => {
    render(<DisplayEnquiry listOfEnquiry={mockData} />);
    expect(screen.getByText("Dasappan")).toBeInTheDocument();
    expect(screen.getByText("7412589630")).toBeInTheDocument();
  });

  it("should render Back button", () => {
    render(<DisplayEnquiry listOfEnquiry={mockData} />);
    const BackButton = screen.getByRole("button", {
      name: "Back"
    });
    expect(BackButton).toBeInTheDocument();
  });

  it("should click the Back button", async () => {
    user.setup();

    render(
      <MemoryRouter>
        <DisplayEnquiry listOfEnquiry={mockData} />
      </MemoryRouter>
    );

    const BackButton = screen.getByRole("button", { name: "Back" });
    await user.click(BackButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

})