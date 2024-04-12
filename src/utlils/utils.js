export const setSessionStorage = (key, value) => {
    if (typeof window !== 'undefined' && key && value)
        return sessionStorage.setItem(key, value)
}

export const getSessionStorage = (key) => {
    if (typeof window !== 'undefined' && key)
        return sessionStorage.getItem(key)
}

export const removeSessionStorage = (key) => {
    if (typeof window !== 'undefined' && key)
        return sessionStorage.removeItem(key)
}

export const clearSessionStorage = () => {
    if (typeof window !== 'undefined')
        return sessionStorage.clear()
}