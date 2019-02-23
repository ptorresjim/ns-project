export const getLS = (key = 'token') => window.localStorage.getItem(key)
export const setLS = (key = 'token', value) => window.localStorage.setItem(key, value)
export const removeLS = (key = 'token') => window.localStorage.removeItem(key)