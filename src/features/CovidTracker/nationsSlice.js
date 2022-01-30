import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";
import nationApi from "../../api/nationApi";

export const getNations = createAsyncThunk(
    'nations/getNations',
    async () => {
        const nationsList = await nationApi.getAll();

        //return array nations list sort by name
        return nationsList.sort((a, b) => {
            let tempA = a.Slug,
                tempB = b.Slug;

            if (tempA < tempB) {
                return -1;
            }
            if (tempB > tempA) {
                return 1;
            }
            return 0;
        })
    }
)

const nationsSlice = createSlice({
    name: 'nations',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getNations.pending]: (state) => {
            state.status = 'loading';
        },
        [getNations.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = 'success';
        },
        [getNations.rejected]: (state) => {
            state.status = 'failed';
        }
    }
})

const {
    reducer: nationsReducer
} = nationsSlice;
export default nationsReducer;