import Http from "../http/http"

export const login = async (email: string, password: string) => {
    const response = await Http.post(
        "/api/account/login",
        { email, password },
        { skipAuth: true, withCredentials: true }
    )
    return response.data;
}