import { beforeEach, describe, expect, it } from "vitest";
import EnquiryForm from "./EnquiryForm";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userEvent from '@testing-library/user-event';
import { submitEnquiry } from '../../store/enquiryFormSlice';

// 🔧 Mocks
vi.mock('react-redux', async () => {
    const actual = await vi.importActual('react-redux');
    return {
        ...actual,
        useDispatch: vi.fn()
    };
});

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
        useSearchParams: vi.fn(),
    }
});

vi.mock('../../store/enquiryFormSlice', () => ({
    submitEnquiry: vi.fn()
}));


describe("EnquiryForm", () => {
    const mockDispatch = vi.fn();
    const mockNavigate = vi.fn();

    /**     beforeEach: 
     * beforeEach is a setup function that runs before every individual test in a test suite.It’s used to prepare the test environment—like resetting mocks, initializing variables, rendering components, etc. */

    beforeEach(() => {
        vi.clearAllMocks();

        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);
        useSearchParams.mockReturnValue([new URLSearchParams('courseName=React Native'),
        vi.fn()]);
    });

    it("renders form", () => {
        render(<EnquiryForm />);
        expect(screen.getByText("Name")).toBeInTheDocument();
        const inputElement = screen.getByPlaceholderText('Name');
        expect(inputElement).toBeInTheDocument();

        expect(screen.getByText('Phone Number')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();

        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();

        expect(screen.getByText('Leave Your Message')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Leave Your Message')).toBeInTheDocument();

        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it("renders name field upon entering text", async () => {
        userEvent.setup();
        render(<EnquiryForm />);
        await userEvent.type(screen.getByPlaceholderText('Name'), 'Jilu');
        await userEvent.type(screen.getByPlaceholderText('Phone Number'), '9876543210');
        await userEvent.type(screen.getByPlaceholderText('Email'), 'test@gmail.com');
        await userEvent.type(screen.getByPlaceholderText('Leave Your Message'), 'Im interested in the course');

        await userEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(submitEnquiry).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Jilu',
            phoneNumber: '9876543210',
            email: 'test@gmail.com',
            enquiryMessage: 'Im interested in the course',
            courseName: 'React Native'
        }));

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/viewEnquires', { replace: true });
    });

    it("does not submit if mandatory fields are empty", async () => {
        const user = userEvent.setup();
        render(<EnquiryForm />);

        await user.click(screen.getByRole('button',{name:'Submit'}));
        
        expect(screen.getByText(/First name is Required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is Required/i)).toBeInTheDocument();
        expect(mockDispatch).not.toHaveBeenCalled();

    })
})