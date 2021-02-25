export interface IWord {
    id: number
    word: string
    translate: string
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
    nativeLanguage: ILanguageType
    createdAt: Date
    updatedAt: Date
}

export enum RequestStatusesEnum {
    Success,
    Pending,
    Failure
}
