import {IUserType, RequestStatusesEnum} from "../../types/types";
import {
    ActionsTypes,
    SET_LOGIN_ERROR_MESSAGE,
    SET_LOGIN_STATUS,
    SET_SIGNUP_ERROR_MESSAGE,
    SET_SIGNUP_STATUS,
    SET_USER,
    SET_USER_AUTH_STATUS
} from './user.actions';

const initialState = {
    currentUser: null as IUserType | null,
    userAuthStatus: null as RequestStatusesEnum | null,

    signupStatus: null as RequestStatusesEnum | null,
    signUpErrorMessage: null as string | null,
    loginStatus: null as RequestStatusesEnum | null,
    loginErrorMessage: null as string | null,
};

type InitialStateType = typeof initialState;

export const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: action.user };
        case SET_SIGNUP_STATUS:
            return { ...state, signupStatus: action.status };
        case SET_SIGNUP_ERROR_MESSAGE:
            return { ...state, signUpErrorMessage: action.message };
        case SET_LOGIN_ERROR_MESSAGE:
            return { ...state, loginErrorMessage: action.message };
        case SET_LOGIN_STATUS:
            return { ...state, loginStatus: action.status };
        case SET_USER_AUTH_STATUS:
            return { ...state, userAuthStatus: action.status };
        default:
            return state;
    }
}
