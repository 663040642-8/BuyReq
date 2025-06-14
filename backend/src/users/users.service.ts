import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private usersRepository: Repository<User>
    ) { }

    async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
        const user = this.usersRepository.create(createUserDto);
        const savedUser = await this.usersRepository.save(user);
        return new UserResponseDto(savedUser);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`Shop with id ${id} not found`);
        }

        Object.assign(user, updateUserDto);
        
        const updatedUser = await this.usersRepository.save(user);
        return new UserResponseDto(updatedUser);
    }
    
        async findAll(): Promise<UserResponseDto[]> {
            const users = await this.usersRepository.find();
            return users.map(user => new UserResponseDto(user));
        }

    async findByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException(`BuyRequest with email ${email} not found`);
        }
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`${id} not found`);
        }
        return user;
    }
}
