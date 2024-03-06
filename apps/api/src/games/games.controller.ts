import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, ParseFilePipe, BadRequestException, Query, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiNoContentResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'config/multerOptions.config';
import { Game } from './entities/game.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('games')
@ApiBearerAuth()
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @UseGuards(AuthGuard)
  @ApiOkResponse({description: 'Games array ar response', type: Game})
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @ApiQuery({name: 'brief', required: false, type: Boolean, description: 'If true, only id, name, genre and createdAt will be returned'})
  @ApiOkResponse({description: 'Games array ar response', type: Game})
  @Get()
  async findAll(@Query('brief') brief?: boolean) {
    const games = await this.gamesService.findAll();
    if (brief) {
      return (games as Game[]).map(({id, name, genre, createdAt}) => ({id, name, genre, createdAt}));
    }
    return games;
  }

  @ApiOkResponse({description: 'Game object as response', type: Game})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @ApiOkResponse({description: 'Game object as response', type: Game})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(+id, updateGameDto);
  }

  @ApiOkResponse({description: 'Game deleted, result as response'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }

  @ApiOkResponse({description: 'Image uploaded'})
  @Put('image/:id')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The file to upload',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Param('id') id: string, 
    @UploadedFile() file: Express.Multer.File  
  ) {
    if(file === undefined) throw new BadRequestException('File not provided');
    return this.gamesService.updateImage(+id, file.filename);
  }
}
