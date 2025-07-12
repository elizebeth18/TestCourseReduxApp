import { describe,it } from "vitest";
import EnquiryForm from "./EnquiryForm";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate, useSearchParams } from "react-router-dom";

vi.mock('react-router-dom',() =>{
    const actual = vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
        useSearchParams:() => mockedSearchParams,
    }
});

const mockedNavigate = vi.fn();
const mockedSearchParams = vi.fn();

describe("EnquiryForm",() => {
    it("renders form",() => {
        render(<EnquiryForm />)
    })
})