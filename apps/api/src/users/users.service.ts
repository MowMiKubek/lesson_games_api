import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const [existingUsername, existingEmail] = await 
    Promise.all([this.findOneByUsernameOrEmail(createUserDto.username), 
                this.findOneByUsernameOrEmail(createUserDto.email)]);

    let errorMessages = [];
    if(existingUsername) 
      errorMessages.push('Username already exists');
    if(existingEmail)
      errorMessages.push('Email already exists');

    if(errorMessages.length > 0)
      throw new BadRequestException({
        message: errorMessages,
        error: 'Bad Request',
        statusCode: 400
    });

    const hashedPassword = hashSync(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({id});
  }

  findOneByUsernameOrEmail(username: string): Promise<User> {
    return this.userRepository.findOne({where: [{username}, {email: username}]});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(+id);
    if(!user)
      throw new BadRequestException('User not found');

    const [existingUsername, existingEmail] = await 
    Promise.all([this.findOneByUsernameOrEmail(updateUserDto.username), 
                this.findOneByUsernameOrEmail(updateUserDto.email)]);

    console.log(existingUsername, existingEmail)
    let errorMessages = [];
    if(updateUserDto.username !== undefined && existingUsername && existingUsername.id !== id) 
      errorMessages.push('Username already exists');
    if(updateUserDto.email !== undefined && existingEmail && existingEmail.id !== id)
      errorMessages.push('Email already exists');

    if(errorMessages.length > 0)
      throw new BadRequestException({
        message: errorMessages,
        error: 'Bad Request',
        statusCode: 400
    });

    const { password, ...rest } = updateUserDto; 
    if (password) { 
      const hashedPassword = hashSync(password, 10); 
      updateUserDto.password = hashedPassword; 
    } 
    return this.userRepository.save({id, ...updateUserDto});
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }
}
