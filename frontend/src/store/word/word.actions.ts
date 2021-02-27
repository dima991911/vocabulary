import { ThunkAction } from 'redux-thunk';

import { IWord, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../index";
import { wordAPI } from "../../api";

export const ADD_WORD = 'ADD_WORD';
export const DELETE_WORD = 'DELETE_WORD';

export const SET_WORDS = 'SET_WORDS';
export const SET_FETCH_WORDS_STATUS = 'SET_FETCH_WORDS_STATUS';


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

export type ActionsTypes = SetFetchWordStatusActionType | SetWordsActionType;
