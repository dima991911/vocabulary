import { IWord } from "../../types/types";
import { ADD_WORD, DELETE_WORD, ActionsTypes } from "./words.actions";

const initialState = {
    words: [
        { id: 1, word: 'do', translate: 'робити' },
        { id: 2, word: 'create', translate: 'створювати' },
    ] as Array<IWord>,
};

type InitialStateType = typeof initialState;

export const wordReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_WORD:
            return {
                ...state,
                words: [...state.words, action.word],
            }
        case DELETE_WORD:
            const findIndex = state.words.findIndex((w: IWord) => w.id === action.id)
            const newWords = [...state.words];
            newWords.splice(findIndex, 1);

            return  { ...state, words: newWords };
        default:
            return state;
    }
};
