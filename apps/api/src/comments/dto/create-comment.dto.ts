import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";


export class CreateCommentDto {
    @ApiProperty()@ApiProperty()

    @IsString()
    content: string;

    @ApiProperty()
    @IsNumber()
    @IsEnum([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], {message: 'Rating must be a number between 1 and 5'})
    rating: number;

    @ApiProperty()
    @IsDateString()
    createdAt: Date;
}
