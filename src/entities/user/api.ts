import api from '@shared/api/axios';

import { mapUserFromApi, mapUserToApi } from './adapter';
import type { User, UserApi } from './types';

export async function fetchUsers(): Promise<User[]> {
    const res = await api.get<UserApi[]>('/users');
    return res.data.map(mapUserFromApi);
}

/**
 * Creates a new user by sending a POST request to the users endpoint.
 *
 * @param user - The user object to be created
 * @returns A promise that resolves to the created user object
 * @throws Will throw an error if the API request fails
 */
export async function createUser(user: User): Promise<User> {
    const res = await api.post<UserApi>('/users', mapUserToApi(user));
    return mapUserFromApi(res.data);
}
