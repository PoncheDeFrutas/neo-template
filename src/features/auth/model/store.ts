import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useMemo } from 'react';
import { create } from 'zustand';

/**
 * Represents a decoded JWT token containing user authentication and authorization information.
 *
 * @interface DecodedToken
 * @extends {JwtPayload}
 *
 * @property {number} [id] - The unique identifier of the user
 * @property {string} [email] - The email address of the user
 * @property {number} [roleId] - The primary role identifier assigned to the user
 * @property {string[]} [roles] - Array of role names/permissions associated with the user
 */
interface DecodedToken extends JwtPayload {
    id?: number;
    email?: string;
    roleId?: number;
    roles?: string[];
}

/**
 * Authentication state interface for managing user authentication in the application.
 *
 * This interface defines the complete authentication state including user information,
 * JWT token data, and authentication actions. It provides both the raw token and
 * convenient extracted fields for easy access to user data.
 *
 * @interface AuthState
 *
 * @property {string | null} token - The JWT authentication token, null when not authenticated
 * @property {DecodedToken | null} user - Decoded user information from the JWT token
 * @property {string[]} roles - Array of user role names for authorization purposes
 * @property {boolean} isAuthenticated - Flag indicating if the user is currently authenticated
 * @property {number | null} userId - User's unique identifier extracted from the JWT
 * @property {string | null} email - User's email address extracted from the JWT
 * @property {number | null} roleId - User's role identifier extracted from the JWT
 * @property {number | null} issuedAt - JWT issued at timestamp in seconds (iat claim)
 * @property {number | null} expiresAt - JWT expiration timestamp in seconds (exp claim)
 * @property {(token: string) => void} login - Function to authenticate user with a JWT token
 * @property {() => void} logout - Function to clear authentication state and log out user
 */
interface AuthState {
    token: string | null;
    user: DecodedToken | null;
    roles: string[];
    isAuthenticated: boolean;
    // Convenience fields extracted from the JWT
    userId: number | null;
    email: string | null;
    roleId: number | null;
    issuedAt: number | null; // iat (seconds)
    expiresAt: number | null; // exp (seconds)
    login: (token: string) => void;
    logout: () => void;
}

let logoutTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Schedules an automatic logout based on a token expiration time.
 *
 * @param exp - The expiration timestamp in seconds since Unix epoch
 * @param logout - The callback function to execute when the logout should occur
 *
 * @remarks
 * This function calculates the timeout duration by converting the expiration time
 * from seconds to milliseconds and subtracting the current time. If the timeout
 * is positive (meaning the token hasn't expired yet), it sets a timer to call
 * the logout function at the appropriate time.
 *
 * @example
 * ```typescript
 * const tokenExp = 1234567890; // Unix timestamp in seconds
 * scheduleLogout(tokenExp, () => {
 *   console.log('User logged out automatically');
 * });
 * ```
 */
const scheduleLogout = (exp: number, logout: () => void) => {
    const timeout = exp * 1000 - Date.now();
    if (timeout > 0) {
        logoutTimer = setTimeout(logout, timeout);
    }
};

/**
 * Authentication store using Zustand for managing user authentication state.
 *
 * This store handles JWT token management, user session persistence, and automatic logout scheduling.
 * It automatically restores authentication state from localStorage on initialization and provides
 * methods for logging in and out.
 *
 * @remarks
 * - Automatically decodes JWT tokens to extract user information and roles
 * - Schedules automatic logout when token expires
 * - Persists tokens in localStorage for session restoration
 * - Provides fallback role mapping based on roleId for backward compatibility
 * - Includes development-only logging for debugging purposes
 *
 * @example
 * ```typescript
 * const { login, logout, isAuthenticated, user, roles } = useAuthStore();
 *
 * // Login with JWT token
 * login('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 *
 * // Check authentication status
 * if (isAuthenticated) {
 *   console.log('User roles:', roles);
 * }
 *
 * // Logout
 * logout();
 * ```
 */
export const useAuthStore = create<AuthState>((set) => {
    const logout = () => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        globalThis.localStorage?.removeItem('token');
        set({
            token: null,
            user: null,
            roles: [],
            isAuthenticated: false,
            userId: null,
            email: null,
            roleId: null,
            issuedAt: null,
            expiresAt: null,
        });
    };

    const deriveRoles = (decoded: DecodedToken): string[] => {
        if (decoded.roles && decoded.roles.length) return decoded.roles;
        if (typeof decoded.roleId === 'number') {
            // Fallback mapping: adjust to your backend roles as needed
            if (decoded.roleId === 1) return ['admin'];
            if (decoded.roleId === 2) return ['client'];
            if (decoded.roleId === 3) return ['dealer'];
            if (decoded.roleId === 4) return ['shop'];
            return ['user'];
        }
        return [];
    };

    const login = (token: string) => {
        const decoded = jwtDecode<DecodedToken>(token);
        const roles = deriveRoles(decoded);
        const userId = typeof decoded.id === 'number' ? decoded.id : null;
        const email = typeof decoded.email === 'string' ? decoded.email : null;
        const roleId = typeof decoded.roleId === 'number' ? decoded.roleId : null;
        const issuedAt = typeof decoded.iat === 'number' ? decoded.iat : null;
        const expiresAt = typeof decoded.exp === 'number' ? decoded.exp : null;
        if (decoded.exp) {
            scheduleLogout(decoded.exp, logout);
        }
        globalThis.localStorage?.setItem('token', token);
        if (import.meta.env.DEV) {
            // Log minimal decoded info for debugging only in dev
            // Avoid logging the raw token

            console.log('[auth] Decoded token', {
                id: userId,
                email,
                roleId,
                roles,
                iat: issuedAt,
                exp: expiresAt,
            });
        }
        set({
            token,
            user: decoded,
            roles,
            isAuthenticated: true,
            userId,
            email,
            roleId,
            issuedAt,
            expiresAt,
        });
    };

    const token = globalThis.localStorage?.getItem('token');
    let user: DecodedToken | null = null;
    let roles: string[] = [];
    let userId: number | null = null;
    let email: string | null = null;
    let roleId: number | null = null;
    let issuedAt: number | null = null;
    let expiresAt: number | null = null;
    if (token) {
        user = jwtDecode<DecodedToken>(token);
        roles = deriveRoles(user);
        userId = typeof user.id === 'number' ? user.id : null;
        email = typeof user.email === 'string' ? user.email : null;
        roleId = typeof user.roleId === 'number' ? user.roleId : null;
        issuedAt = typeof user.iat === 'number' ? user.iat : null;
        expiresAt = typeof user.exp === 'number' ? user.exp : null;
        if (user.exp) {
            scheduleLogout(user.exp, logout);
        }
        if (import.meta.env.DEV) {
            console.log('[auth] Restored session from token', {
                id: userId,
                email,
                roleId,
                roles,
                iat: issuedAt,
                exp: expiresAt,
            });
        }
    }

    return {
        token,
        user,
        roles,
        isAuthenticated: Boolean(token),
        userId,
        email,
        roleId,
        issuedAt,
        expiresAt,
        login,
        logout,
    };
});

/**
 * Custom hook for accessing authentication state from the auth store.
 *
 * @returns An object containing the current authentication state with memoized values
 * @returns.user - The currently authenticated user object, or null if not authenticated
 * @returns.roles - Array of user roles/permissions
 * @returns.isAuthenticated - Boolean indicating whether a user is currently authenticated
 *
 * @example
 * ```tsx
 * const { user, roles, isAuthenticated } = useAuth();
 *
 * if (isAuthenticated) {
 *   console.log(`Welcome ${user.name}`);
 * }
 * ```
 */
export const useAuth = () => {
    const user = useAuthStore((s) => s.user);
    const roles = useAuthStore((s) => s.roles);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    // Memoize to keep a stable reference across renders when values don't change
    return useMemo(() => ({ user, roles, isAuthenticated }), [user, roles, isAuthenticated]);
};

export default useAuth;
