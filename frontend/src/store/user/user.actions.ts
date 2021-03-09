import { ThunkAction } from "redux-thunk";

import { IUserType, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../index";
import { authAPI } from "../../api";
import { setGlobalLoading } from "../app/app.actions";

import { SetGlobalLoadingActionType } from '../app/app.actions';

export const SET_USER = '[USER] SET_USER';
export const SET_SIGNUP_STATUS = '[USER] SET_SIGNUP_STATUS';
export const SET_SIGNUP_ERROR_MESSAGE = '[USER] SET_SIGNUP_ERROR_MESSAGE_STATUS';
export const SET_LOGIN_STATUS = '[USER] SET_LOGIN_STATUS';
export const SET_LOGIN_ERROR_MESSAGE = '[USER] SET_LOGIN_ERROR_MESSAGE';

/*
* TODO types thunk dispatch
* */
export const init = () => {
    return (dispatch: any) => {
        dispatch(auth());
    };
}

type SetUserActionType = {
    type: typeof SET_USER
    user: IUserType | null
}

export const setUser = (user: IUserType | null): SetUserActionType => ({ type: SET_USER, user });

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
    return async (dispatch ) => {
        try {
            dispatch(setSignUpStatus(RequestStatusesEnum.Pending));

            const userData = await authAPI.signup(login, password, email, nativeLanguage);
            localStorage.setItem('token', userData.token);
            dispatch(setUser(userData.user));

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
            localStorage.setItem('token', userData.token);
            dispatch(setUser(userData.user));

            dispatch(setLoginStatus(RequestStatusesEnum.Success));
            dispatch(setLoginErrorMessage(null));
        } catch (e: any) {
            dispatch(setLoginStatus(RequestStatusesEnum.Failure));
            dispatch(setLoginErrorMessage(e.response?.data.error));
        }
    }
}

type AuthTypes = ActionsTypes | SetGlobalLoadingActionType;
export const auth = (): ThunkAction<void, AppStateType, unknown, AuthTypes> => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                dispatch(setGlobalLoading(true));
                const userData = await authAPI.auth(token);
                dispatch(setUser(userData.user));
                dispatch(setGlobalLoading(false));
            }
        } catch (e) {
            dispatch(logout());
            dispatch(setGlobalLoading(false));
        }
    }
}

export const logout = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
    return (dispatch) => {
        dispatch(setUser(null));
        localStorage.removeItem('token');
    }
}

export type ActionsTypes = SignUpStatusActionType | SetUserActionType | SetSignUpErrorMessageActionType
    | SetLoginErrorMessageActionType | SetLoginStatusActionType;
