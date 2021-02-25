import { ThunkAction } from "redux-thunk";

import { IUserType, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../index";
import { authAPI } from "../../api";

export const SET_USER = '[USER] SET_USER';
export const SET_SIGNUP_STATUS = '[USER] SET_SIGNUP_STATUS';
export const SET_SIGNUP_ERROR_MESSAGE_STATUS = '[USER] SET_SIGNUP_ERROR_MESSAGE_STATUS';

type SetUserActionType = {
    type: typeof SET_USER
    user: IUserType
}

export const setUser = (user: IUserType): SetUserActionType => ({ type: SET_USER, user });

type SignUpStatusActionType = {
    type: typeof SET_SIGNUP_STATUS
    status: RequestStatusesEnum
}

export const setSignUpStatuses = (status: RequestStatusesEnum): SignUpStatusActionType => ({ type: SET_SIGNUP_STATUS, status });

type SetSignUpErrorMessageActionType = {
    type: typeof SET_SIGNUP_ERROR_MESSAGE_STATUS
    message: string | null
}

export const setSignUpErrorMessage = (message: string | null): SetSignUpErrorMessageActionType => (
    { type: SET_SIGNUP_ERROR_MESSAGE_STATUS, message }
);

type LoginActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;


export const signup = (login: string, password: string, email: string, nativeLanguage: string): LoginActionType => {
    return async (dispatch) => {
        try {
            dispatch(setSignUpStatuses(RequestStatusesEnum.Pending));

            const userData = await authAPI.signup(login, password, email, nativeLanguage);
            dispatch(setUser(userData.user));
            localStorage.setItem('token', userData.token);

            dispatch(setSignUpStatuses(RequestStatusesEnum.Success));
            dispatch(setSignUpErrorMessage(null));
        } catch (e: any) {
            dispatch(setSignUpStatuses(RequestStatusesEnum.Failure));
            dispatch(setSignUpErrorMessage(e.response?.data.error));
        }
    }
}

export type ActionsTypes = SignUpStatusActionType | SetUserActionType | SetSignUpErrorMessageActionType;
