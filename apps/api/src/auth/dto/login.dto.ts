import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export default class LoginDto {
    @ApiProperty({ type: String, description: 'Username or email', example: 'john123'})
    @IsString()
    username: string;

    @ApiProperty({ type: String, description: 'Username or email', example: 'password'})
    @IsString()
    password: string;
}