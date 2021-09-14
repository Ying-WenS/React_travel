import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

interface orderState{
    currentOrder: any,
    loading: boolean,
    error: string | null
}

const initialState: orderState={
    currentOrder: null,
    loading: false,
    error: null
}

export const placeOrder = createAsyncThunk( 
    "order/placeOrder", 
    async(parameters: {jwt: string, orderId: string}, thunkAPI)=>{ 
                const {data} = await axios.post(
                    `http://123.56.149.216:8089/api/orders/${parameters.orderId}/placeOrder`,
                    null, {
                        headers: {
                            Authorization: `bearer ${parameters.jwt}`,
                        },
                    }
                );  
                return  data;
                });

export const orderSlice = createSlice({
    name: "order",
    initialState, 
    reducers:{ 
    },
    extraReducers:{
        [placeOrder.pending.type]: (state)=>{ 
            state.loading=true; 
        },
        [placeOrder.fulfilled.type]: (state, action)=>{
            state.currentOrder=action.payload;
            state.loading=false;
            state.error=null;
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        },
        [checkout.pending.type]: (state)=>{ 
            state.loading=true; 
        },
        [checkout.fulfilled.type]: (state, action)=>{
            state.currentOrder=action.payload; //把checkout的資料存在currentOrder
            state.loading=false;
            state.error=null;
        },
        [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        }
    }
});