import jwt from 'jwt-decode'

interface TokenPayload {
    adminId: string
    features: { [key: string]: string }
    mobileNumber: string
    name: string
    role: string
    status: string
    username: string
}

const setAccessToken = (token: string) => {
    const decodedToken: TokenPayload = jwt(token)
    localStorage.setItem('accessToken', token)
    localStorage.setItem('features', JSON.stringify(decodedToken.features))
    localStorage.setItem('name', decodedToken.name)
    localStorage.setItem('role', decodedToken.role)
}

const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token)
}

const getAccessToken = () => localStorage.getItem('accessToken')

const didLogin = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken)
}

const didLogout = () => {
    window.location.replace('/')
    localStorage.clear()
}

export {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    didLogin,
    didLogout
}
