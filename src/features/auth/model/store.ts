import { create } from 'zustand';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
    roles?: string[];
    [key: string]: unknown;
}

interface AuthState {
    token: string | null;
    user: DecodedToken | null;
    roles: string[];
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

let logoutTimer: ReturnType<typeof setTimeout> | undefined;

const scheduleLogout = (exp: number, logout: () => void) => {
    const timeout = exp * 1000 - Date.now();
    if (timeout > 0) {
        logoutTimer = setTimeout(logout, timeout);
    }
};

export const useAuthStore = create<AuthState>((set) => {
    const logout = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        globalThis.localStorage?.removeItem('token');
        set({ token: null, user: null, roles: [], isAuthenticated: false });
    };

    const login = (token: string) => {
        const decoded = jwtDecode<DecodedToken>(token);
        const roles = decoded.roles ?? [];
        if (decoded.exp) {
            scheduleLogout(decoded.exp, logout);
        }
        globalThis.localStorage?.setItem('token', token);
        set({ token, user: decoded, roles, isAuthenticated: true });
    };

    const token = globalThis.localStorage?.getItem('token');
    let user: DecodedToken | null = null;
    let roles: string[] = [];
    if (token) {
        user = jwtDecode<DecodedToken>(token);
        roles = user.roles ?? [];
        if (user.exp) {
            scheduleLogout(user.exp, logout);
        }
    }

    return {
        token,
        user,
        roles,
        isAuthenticated: Boolean(token),
        login,
        logout,
    };
});

export const useAuth = () =>
    useAuthStore((state) => ({
        user: state.user,
        roles: state.roles,
        isAuthenticated: state.isAuthenticated,
    }));

export default useAuth;