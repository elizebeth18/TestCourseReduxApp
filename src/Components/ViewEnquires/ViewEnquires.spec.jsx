import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ViewEnquires from './ViewEnquires';

describe("ViewEnquires Component", () => {
    it("render", () => {
        render(<ViewEnquires />);
        const headingElement = screen.getByText("List of Enquires");
        expect(headingElement).toBeInTheDocument()
    })
})