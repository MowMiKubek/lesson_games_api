import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
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

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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
