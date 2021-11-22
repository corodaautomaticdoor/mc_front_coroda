const TOKEN_KEY: string = 'OAuthToken';
const USER_DATA_KEY = 'UserData'
export function removeToken() {
    window.localStorage.removeItem(TOKEN_KEY);
}

export function removeSession() {
    window.localStorage.clear();
}

export function saveToken(token: string) {
    removeToken();
    window.localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeUserData() {
    window.localStorage.removeItem(USER_DATA_KEY)
}

export function saveUserData(userData: string) {
    removeUserData()
    window.localStorage.setItem(USER_DATA_KEY, userData);
}

export function getUserData() {
    return localStorage.getItem(USER_DATA_KEY);
}