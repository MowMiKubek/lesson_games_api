import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import LoginDto from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() credentials: LoginDto) {
        return this.authService.signIn(credentials.username, credentials.password);
    }

    @UseGuards(AuthGuard)
    @Post('profile')
    async profile(@Request() req: Request) {
        //@ts-ignore
        return req.user;
    }
}
