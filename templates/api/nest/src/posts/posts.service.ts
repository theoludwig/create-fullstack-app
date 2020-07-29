import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Posts } from './posts.entity'

@Injectable()
export class PostsService {
  constructor (
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>
  ) {
    this.postsRepository = postsRepository
  }

  findAll (): Promise<Posts[]> {
    return this.postsRepository.find()
  }
}
