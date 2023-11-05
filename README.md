# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

### Storing users data using redux

#### 1) Create a appStore which have configureStore which stores reducer and that reducer store all diff reducers from diff slices

#### 2) create a userSlice which have createSlice and in that it have name,initialState,reducers(in this actions will be there) and export all reducers and actions

#### 3)Add userReducer from userSLice.js to appSlice.js

#### 4)Set up the store is successfull so you provide store to our app as like as <Provider store={appStore}>

            <Body />
        </Provider>

#### 5)
