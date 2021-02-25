import { instance } from "./index";
import { ILanguageType } from "../types/types";

type FetchLanguagesType = {
    languages: Array<ILanguageType>
}

export const languagesAPI = {
    fetchLanguages() {
        return instance.get<FetchLanguagesType>('languages').then((data) => data.data.languages);
    }
}
