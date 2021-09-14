import i18n from "i18next";
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState{
    language: "en" | "zh"
    languageList: {name: string, code: string}[]
}
const defaultState: LanguageState ={
    language: "zh",
    languageList: [
        {name: "中文", code: "zh"},
        {name: "English", code: "en"}
    ]
}

export default (state=defaultState, action:LanguageActionTypes)=> {
    switch(action.type){
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(action.payload);
            return {...state, language: action.payload} //不能更改store預設的數據，故要把原本的也加進去
        case ADD_LANGUAGE:
            return {...state, languageList: [...state.languageList, action.payload]}
        default:
             return state
    }
}