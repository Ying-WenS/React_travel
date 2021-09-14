import { createStore, applyMiddleware } from "redux";
import languageReducer  from "./language/languageReducer";
import recommendProductsReducer from "./recommendproducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middleware/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import {addShoppingCartItem, shoppingCartSlice} from "./shoppingCart/slice";
import { orderSlice } from "./order/slice";
const persistConfig={
    key: "root", //命名空間
    storage, //儲存在本地，因是默認
    whitelist: ["user"] //是rootReducer的user，意思是保存這個其他都不要
}

export const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer,applyMiddleware(thunk, actionLog));
const store = configureStore ({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog ],
    devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export default {store , persistor};