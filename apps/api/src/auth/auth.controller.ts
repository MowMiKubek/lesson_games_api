import { Body, Controller, Delete, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import LoginDto from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "src/users/entities/user.entity";
import { UpdateUserDto } from "src/users/dto/update-user.dto";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiCreatedResponse({ description: 'Login successful. Auth token as response', type: User })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials. Error object as response' })
    @Post('login')
    async login(@Body() credentials: LoginDto) {
        return this.authService.signIn(credentials.username, credentials.password);
    }

    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'User object as response' })
    @ApiUnauthorizedResponse({ description: 'Invalid token. Error object as response' })
    @Get('profile')
    async profile(@Request() req: Request) {
        //@ts-ignore
        return this.authService.getProfile(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'User object as response' })
    @ApiBadRequestResponse({ description: 'Invalid data. Error object as response' })
    @Patch('profile')
    async update(@Body() updateUserDto: UpdateUserDto, @Request() req: Request){
        //@ts-ignore
        return this.authService.update(req.user.sub, updateUserDto);
    }
    
    @UseGuards(AuthGuard)
    @ApiOkResponse({ description: 'Account deleted successfully' })
    @ApiUnauthorizedResponse({ description: 'Invalid token. Error object as response' })
    @Delete('profile')
    async delete(@Request() req: Request){
        //@ts-ignore
        return this.authService.delete(req.user.sub);
    }
}
