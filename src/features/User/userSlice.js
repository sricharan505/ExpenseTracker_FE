import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginerror: "",
    username: "",
    email: "",
    authtoken:"",
    acctype: "",
    expense: { categories: [], entries: [] },
    income: { categories: [], entries: [] },
    investment: { categories: [], entries: [] },
    isloading: false,
    isloggedin: false,
};

const userSlice =  createSlice({
    name:"user",
    initialState,
    reducers:{
        setisloading:(state,action) => {
            state.isloading = action.payload.isloading;
        },
        setloginerror:(state,action) => {
            state.loginerror = action.payload.loginerror;
        },
        login:(state,{ payload }) => {
            state.username = payload.username;
            state.email = payload.email;
            state.authtoken = payload.authtoken;
            state.acctype = payload.acctype;
            state.isloggedin = payload.isloggedin;
        },
        loadtypes:(state,{ payload }) => {
            if(payload.expense)
            {
                state.expense = payload.expense
            }

            if (payload.income) 
            {
                state.income = payload.income;
            }

            if (payload.investment) 
            {
                state.investment = payload.investment;
            }
        },
        loadcategories: (state,{ payload }) => {
            const type = payload.type;
            const categories = payload.categories;
            state[type].categories = categories;
        },
        loadentries:(state,{payload}) => {
            const type = payload.type;
            const entries = payload.entries;

            state[type].entries = entries;
        }
    }
});

export const { 
        setisloading,
        setloginerror, 
        login, 
        loadtypes,
        loadcategories, 
        loadentries, 
        
    } = userSlice.actions;
export default userSlice.reducer;