import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "9cd95faf-e3e2-4cf0-98bc-1c2dd95ef7e8",
    }
})

export const registrationAPI = {
    registrateNewUser: (formValues: any) => {
        //if DB hasn't the userName, the email and the phone number
        return instance.post('', formValues)
            .then(response => response.data)
    }
}
export const authAPI = {
    me: () => {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login: (email: string, password: string, rememberMe: boolean) => {
        return instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },
    logout: () => {
        return instance.delete(`auth/login`)
            .then(response => response.data)
    },
}