// types.d.ts
export interface User {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
}

// app.ts
import { User } from './types.d.ts';

function createUser(userData: Partial<User>): User {
    return {
        id: Date.now(),
        email: userData.email || '',
        name: userData.name || '',
        createdAt: new Date()
    };
}