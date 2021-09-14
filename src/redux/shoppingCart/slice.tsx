import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ShoppingCartState{
    loading: boolean;
    error: string | null;
    items: any[];
}
//定義初始化
const initialState: ShoppingCartState={
    loading: true,
    error: null,
    items: [],
}

export const getShoppingCart = createAsyncThunk( 
    "shoppingCart/getShoppingCart", 
    async(jwt: string, thunkAPI)=>{ //訪問pi時，在header加入jwt信息，故參數放入jwt
        const {data} = await axios.get(
            `http://123.56.149.216:8089/api/shoppingCart`,
            {  
                headers: { //啟用第二個參數
                    Authorization: `bearer ${jwt}`, //要把jwt傳入hearders中
            },
        }
        );  
        return data.shoppingCartItems; //返回的是data中的shoppingCartItems這個字段中的數據
    });

export const addShoppingCartItem = createAsyncThunk(
    "shoppingCart/addShoppingCartItem",
    async( parameters: {jwt: string, touristRouteId: string}, thunkAPI)=>{
        const {data} = await axios.post(
            `http://123.56.149.216:8089/api/shoppingCart/items`, 
            {
                touristRouteId: parameters.touristRouteId,
            },
            {
                headers: {
                Authorization: `bearer ${parameters.jwt}`,
            },
        }
    );
    return data.shoppingCartItems;
  }
);

export const clearShoppingCartItem=createAsyncThunk(
    "shoppingCart/clearShoppingCartItem",
    async( parameters: { jwt: string, itemIds: number[]}, thunkAPI)=>{
     return await axios.delete(
            `http://123.56.149.216:8089/api/shoppingCart/items/(${parameters.itemIds.join(
                ",")})`,
        {
            headers:{
                Authorization: `bearer ${parameters.jwt}`,
            },
        }
        );
    }
);


export const checkout = createAsyncThunk(
    "shoppingCart/checkout",
    async(jwt: string, thunkAPI)=>{
        const {data} = await axios.post(
            `http://123.56.149.216:8089/api/shoppingCart/checkout`, 
            null,
            {
                headers: {
                Authorization: `bearer ${jwt}`,
            },
        }
    );
    return data;
  }
);

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState, //初始化
    reducers:{ //處理請求    
    },
    extraReducers:{
        [getShoppingCart.pending.type]: (state)=>{ 
            state.loading=true; 
        },[getShoppingCart.fulfilled.type]: (state, action)=>{
            state.items=action.payload;
            state.loading=false;
            state.error=null;
        }, [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        },
        [addShoppingCartItem.pending.type]: (state)=>{
            state.loading=true;
        },
        [addShoppingCartItem.fulfilled.type]:(state, action)=>{
            state.items=action.payload;
            state.loading=false;
            state.error=null;
        },[addShoppingCartItem.rejected.type]: (state,action:PayloadAction<string | null>)=>{
            state.loading=false;
            state.error=action.payload;
        },
        [clearShoppingCartItem.pending.type]: (state)=>{
            state.loading=true;
        },[clearShoppingCartItem.fulfilled.type]: (state)=>{
            state.items=[];
            state.loading=false;
        },[clearShoppingCartItem.rejected.type]: (state,action: PayloadAction<string | null>)=>{
            state.loading=false;
            state.error=action.payload;
        },
        [checkout.pending.type]: (state)=>{ 
            state.loading=true; 
        },[checkout.fulfilled.type]: (state, action)=>{
            state.items=[];
            state.loading=false;
            state.error=null;
        }, [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        }
    }
});