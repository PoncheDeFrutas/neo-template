import { z } from '@shared/lib/validation';

export const UserApiSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type UserApi = z.infer<typeof UserApiSchema>;

export interface User {
    id: string;
    name: string;
}
