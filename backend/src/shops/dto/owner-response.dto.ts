export class OwnerResponseDto {
    owner_id: number;
    owner_name: string;
    owner_email: string;

    constructor(partial: Partial<OwnerResponseDto>) {
        Object.assign(this, partial);
    }
}
