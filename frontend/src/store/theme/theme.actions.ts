import { ThunkAction } from "redux-thunk";

import { IThemeType, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../index";
import { wordAPI } from "../../api";

export const ADD_THEME = '[THEME] ADD_THEME';
export const DELETE_THEME = '[THEME] DELETE_THEME';

export const SET_THEMES = '[THEME] SET_THEMES';
export const SET_FETCH_THEMES_STATUS = '[THEME] SET_FETCH_THEMES_STATUS';

type SetFetchThemesStatusActionType = {
    type: typeof SET_FETCH_THEMES_STATUS
    status: RequestStatusesEnum
}

export const setFetchThemesStatus = (status: RequestStatusesEnum): SetFetchThemesStatusActionType => ({ type: SET_FETCH_THEMES_STATUS, status });

export type SetThemesActionType = {
    type: typeof SET_THEMES
    themes: Array<IThemeType>
}

export const setThemes = (themes: Array<IThemeType>): SetThemesActionType => ({ type: SET_THEMES, themes });

export const fetchThemes = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        try {
            dispatch(setFetchThemesStatus(RequestStatusesEnum.Pending));
            const data = await wordAPI.fetchThemes();
            dispatch(setThemes(data.themes));

            dispatch(setFetchThemesStatus(RequestStatusesEnum.Success));
        } catch (e) {
            dispatch(setFetchThemesStatus(RequestStatusesEnum.Failure));
        }
    }
}

export type ActionsTypes = SetFetchThemesStatusActionType | SetThemesActionType;
