import decode from 'jwt-decode';

class AuthService {
    // get token from localstorage
    getToken() {
        return localStorage.getItem('id_token');
    };

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch {
            return false;
        };
    };

    // set token to localStorage
    login(idToken) {
        if (idToken) {
            localStorage.setItem('id_token', idToken);
            window.location.assign('/');
        };
    };

    // remove token from localStorage
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    };

    // check if user is logged in
    loggedIn() {
        const token = this.getToken();
        return !token && !this.isTokenExpired(token);
    };
};

export default new AuthService();
