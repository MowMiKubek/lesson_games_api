import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Game } from "../../games/entities/game.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    createdAt: Date;

    @Column({ type: 'real' })
    rating: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @ManyToOne(() => Game)
    @JoinColumn({ name: 'game_id' })
    game: Game;

    @Column({ name: 'user_id'})
    userId: number;

    @Column({ name: 'game_id'})
    gameId: number;
}
