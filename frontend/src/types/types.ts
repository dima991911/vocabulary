export interface IWord {
    _id?: number
    word: string
    translate: string
    wordLanguage: string
    translateLanguage: string
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

export interface IThemeType {
    _id: string
    words: Array<string>
    name: string
    createdAt: Date
    updatedAt: Date
    creator: string
}

export type CreateWordFormValuesType = {
    word: string
    translate: string
    wordLanguage: string
    translateLanguage: string
}
