import {ThunkAction} from "redux-thunk";

import {IUserType, RequestStatusesEnum} from "../../types/types";
import {AppStateType} from "../index";
import {authAPI} from "../../api";

export const SET_USER = '[USER] SET_USER';
export const SET_SIGNUP_STATUS = '[USER] SET_SIGNUP_STATUS';
export const SET_SIGNUP_ERROR_MESSAGE = '[USER] SET_SIGNUP_ERROR_MESSAGE_STATUS';
export const SET_LOGIN_STATUS = '[USER] SET_LOGIN_STATUS';
export const SET_LOGIN_ERROR_MESSAGE = '[USER] SET_LOGIN_ERROR_MESSAGE';

type SetUserActionType = {
    type: typeof SET_USER
    user: IUserType
}

export const setUser = (user: IUserType): SetUserActionType => ({ type: SET_USER, user });

type SignUpStatusActionType = {
    type: typeof SET_SIGNUP_STATUS
    status: RequestStatusesEnum
}

export const setSignUpStatus = (status: RequestStatusesEnum): SignUpStatusActionType => ({ type: SET_SIGNUP_STATUS, status });

type SetSignUpErrorMessageActionType = {
    type: typeof SET_SIGNUP_ERROR_MESSAGE
    message: string | null
}

export const setSignUpErrorMessage = (message: string | null): SetSignUpErrorMessageActionType => (
    { type: SET_SIGNUP_ERROR_MESSAGE, message }
);

type SetLoginStatusActionType = {
    type: typeof SET_LOGIN_STATUS
    status: RequestStatusesEnum
}

export const setLoginStatus = (status: RequestStatusesEnum): SetLoginStatusActionType => ({ type: SET_LOGIN_STATUS, status });

type SetLoginErrorMessageActionType = {
    type: typeof SET_LOGIN_ERROR_MESSAGE
    message: string | null
}

export const setLoginErrorMessage = (message: string | null): SetLoginErrorMessageActionType => (
    { type: SET_LOGIN_ERROR_MESSAGE, message }
);

type SignUpActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const signup = (login: string, password: string, email: string, nativeLanguage: string): SignUpActionType => {
    return async (dispatch) => {
        try {
            dispatch(setSignUpStatus(RequestStatusesEnum.Pending));

            const userData = await authAPI.signup(login, password, email, nativeLanguage);
            dispatch(setUser(userData.user));
            localStorage.setItem('token', userData.token);

            dispatch(setSignUpStatus(RequestStatusesEnum.Success));
            dispatch(setSignUpErrorMessage(null));
        } catch (e: any) {
            dispatch(setSignUpStatus(RequestStatusesEnum.Failure));
            dispatch(setSignUpErrorMessage(e.response?.data.error));
        }
    }
}

export const login = (loginOrEmail: string, password: string): SignUpActionType => {
    return async (dispatch) => {
        try {
            dispatch(setLoginStatus(RequestStatusesEnum.Pending));

            const userData = await authAPI.login(loginOrEmail, password);
            dispatch(setUser(userData.user));
            localStorage.setItem('token', userData.token);

            dispatch(setLoginStatus(RequestStatusesEnum.Success));
            dispatch(setLoginErrorMessage(null));
        } catch (e: any) {
            dispatch(setLoginStatus(RequestStatusesEnum.Failure));
            dispatch(setLoginErrorMessage(e.response?.data.error));
        }
    }
}

export type ActionsTypes = SignUpStatusActionType | SetUserActionType | SetSignUpErrorMessageActionType
    | SetLoginErrorMessageActionType | SetLoginStatusActionType;
