import { instance, getToken } from "./index";
import { IThemeType, IWord, NewWordType } from "../types/types";

type FetchWordsType = {
    words: Array<IWord>
    countWords: number
    currentPage: number
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

type UpdateWord = {
    word: IWord
}

export const wordAPI = {
    fetchWords(offset: number = 0) {
        return instance.get<FetchWordsType>(`words?offset=${offset}&token=${getToken()}`).then(data => data.data);
    },
    fetchThemes() {
        return instance.get<FetchThemesType>('themes?token=' + getToken()).then(data => data.data);
    },
    addWord(word: NewWordType) {
        return instance.post<AddWordType>('word?token=' + getToken(), word).then(data => data.data);
    },
    deleteWord(id: string) {
        return instance.delete<DeleteWordType>(`word/${id}?token=${getToken()}`).then(data => data.data);
    },
    updateWord(updatedWord: IWord) {
        return instance.put<UpdateWord>(`word/${updatedWord._id}?token=${getToken()}`, { word: updatedWord }).then(data => data.data);
    }
}
