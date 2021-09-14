import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface ProductSearchState{
    data: any,
    loading: boolean,
    error: string | null,
    pagination: any,
}
//定義初始化
const initialState: ProductSearchState={
    data: null,
    loading: true,
    error: null,   
    pagination: null,
}

export const searchProduct = createAsyncThunk( 
    "productSearch/searchProduct", //外接action名稱
    async(parameters:{ 
        keywords: string,
        nextPage: number | string,
        pageSize: number | string,
    }, thunkAPI)=>{ 
        let url = 
        `http://123.56.149.216:8089/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`
        if (parameters.keywords){
            url += `&keyword${parameters.keywords}`;
        }
        const response = await axios.get(url);  
        return {
            data: response.data,
            pagination: JSON.parse(response.headers["x-pagination"]),
        };
        });

export const productSearchSlice = createSlice({
    name: "productSearch",
    initialState, //初始化
    reducers:{},
    extraReducers:{
        [searchProduct.pending.type]: (state)=>{ 
            state.loading=true; 
        },[searchProduct.fulfilled.type]: (state, action)=>{
            state.data=action.payload.data; //要處理搜索列表從url取得
            state.pagination=action.payload.pagination;//從上面url取得
            state.loading=false;
            state.error=null;
        }, [searchProduct.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading=false;
            state.error= action.payload;
        },
    },
});