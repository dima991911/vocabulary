import { ILanguageType } from "../../types/types";
import { ActionsTypes, SET_GLOBAL_LOADING, SET_LANGUAGES } from "./app.actions";

const initialState = {
    languages: [] as Array<ILanguageType>,
    globalLoading: false as boolean
};

type InitialStateType = typeof initialState;

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_GLOBAL_LOADING:
            return { ...state, globalLoading: action.isLoading };
        case SET_LANGUAGES:
            return { ...state, languages: action.languages };
        default:
            return state;
    }
}
