import { instance, getToken } from "./index";
import { IThemeType, IWord, NewWordType } from "../types/types";

type FetchWordsType = {
    words: Array<IWord>
}

type FetchThemesType = {
    themes: Array<IThemeType>
}

type AddWordType = {
    word: IWord
}

type DeleteWordType = {
    id: string
}

export const wordAPI = {
    fetchWords() {
        return instance.get<FetchWordsType>('words?token=' + getToken()).then(data => data.data);
    },
    fetchThemes() {
        return instance.get<FetchThemesType>('themes?token=' + getToken()).then(data => data.data);
    },
    addWord(word: NewWordType) {
        return instance.post<AddWordType>('word?token=' + getToken(), word).then(data => data.data);
    },
    deleteWord(id: string) {
        return instance.delete<DeleteWordType>(`word/${id}?token=${getToken()}`).then(data => data.data);
    }
}
