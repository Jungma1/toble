import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { Follow } from '../../entity/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
