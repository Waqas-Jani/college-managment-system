const TOKEN_KEY = "logged_by";
export const checkUser = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        const parts = token.split('.');
        if (parts.length !== 3) {
            localStorage.removeItem(TOKEN_KEY);
            return false;
        } else {
            return true;
        }

    }
    return false;
};

export const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};

