const authApIPrefix = '/api/auth'
const DEFAULT_REDIRECT = '/dashboard'

const publicRoutes = [
    '/'
]

const authRoutes = [
    '/signin',
    '/signup'
]

const protectedRoutes = [
    '/dashboard'
]


export {
    authApIPrefix,
    DEFAULT_REDIRECT,
    publicRoutes,
    authRoutes,
    protectedRoutes
}