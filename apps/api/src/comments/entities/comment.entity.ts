import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Game } from "../../games/entities/game.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Comment {
    @ApiProperty({ description: 'The unique identifier of the comment', type: Number })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'The content of the comment', type: String })
    @Column()
    content: string;

    @ApiProperty({ description: 'The creation date of the comment', type: Date })
    @Column()
    createdAt: Date;

    @ApiProperty({ description: 'The rating of the comment', type: Number })
    @Column({ type: 'real' })
    rating: number;

    @ManyToOne(() => User, { onDelete: "SET NULL"})
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @ManyToOne(() => Game)
    @JoinColumn({ name: 'game_id' })
    game: Game;

    @ApiProperty({ description: 'The ID of the user who made the comment', type: Number })
    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @ApiProperty({ description: 'The ID of the game the comment is related to', type: Number })
    @Column({ name: 'game_id'})
    gameId: number;
}
