import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loginerror: "",
    username: "",
    email: "",
    authtoken: "",
    acctype: "",
    expense: { categories: [], entries: [],total:0 },
    income: { categories: [], entries: [],total:0 },
    investment: { categories: [], entries: [],total:0 },
    isloading: false,
    isloggedin: false,
    rerenderExpense: false,
    rerenderIncome: false,
    rerenderInvestment: false,
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
        },
        loadtotal:(state,{payload}) => {
            const type = payload.type;
            state[type].total = payload.total;
        },
        setrerenderExpense:(state) => {
            state.rerenderExpense = !state.rerenderExpense;
        },
        setrerenderIncome:(state) => {
            state.rerenderIncome = !state.rerenderIncome;
        },
        setrerenderInvestment:(state) => {
            state.rerenderInvestment = !state.rerenderInvestment;
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
        loadtotal,
        setrerenderExpense,
        setrerenderIncome,
        setrerenderInvestment
    } = userSlice.actions;
export default userSlice.reducer;