import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductDetailState{
    data: any,
    loading: boolean,
    error: string | null
}
//定義初始化
const initialState: ProductDetailState={
    data: [],
    loading: true,
    error: null
}

export const getProductDetail = createAsyncThunk( 
    "productDetail/getProductDetail", //slice action名稱/外接action名稱
    async(touristRouteId: string, thunkAPI)=>{ //要處理api異步處理的請求，故第一個參數傳入產品的id，第二個傳入thunkAPI
                const {data} = await axios.get(
                    `http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`
                );  
            return  data; //會返回一個promise，getProductDetail全權自行處理panding..
                });

export const productDetailSlice = createSlice({
    name: "productDetail",
    initialState, //初始化
    reducers:{}, //處理請求 
    extraReducers:{
        [getProductDetail.pending.type]: (state)=>{ 
            state.loading=true; 
        },[getProductDetail.fulfilled.type]: (state, action)=>{
            state.data=action.payload;
            state.loading=false;
            state.error=null;
        }, [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        },
    }
});