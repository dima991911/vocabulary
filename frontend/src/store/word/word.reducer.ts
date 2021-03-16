import { FilterWordsType, IWord, RequestStatusesEnum, SortByDateEnum, SortByRateEnum } from "../../types/types";
import {
    ActionsTypes,
    ADD_WORD_ERROR_MESSAGE,
    ADD_WORD_STATUS,
    DELETE_WORD_ERROR_MESSAGE,
    DELETE_WORD_STATUS,
    SET_COUNT_WORDS,
    SET_FETCH_WORDS_STATUS,
    SET_WORDS,
    SET_FILTER
} from "./word.actions";

const initialState = {
    words: [] as Array<IWord>,
    fetchWordsStatus: null as RequestStatusesEnum | null,
    countWords: 0 as number,

    deleteWordStatus: null as RequestStatusesEnum | null,
    deleteWordErrorMessage: null as string | null,

    addWordStatus: null as RequestStatusesEnum | null,
    addWordErrorMessage: null as string | null,

    filter: {
        query: '' as string,
        sortByDate: SortByDateEnum.NEW as SortByDateEnum,
        sortByRate: undefined as SortByRateEnum | undefined,
    } as FilterWordsType
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
        case DELETE_WORD_STATUS:
            return { ...state, deleteWordStatus: action.status };
        case DELETE_WORD_ERROR_MESSAGE:
            return { ...state, deleteWordErrorMessage: action.message };
        case SET_COUNT_WORDS:
            return { ...state, countWords: action.countWords };
        case SET_FILTER:
            return { ...state, filter: action.filter };
        default:
            return state;
    }
};
