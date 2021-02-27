import { createSelector } from "reselect";

import { IThemeType, IWord } from "../../types/types";
import { AppStateType } from "../index";

const wordsList = (state: AppStateType) => state.word.words;
const themesList = (state: AppStateType) => state.theme.themes;

export const getThemesWithWords = createSelector(
    wordsList, themesList,
    (words, themes) => {
        return themes.map((t: IThemeType) => ({ ...t, words: words.filter((w: IWord) => w.theme && w.theme === t._id) }));
    }
)
