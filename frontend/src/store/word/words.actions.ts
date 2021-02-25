import { IWord } from "../../types/types";

export const ADD_WORD = 'ADD_WORD';
export const DELETE_WORD = 'DELETE_WORD';

export type AddWordActionType = {
    type: typeof ADD_WORD
    word: IWord
}

export const addWord = (word: IWord): AddWordActionType => ({ type: ADD_WORD, word })

export type DeleteWordActionType = {
    type: typeof DELETE_WORD
    id: number
}

export const deleteWord = (id: number): DeleteWordActionType => ({ type: DELETE_WORD, id })

export type ActionsTypes = AddWordActionType | DeleteWordActionType;
