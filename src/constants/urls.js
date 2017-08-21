export const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'
export const BLACK_LIST_TO_FETCH_USER = ['/login', '/join', '/logout']
export const AUTH_ROUTES = ['/settings']
