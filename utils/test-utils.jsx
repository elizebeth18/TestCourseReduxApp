import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// As a basic setup, import your same slice reducers
import courseListReducer from "../src/store/courseListSlice";
import enquiryFormReducer from "../src/store/enquiryFormSlice";
import viewEnquiresReducer from "../src/store/viewEnquiresSlice";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        courseList: courseListReducer,
        enquiryForm: enquiryFormReducer,
        viewEnquires: viewEnquiresReducer
    },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}