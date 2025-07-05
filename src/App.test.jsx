import { render,screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Test App",() =>{
    it("render h1 element",()=>{
        render(<App/>);
        const h1Element = screen.getByRole("heading");
        expect(h1Element).toBeInTheDocument();
    })
})