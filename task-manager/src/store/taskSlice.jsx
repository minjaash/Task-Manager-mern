import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const  Uri=process.env.REACT_APP_API_URL;

const initialStateValues={
    allTasks:[]
}

const taskSlice=createSlice({
    name:'tasks',
    initialState:initialStateValues,
    reducers:{
        setTasks:(state,action)=>{
            console.log('action',action.payload)
          state.allTasks=action.payload
          console.log('redux is working')
        }
    }
})
export const {setTasks}=taskSlice.actions;
export default taskSlice.reducer;