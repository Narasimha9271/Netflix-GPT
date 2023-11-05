import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        //as soon as login this reducer action will be dispatched which will add to redux store
        addUser: (state, action) => {
            return action.payload; //this action.payload will get replaced with null in initialstate
        },
        //as soon as log out this reducer action will be dispatched which will remove tin redux store
        removeUser: (state, action) => {
            return null;
        },
    },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
