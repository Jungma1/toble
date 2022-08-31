import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../user/model/user.entity';
import { AuthService } from './auth.service';
import { OAuthRequestDto } from './dto/oauth-request.dto';
import UserResponseDto from './dto/user-response.dto';
import { GoogleGuard } from './guard/google.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async auth(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;

    return res.status(200).send({
      statusCode: 200,
      data: new UserResponseDto(user),
    });
  }

  @Get('oauth/google')
  @UseGuards(GoogleGuard)
  async google() {
    // callback url
  }

  @Get('oauth/google/redirect')
  @UseGuards(GoogleGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as OAuthRequestDto;
    const { accessToken, refreshToken } = await this.authService.login(user);

    this.createCookies(res, accessToken, refreshToken);
    return res.redirect('http://localhost:3000');
  }

  createCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      domain: 'localhost',
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      maxAge: 60 * 60 * 1000 * 24 * 30,
    });
  }
}
