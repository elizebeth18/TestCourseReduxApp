import { describe, it } from "vitest";
import App from "./App";
import {renderWithProviders} from '../utils/test-utils'

describe("Test App",() =>{
    it("render",() => {
        renderWithProviders(<App/>);
    })
})