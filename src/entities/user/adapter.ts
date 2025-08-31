import type { UserApi, User } from './types';

export function mapUserFromApi(dto: UserApi): User {
    return {
        id: dto.id,
        name: dto.name,
    };
}

export function mapUserToApi(user: User): UserApi {
    return {
        id: user.id,
        name: user.name,
    };
}
