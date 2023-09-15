import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import encry from '../utils/crypto'
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    
    const user = await this.userService.findOne(username);
    if (user.password !== encry(password, user.salt)) {
      throw new HttpException('密码错误', HttpStatus.UNAUTHORIZED)
    }
    const payload = { username: user.username, sub: user.id }
    return await this.jwtService.signAsync(payload)
  }
}
