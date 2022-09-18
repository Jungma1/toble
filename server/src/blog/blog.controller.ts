import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthUser } from '../user/decorator/user-decorator';
import { User } from '../user/model/user.entity';
import { BlogService } from './blog.service';
import { BlogCreateRequestDto } from './dto/blog-create-request.dto';

@Controller('api/v1/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.blogService.findOne(username);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@AuthUser() user: User, @Body() request: BlogCreateRequestDto) {
    const username = await this.blogService.create(user, request);
    return username;
  }
}
