export const setSessionStorage = (key, value) => {
    if (typeof window !== 'undefined' && key && value)
        sessionStorage.setItem(key, value)
}

export const getSessionStorage = (key) => {
    if (typeof window !== 'undefined' && key)
        sessionStorage.getItem(key)
}

export const removeSessionStorage = (key) => {
    if (typeof window !== 'undefined' && key)
        sessionStorage.removeItem(key)
}

export const clearSessionStorage = () => {
    if (typeof window !== 'undefined')
        sessionStorage.clear()
}