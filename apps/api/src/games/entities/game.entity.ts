import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
