import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GamesService } from 'src/games/games.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly gamesService: GamesService,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>
  ) {}
  async create(createCommentDto: CreateCommentDto, gameId: number, userId: number) {
    const comment = {
      ...createCommentDto,
      gameId,
      userId,
    };
    const game = await this.gamesService.findOne(gameId);

    if (!game) {
      throw new Error('Game not found');
    }
    return this.commentRepository.save(comment);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findAllByGameId(gameId: number) {
    return this.commentRepository.find({where: {gameId}});
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({id});
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.findOne(id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    return this.commentRepository.save({id, ...updateCommentDto});
  }

  remove(id: number) {
    return this.commentRepository.delete({id});
  }
}
