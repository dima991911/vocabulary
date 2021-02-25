import { IUserType, RequestStatusesEnum } from "../../types/types";
import { ActionsTypes, SET_SIGNUP_STATUS, SET_USER, SET_SIGNUP_ERROR_MESSAGE_STATUS } from './user.actions';

const initialState = {
    currentUser: null as IUserType | null,
    signupStatuses: null as RequestStatusesEnum | null,
    signUpErrorMessage: null as string | null,
};

type InitialStateType = typeof initialState;

export const userReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER:
            return { ...state, currentUser: action.user }
        case SET_SIGNUP_STATUS:
            return { ...state, signupStatuses: action.status }
        case SET_SIGNUP_ERROR_MESSAGE_STATUS:
            return { ...state, signUpErrorMessage: action.message }
        default:
            return state;
    }
}
