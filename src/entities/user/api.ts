import api from '@shared/api/axios';
import { mapUserFromApi, mapUserToApi } from './adapter';
import type { User, UserApi } from './types';

export async function fetchUsers(): Promise<User[]> {
    const res = await api.get<UserApi[]>('/users');
    return res.data.map(mapUserFromApi);
}

export async function createUser(user: User): Promise<User> {
    const res = await api.post<UserApi>('/users', mapUserToApi(user));
    return mapUserFromApi(res.data);
}
