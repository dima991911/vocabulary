import { ThunkAction } from 'redux-thunk'

import { ILanguageType } from "../../types/types";
import { AppStateType } from "../index";
import { languagesAPI } from "../../api";

export const SET_LANGUAGES = "SET_LANGUAGES";
export const SET_GLOBAL_LOADING = "SET_GLOBAL_LOADING";

export type SetGlobalLoadingActionType = {
    type: typeof SET_GLOBAL_LOADING
    isLoading: boolean
}

export const setGlobalLoading = (isLoading: boolean): SetGlobalLoadingActionType => ({ type: SET_GLOBAL_LOADING, isLoading });

type SetLanguagesActionType = {
    type: typeof SET_LANGUAGES
    languages: Array<ILanguageType>
}

export const setLanguages = (languages: Array<ILanguageType>): SetLanguagesActionType => ({ type: SET_LANGUAGES, languages });

type FetchLanguagesActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const fetchLanguages = (): FetchLanguagesActionType => {
    return async (dispatch) => {
        const languages = await languagesAPI.fetchLanguages();
        dispatch(setLanguages(languages));
    }
}

export type ActionsTypes = SetGlobalLoadingActionType | SetLanguagesActionType;
