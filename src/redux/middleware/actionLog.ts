import { Middleware } from "redux";

export const actionLog: Middleware = (store)=>(next)=>(action)=>{
    console.log("更新前的state：", store.getState());
    console.log("被攔截的action： ", action)
    next(action); //sate被更新之後的action
    console.log("更新後的state：", store.getState())
}