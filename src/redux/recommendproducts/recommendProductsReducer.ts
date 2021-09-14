import { FETCH_RECOMMEND_PRODUCTS_FAIL, 
    FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    FETCH_RECOMMEND_PRODUCTS_START, 
    RecommendProductAction 
} from "./recommendProductsActions";

interface RecommendProductsState{
    productList: any[];
    loading: boolean; //因為是api請求故要考慮加載和錯誤
    error: string | null;
}
//定義初始化的默認數據
const defaultState: RecommendProductsState={
    loading: true,
    error: null,
    productList: []
};

export default (state= defaultState, action: RecommendProductAction)=>{
    switch(action.type){
        case FETCH_RECOMMEND_PRODUCTS_START:
            return {...state, loading: true}; //只有加載要變其餘不變
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return {...state, loading: false, productList: action.payload };
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return {...state, error: action.payload, loading: false};
        default:
            return state;
    }
}