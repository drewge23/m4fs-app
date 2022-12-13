import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "./baseurl",
    headers: {
        "API-KEY": "9cd95faf-e3e2-4cf0-98bc-1c2dd95ef7e8",
    }
})

export const registrationAPI = {
    registrateNewUser: (formValues: any) => {
        return instance.post('url', formValues)
    }
}
export const authAPI = {
    getUser: (userId: number) => {
        return instance.get(`./url/${userId}`)
    }
}



