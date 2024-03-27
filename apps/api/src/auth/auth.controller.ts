import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import LoginDto from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "src/users/entities/user.entity";

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
    @ApiCreatedResponse({ description: 'User object as response' })
    @ApiUnauthorizedResponse({ description: 'Invalid token. Error object as response' })
    @Post('profile')
    async profile(@Request() req: Request) {
        //@ts-ignore
        return this.authService.getProfile(req.user.id);
    }
}
