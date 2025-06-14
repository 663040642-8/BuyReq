import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    getAllUserData(): Promise<UserResponseDto[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req: Request): Promise<UserResponseDto> {
        const user = req.user as JwtPayload;
        const userEntity = await this.usersService.findById(user.sub);
        return new UserResponseDto(userEntity);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('me')
    async updateProfile(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        const user = req.user as JwtPayload;  // ดึง user id จาก token
        return this.usersService.update(user.sub, updateUserDto);
    }
}
