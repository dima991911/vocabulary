import { instance, getToken } from "./index";
import { IThemeType, IWord } from "../types/types";

type FetchWordsType = {
    words: Array<IWord>
}

type FetchThemesType = {
    themes: Array<IThemeType>
}

type AddWordType = {
    word: IWord
}

export const wordAPI = {
    fetchWords() {
        return instance.get<FetchWordsType>('words?token=' + getToken()).then(data => data.data);
    },
    fetchThemes() {
        return instance.get<FetchThemesType>('themes?token=' + getToken()).then(data => data.data);
    },
    addWord(word: IWord) {
        return instance.post<AddWordType>('word?token=' + getToken(), word).then(data => data.data);
    },
}
