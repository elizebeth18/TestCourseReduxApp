import { render,screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import axios from 'axios';
import {renderWithProviders} from '../utils/test-utils'

describe("Test App",() =>{
    it("render h1 element",()=>{
        renderWithProviders(<App/>);
    })
})