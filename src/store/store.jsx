import { combineReducers,configureStore } from "@reduxjs/toolkit";
import courseListReducer from "./courseListSlice";
import enquiryFormReducer from "./enquiryFormSlice";
import viewEnquiresReducer from "./viewEnquiresSlice";

const rootReducer = combineReducers({
        courseList: courseListReducer,
        enquiryForm: enquiryFormReducer,
        viewEnquires: viewEnquiresReducer
    });

const store = (preloadedState) =>{
    return configureStore({
    reducer: rootReducer,
    preloadedState
})};

export default store;