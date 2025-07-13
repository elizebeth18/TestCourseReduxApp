import { beforeEach, describe, expect, it } from "vitest";
import EnquiryForm from "./EnquiryForm";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

// Mock hooks
vi.mock("react-redux", () => ({
    useDispatch: vi.fn()
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
        useSearchParams: vi.fn(),
    }
});

const mockedNavigate = vi.fn();
//const mockedSearchParams = vi.fn();

describe("EnquiryForm", () => {
    let mockDispatch;
    let mockSetSearchParams;

    /**     beforeEach: 
     * beforeEach is a setup function that runs before every individual test in a test suite.It’s used to prepare the test environment—like resetting mocks, initializing variables, rendering components, etc. */

    beforeEach(() => {
        mockDispatch = vi.fn();
        useDispatch.mockReturnValue(mockDispatch);

        mockSetSearchParams = vi.fn();
        useSearchParams.mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
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
        
        expect(screen.getByRole('button',{name:'Submit'})).toBeInTheDocument();
    })
})