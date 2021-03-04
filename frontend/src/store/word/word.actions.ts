import { ThunkAction } from 'redux-thunk';
import { message } from "antd";

import { IWord, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../index";
import { wordAPI } from "../../api";

export const ADD_WORD_STATUS = '[WORD] ADD_WORD_STATUS';
export const ADD_WORD_ERROR_MESSAGE = '[WORD] ADD_WORD_ERROR_MESSAGE';

export const SET_WORDS = '[WORD] SET_WORDS';
export const SET_FETCH_WORDS_STATUS = '[WORD] SET_FETCH_WORDS_STATUS';

export type SetFetchWordStatusActionType = {
    type: typeof SET_FETCH_WORDS_STATUS
    status: RequestStatusesEnum
}

export const setFetchWordStatus = (status: RequestStatusesEnum): SetFetchWordStatusActionType => ({ type: SET_FETCH_WORDS_STATUS, status });

export type SetWordsActionType = {
    type: typeof SET_WORDS
    words: Array<IWord>
}

export const setWords = (words: Array<IWord>): SetWordsActionType => ({ type: SET_WORDS, words });

export type SetAddWordStatusActionType = {
    type: typeof ADD_WORD_STATUS
    status: RequestStatusesEnum
}

export const setAddWordStatus = (status: RequestStatusesEnum): SetAddWordStatusActionType => ({ type: ADD_WORD_STATUS, status });

export type SetAddWordErrorMessageType = {
    type: typeof ADD_WORD_ERROR_MESSAGE
    message: string | null
}

export const setAddWordErrorMessage = (message: string | null): SetAddWordErrorMessageType => ({ type: ADD_WORD_ERROR_MESSAGE, message });

export const addWord = (word: IWord): ThunkAction<Promise<RequestStatusesEnum>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch, getState) => {
        try {
            dispatch(setAddWordStatus(RequestStatusesEnum.Pending));
            const data = await wordAPI.addWord(word);

            const words = getState().word.words;

            dispatch(setWords([data.word, ...words]));
            dispatch(setAddWordStatus(RequestStatusesEnum.Success));
            dispatch(setAddWordErrorMessage(null));

            message.success('Word added');
            return RequestStatusesEnum.Success;
        } catch (e) {
            dispatch(setAddWordStatus(RequestStatusesEnum.Success));
            dispatch(setAddWordErrorMessage(e.response.data.message));
            message.error(e.response.data.message);
            return RequestStatusesEnum.Failure;
        }
    }
}

export const fetchWords = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        try {
            dispatch(setFetchWordStatus(RequestStatusesEnum.Pending));
            const data = await wordAPI.fetchWords();
            dispatch(setWords(data.words));

            dispatch(setFetchWordStatus(RequestStatusesEnum.Success));
        } catch (e) {
            dispatch(setFetchWordStatus(RequestStatusesEnum.Failure));
        }
    }
}

// export type AddWordActionType = {
//     type: typeof ADD_WORD
//     word: IWord
// }
//
// export const addWord = (word: IWord): AddWordActionType => ({ type: ADD_WORD, word });
//
// export type DeleteWordActionType = {
//     type: typeof DELETE_WORD
//     id: string
// }
//
// export const deleteWord = (id: string): DeleteWordActionType => ({ type: DELETE_WORD, id });
//
// export type SetWordsActionType = {
//     type: typeof SET_WORDS
//     words: Array<IWord>
// }
//
// export const setWords = (words: Array<IWord>): SetWordsActionType => ({ type: SET_WORDS, words });
//
// export type SetFetchWordStatusActionType = {
//     type: typeof DELETE_WORD
//     status: RequestStatusesEnum
// }
//
// export const setFetchWordStatus = (status: RequestStatusesEnum): SetFetchWordStatusActionType => ({ type: DELETE_WORD, status });
//
// type AddThemeActionType = {
//     type: typeof ADD_THEME
//     theme: IThemeType
// }
//
// export const addTheme = (theme: IThemeType): AddThemeActionType => ({ type: ADD_THEME, theme });
//
// export const fetchWords = (): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
//     return (dispatch) => {
//
//     }
// }

export type ActionsTypes = SetAddWordStatusActionType | SetAddWordErrorMessageType | SetFetchWordStatusActionType | SetWordsActionType;
