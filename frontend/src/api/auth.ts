import { instance } from "./index";
import { IUserType } from "../types/types";

type SignUpDataType = {
    token: string
    user: IUserType
}

export const authAPI = {
    signup(login: string, password: string, email: string, nativeLanguage: string) {
        return instance.post<SignUpDataType>('signup', { login, password, email, nativeLanguage }).then(data => data.data);
    }
}
