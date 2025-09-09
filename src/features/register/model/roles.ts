export const ROLE_KEYS = ['client', 'dealer', 'shop', 'admin'] as const;
export type RoleKey = (typeof ROLE_KEYS)[number];

// Mapping role keys to their respective IDs in the backend
export const ROLE_ID_BY_KEY: Record<RoleKey, number> = {
    admin: 1,
    client: 2,
    dealer: 3,
    shop: 4,
};
