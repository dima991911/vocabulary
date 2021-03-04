import { IThemeType, RequestStatusesEnum } from "../../types/types";
import { ActionsTypes, SET_FETCH_THEMES_STATUS, SET_THEMES } from "./theme.actions";

const initialState = {
    themes: [] as Array<IThemeType>,
    fetchThemesStatus: null as RequestStatusesEnum | null,
};

type InitialStateType = typeof initialState;

export const themeReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_THEMES:
            return { ...state, themes: action.themes };
        case SET_FETCH_THEMES_STATUS:
            return { ...state, fetchThemesStatus: action.status };
        default:
            return state;
    }
}
