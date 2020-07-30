import { PostsService } from './posts.service'
import { Controller, Get } from '@nestjs/common'
import { Posts } from './posts.entity'

@Controller('posts')
export class PostsController {
  constructor (private readonly postsService: PostsService) {}

  @Get()
  async getPosts (): Promise<Posts[]> {
    return await this.postsService.findAll()
  }
}
