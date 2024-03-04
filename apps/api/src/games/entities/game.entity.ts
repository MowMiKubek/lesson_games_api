import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../../comments/entities/comment.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column()
    genre: string;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => Comment, comment => comment.game, {eager: true})
    comments: Comment[];
}
