import {createSlice} from "@reduxjs/toolkit"


export const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn:false,
        user:null
    },
    reducers:{
        login:(state,action)=>{
            if(action.payload){
                state.isLoggedIn=true
                state.user= action.payload
                console.log("action", action.payload)
            }
            else{
                console.log("Login failed")
            }
        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.user=null

        },
        registerUser:(state,{payload})=>{
            //console.log('registering', payload)
            return {...state,...payload};
            

        },
        

    }
})


export const {login, logout} = authSlice.actions
export default authSlice.reducer