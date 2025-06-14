import { UserRole } from "../entities/user.entity";

export class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatarUrl?: string;

    constructor(partial: Partial<UserResponseDto>) {
        Object.assign(this, partial);
    }
}
