import { ThunkAction } from 'redux-thunk';
import { message } from "antd";

import { IWord, NewWordType, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../index";
import { wordAPI } from "../../api";

export const ADD_WORD_STATUS = '[WORD] ADD_WORD_STATUS';
export const ADD_WORD_ERROR_MESSAGE = '[WORD] ADD_WORD_ERROR_MESSAGE';

export const SET_COUNT_WORDS = '[WORD] SET_COUNT_WORDS';

export const DELETE_WORD_STATUS = '[WORD] DELETE_WORD_STATUS';
export const DELETE_WORD_ERROR_MESSAGE = '[WORD] DELETE_WORD_ERROR_MESSAGE';

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

export type DeleteWordStatusActionType = {
    type: typeof DELETE_WORD_STATUS
    status: RequestStatusesEnum
}

export const deleteWordStatus = (status: RequestStatusesEnum): DeleteWordStatusActionType => ({ type: DELETE_WORD_STATUS, status });

export type SetDeleteWordErrorMessageActionType = {
    type: typeof DELETE_WORD_ERROR_MESSAGE
    message: string | null
}

export const setDeleteWordErrorMessage = (message: string | null): SetDeleteWordErrorMessageActionType => (
    { type: DELETE_WORD_ERROR_MESSAGE, message }
);

export type SetCountWordsType = {
    type: typeof SET_COUNT_WORDS
    countWords: number
}

export const setCountWords = (countWords: number): SetCountWordsType => ({ type: SET_COUNT_WORDS, countWords });

export const updateWord = (word: IWord): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch, getState) => {
        let prevWords = getState().word.words;
        try {
            const words = getState().word.words.map(w => w._id !== word._id ? w : word);
            dispatch(setWords(words));

            await wordAPI.updateWord(word);
        } catch (e) {
            message.error(e.response.data.message);
            dispatch(setWords(prevWords));
        }
    }
}

export const deleteWord = (wordId: string): ThunkAction<void, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch, getState) => {
        try {
            dispatch(deleteWordStatus(RequestStatusesEnum.Pending));
            await wordAPI.deleteWord(wordId);

            const words = getState().word.words.filter(w => w._id !== wordId);
            const countWords = getState().word.countWords;

            dispatch(setWords(words));
            dispatch(setCountWords(countWords - 1));

            dispatch(deleteWordStatus(RequestStatusesEnum.Success));
            dispatch(setDeleteWordErrorMessage(null));

            message.success('Word deleted');
        } catch (e) {
            dispatch(deleteWordStatus(RequestStatusesEnum.Failure));
            dispatch(setDeleteWordErrorMessage(e.response.data.message));

            message.error(e.response.data.message);
        }
    }
}

export const addWord = (word: NewWordType): ThunkAction<Promise<RequestStatusesEnum>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch, getState) => {
        try {
            dispatch(setAddWordStatus(RequestStatusesEnum.Pending));
            const data = await wordAPI.addWord(word);

            const { words, countWords } = getState().word;

            dispatch(setWords([data.word, ...words]));
            dispatch(setCountWords(countWords + 1));

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
    return async (dispatch, getState) => {
        try {
            const words = getState().word.words;

            dispatch(setFetchWordStatus(RequestStatusesEnum.Pending));
            const data = await wordAPI.fetchWords(words.length);

            dispatch(setWords([ ...words, ...data.words ]));
            dispatch(setCountWords(data.countWords));

            dispatch(setFetchWordStatus(RequestStatusesEnum.Success));
        } catch (e) {
            dispatch(setFetchWordStatus(RequestStatusesEnum.Failure));
        }
    }
}

export type ActionsTypes = SetAddWordStatusActionType | SetAddWordErrorMessageType
    | SetFetchWordStatusActionType | SetWordsActionType | DeleteWordStatusActionType| SetDeleteWordErrorMessageActionType
    | SetCountWordsType;
