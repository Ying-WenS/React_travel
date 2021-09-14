import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START=
    "FETCH_RECOMMEND_PRODUCTS_START"; //正在調用推薦訊息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS=
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; 
export const FETCH_RECOMMEND_PRODUCTS_FAIL=
    "FETCH_RECOMMEND_PRODUCTS_FAIL"; 

interface FetchRecommendProductStartAction{
    type: typeof FETCH_RECOMMEND_PRODUCTS_START 
}
interface FetchRecommendProductSuccessAction{
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}
interface FetchRecommendProductFailAction{
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL ,
    payload: any
}
export type RecommendProductAction=
    FetchRecommendProductStartAction |
    FetchRecommendProductSuccessAction |
    FetchRecommendProductFailAction;
//action創建工廠
export const fetchRecommendProductStartActionCreator=(): FetchRecommendProductStartAction =>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START,
    };
}
export const fetchRecommendProductSuccessActionCreator=(data): FetchRecommendProductSuccessAction =>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data //成功的資料
    };
}
export const fetchRecommendProductFailActionCreator=(error): FetchRecommendProductFailAction =>{
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error //失敗的錯誤訊息
    };
}

export const giveDataActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductAction> =>
    async (dispatch, getState)=>{
    dispatch(fetchRecommendProductStartActionCreator())
        try {
            const {data} = await axios.get("http://123.56.149.216:8089/api/productCollections"
            );
            dispatch(fetchRecommendProductSuccessActionCreator(data))
        } catch (error) {
            dispatch(fetchRecommendProductFailActionCreator(error.message))
        }
}