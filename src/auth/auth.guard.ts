import { CanActivate, ExecutionContext, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization.split(" ") ?? []
    return type === 'Bearer' ? token : undefined
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      // 即将调用的方法
      context.getHandler(),
      // controller类型
      context.getClass()
    ])
    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new HttpException("验证不通过", HttpStatus.FORBIDDEN)
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET')
      })
      request['user'] = payload;
    } catch (error) {
      throw new HttpException('token验证失败', HttpStatus.FORBIDDEN)
    }
    return true
  }
}

