import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { writeFileSync } from 'fs';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  findOne(id: number): Promise<Game> {
    return this.gameRepository.findOneBy({id});
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<Game> {
    const game = await this.findOne(id);
    if (!game) {
      throw new BadRequestException('Game not found');
    }
    return this.gameRepository.save({id, ...updateGameDto});
  }

  async updateImage(id: number, imgPath: string): Promise<Game> {
    const game = await this.findOne(id);
    if (!game) {
      throw new BadRequestException('Game not found');
    }
    return this.gameRepository.save({id, image: imgPath});
  }

  remove(id: number) {
    return this.gameRepository.delete(id);
  }
}
