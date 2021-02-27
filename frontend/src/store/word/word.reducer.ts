import { IWord, RequestStatusesEnum } from "../../types/types";
import { ActionsTypes, SET_FETCH_WORDS_STATUS, SET_WORDS } from "./word.actions";

const initialState = {
    words: [] as Array<IWord>,
    fetchWordsStatus: null as RequestStatusesEnum | null,
};

type InitialStateType = typeof initialState;

export const wordReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_FETCH_WORDS_STATUS:
            return { ...state, fetchWordsStatus: action.status };
        case SET_WORDS:
            return { ...state, words: action.words };
        default:
            return state;
    }
};
