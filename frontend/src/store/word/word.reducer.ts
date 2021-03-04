import { IWord, RequestStatusesEnum } from "../../types/types";
import {
    ActionsTypes,
    ADD_WORD_ERROR_MESSAGE,
    ADD_WORD_STATUS,
    SET_FETCH_WORDS_STATUS,
    SET_WORDS
} from "./word.actions";

const initialState = {
    words: [] as Array<IWord>,
    fetchWordsStatus: null as RequestStatusesEnum | null,

    addWordStatus: null as RequestStatusesEnum | null,
    addWordErrorMessage: null as string | null,
};

type InitialStateType = typeof initialState;

export const wordReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_FETCH_WORDS_STATUS:
            return { ...state, fetchWordsStatus: action.status };
        case SET_WORDS:
            return { ...state, words: action.words };
        case ADD_WORD_STATUS:
            return { ...state, addWordStatus: action.status };
        case ADD_WORD_ERROR_MESSAGE:
            return { ...state, addWordErrorMessage: action.message };
        default:
            return state;
    }
};
