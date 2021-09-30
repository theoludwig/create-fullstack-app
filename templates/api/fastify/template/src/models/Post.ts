import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript'
import { Static, Type } from '@sinclair/typebox'

export const postSchema = Type.Object({
  id: Type.Integer(),
  title: Type.String(),
  description: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String()
})

export type PostSchemaType = Static<typeof postSchema>

@Table
// @ts-expect-error
export default class Post extends Model implements PostSchemaType {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string
}
