import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { tokenToString } from "typescript";
interface userState{
    token: string | null, //後端傳來的數據是JWT token
    loading: boolean,
    error: string | null
}
//定義初始化
const initialState: userState={
    token: null,
    loading: false,
    error: null,
};

export const signIn = createAsyncThunk( 
    "user/singIn", //store名稱/外接action名稱
    async(parameters:{
        email: string,
        password: string
    }, thunkAPI)=>{ //要處理api異步處理的請求，故第一個參數傳入產品的id，第二個傳入thunkAPI
                const {data} = await axios.post(
                    `http://123.56.149.216:8089/auth/login`,{
                        email: parameters.email,
                        password:  parameters.password
                    }
                );  
            return  data.token; //
                });

export const userSlice = createSlice({
    name: "user",
    initialState, //初始化
    reducers:{ 
        logOut:(state)=>{
            state.token= null;
            state.loading= false;
            state.error= null;
        },
    },
    extraReducers:{
        [signIn.pending.type]: (state)=>{ 
            state.loading=true; 
        },[signIn.fulfilled.type]: (state, action)=>{
            state.token=action.payload;
            state.loading=false;
            state.error=null;
        }, [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        },
    }
});