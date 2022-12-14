import { User } from '../../../entity/user.entity';

export class BlogResponseDto {
  bloggerId: number;
  username: string;
  displayName: string;
  shortWord: string;
  profileImageUrl: string;
  title: string;

  constructor(
    user: User,
    private favoritesCount: number,
    private followersCount: number,
  ) {
    this.bloggerId = user.id;
    this.username = user.username;
    this.displayName = user.displayName;
    this.shortWord = user.blog.shortWord;
    this.profileImageUrl = user.profileImageUrl;
    this.title = user.blog.title;
  }
}
