import { instance } from "./index";
import { IUserType } from "../types/types";

type SignUpOrLoginDataType = {
    token: string
    user: IUserType
}

type AuthType = {
    user: IUserType
}

export const authAPI = {
    signup(login: string, password: string, email: string, nativeLanguage: string): Promise<SignUpOrLoginDataType> {
        return instance.post<SignUpOrLoginDataType>('signup', { login, password, email, nativeLanguage }).then(data => data.data);
    },
    login(loginOrEmail: string, password: string): Promise<SignUpOrLoginDataType> {
        return instance.post<SignUpOrLoginDataType>('login', { loginOrEmail, password }).then(data => data.data);
    },
    auth(token: string): Promise<AuthType> {
        return instance.get('auth?token=' + token).then(data => data.data);
    }
}
