const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token)
}

const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token)
}

const getAccessToken = () => localStorage.getItem('accessToken')

const didLogin = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken)
}

const didLogout = () => {
    localStorage.clear()
}

export {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    didLogin,
    didLogout
}
