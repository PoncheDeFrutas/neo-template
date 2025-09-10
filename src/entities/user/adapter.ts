import { validateSchema } from '@shared/lib/validation';

import { type User, type UserApi, UserApiSchema } from './types';

export function mapUserFromApi(dto: unknown): User {
    const parsed = validateSchema(UserApiSchema, dto);
    return {
        id: parsed.id,
        name: parsed.name,
    };
}

export function mapUserToApi(user: User): UserApi {
    return {
        id: user.id,
        name: user.name,
    };
}
