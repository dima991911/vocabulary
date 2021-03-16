export interface IWord {
    _id: string
    word: string
    translate: string
    wordLanguage: string
    translateLanguage: string
    rate: WordRateEnum,
    theme?: string
    creator?: string
    createdAt?: Date
    updatedAt?: Date
}

export type WordActionType = {
    type: string
    word: IWord
}

export type DispatchType = (args: WordActionType) => WordActionType

export interface ILanguageType {
    _id: string
    name: string
    code: string
    createdAt: Date
    updatedAt: Date
}

export interface IUserType {
    _id: string
    login: string
    email: string
    nativeLanguage: string
    createdAt: Date
    updatedAt: Date
}

export enum RequestStatusesEnum {
    Success,
    Pending,
    Failure
}

export enum WordRateEnum {
    BAD = 1,
    NORMAL,
    GOOD
}

// TODO: It can be better
export enum SortByDateEnum {
    NEW,
    OLD
}

export enum SortByRateEnum {
    BAD,
    GOOD
}

export interface IThemeType {
    _id: string
    words: Array<string>
    name: string
    createdAt: Date
    updatedAt: Date
    creator: string
}

export type NewWordType = {
    word: string
    translate: string
    wordLanguage: string
    translateLanguage: string
}

export type FilterWordsType = {
    query: string
    sortByDate: SortByDateEnum | undefined
    sortByRate: SortByRateEnum
}
