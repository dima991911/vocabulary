export interface IWord {
    id: number
    word: string
    translate: string
}

export type WordInitialStateType = {
    words: IWord[]
}

export type WordActionType = {
    type: string
    word: IWord
}

export type DispatchType = (args: WordActionType) => WordActionType
