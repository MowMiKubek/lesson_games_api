import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Comment})
  @ApiUnauthorizedResponse({ description: 'User is not logged in.'})
  @Post(':gameid')
  create(
    @Body() createCommentDto: CreateCommentDto, 
    @Param('gameid', ParseIntPipe) gameid: number,
    @Req() req: any) {
    return this.commentsService.create(createCommentDto, gameid, req.user.sub);
  }

  @ApiOkResponse({ description: 'Comments array as response', type: [Comment]})
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @ApiOkResponse({ description: 'Comment object as response', type: Comment})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Comment object as response', type: Comment})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @ApiOkResponse({ description: 'Comment deleted, result as response'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
