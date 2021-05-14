import { Post } from '.prisma/client'
import { Static, Type } from '@sinclair/typebox'

import { date, id } from './utils'

const post = {
  id,
  title: Type.String({ maxLength: 255 }),
  content: Type.String(),
  createdAt: date.createdAt,
  updatedAt: date.updatedAt
}

export const postSchema = Type.Object(post)

export type PostSchemaType = Static<typeof postSchema>

export const bodyPostOptionnalSchema = Type.Object({
  title: Type.Optional(post.title),
  content: Type.Optional(post.content)
})

export type BodyPostOptionnalSchemaType = Static<typeof bodyPostOptionnalSchema>

export const bodyPostSchema = Type.Object({
  title: post.title,
  content: post.content
})

export type BodyPostSchemaType = Static<typeof bodyPostSchema>

export const paramsPostSchema = Type.Object({
  postId: post.id
})

export type ParamsPostSchemaType = Static<typeof paramsPostSchema>

export const postExample: Post = {
  id: 1,
  title: 'Title',
  content: 'Content...',
  createdAt: new Date(),
  updatedAt: new Date()
}
