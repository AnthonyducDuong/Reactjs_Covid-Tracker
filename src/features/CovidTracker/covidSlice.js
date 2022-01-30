import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import covidApi from "../../api/covidApi";

export const getCovidCasesByNation = createAsyncThunk(
    'covid/getCovidCasesByNation',
    async (nation) => {
        const covidCasesList = await covidApi.get(nation);
        // console.log('>>>Check slice: ', covidCasesList.pop());
        return covidCasesList;
    }
)

const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getCovidCasesByNation.pending]: (state) => {
            state.status = 'loading';
        },
        [getCovidCasesByNation.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = 'success';
        },
        [getCovidCasesByNation.rejected]: (state) => {
            state.status = 'failed';
        }
    }
})

const {
    reducer: covidReducer
} = covidSlice;
export default covidReducer;