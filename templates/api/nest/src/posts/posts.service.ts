import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Posts } from './posts.entity'

@Injectable()
export class PostsService {
  constructor (
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>
  ) {}

  async findAll (): Promise<Posts[]> {
    return await this.postsRepository.find()
  }
}
