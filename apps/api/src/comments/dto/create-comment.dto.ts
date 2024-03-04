import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";


export class CreateCommentDto {
    @ApiProperty({ description: 'The content of the comment', type: String })
    @IsString()
    content: string;

    @ApiProperty({ description: 'The rating of the comment', type: Number, enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], example: 3 })
    @IsNumber()
    @IsEnum([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5], { message: 'Rating must be a number between 1 and 5' })
    rating: number;

    @ApiProperty({ description: 'The creation date of the comment', type: Date, example: '2022-01-01T00:00:00Z' })
    @IsDateString()
    createdAt: Date;
}
