import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto)
  }

  @Get()
  async findAll() {
    throw new ApiException("用户不存在", ApiErrorCode.USER_NOTEXIST)
    return await this.userRepository.find()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.userRepository.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.userService.remove(+id);
  }
}
