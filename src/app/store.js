import {
    configureStore
} from "@reduxjs/toolkit";
import nationsReducer from '../features/CovidTracker/nationsSlice';
import covidReducer from "../features/CovidTracker/covidSlice";

const rootReducer = {
    nations: nationsReducer,
    covidcases: covidReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;