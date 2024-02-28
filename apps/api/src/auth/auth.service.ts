import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { compareSync } from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneByUsernameOrEmail(username);
        if (!user || !compareSync(pass, user.password)) {
          throw new UnauthorizedException("Invalid credentials");
        }
        const payload = { sub: user.id, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}