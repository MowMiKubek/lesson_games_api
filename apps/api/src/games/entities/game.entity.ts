import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Game {
    @ApiProperty({ description: 'The unique identifier of the game', type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'The name of the game', type: String })
    @Column()
    name: string;

    @ApiProperty({ description: 'The description of the game', type: String })
    @Column()
    description: string;

    @ApiProperty({ description: 'The creation date of the game', type: Date })
    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @ApiProperty({ description: 'The genre of the game', type: String })
    @Column()
    genre: string;

    @ApiProperty({ description: 'The image URL of the game', type: String, nullable: true })
    @Column({ nullable: true })
    image: string;

    @ApiProperty({ description: 'The comments associated with the game', type: [Comment] })
    @OneToMany(() => Comment, comment => comment.game, {eager: true})
    comments: Comment[];
}
