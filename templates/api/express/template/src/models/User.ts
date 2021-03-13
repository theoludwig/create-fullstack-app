import {
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript'

import { deleteObjectAttributes } from '../tools/utils/deleteObjectAttributes'

export const userHiddenAttributes = ['password'] as const
export type UserHiddenAttributes = typeof userHiddenAttributes[number]
export interface UserToJSON extends Omit<User, UserHiddenAttributes> {}

@Table
export default class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  password?: string

  toJSON(): UserToJSON {
    const attributes = Object.assign({}, this.get())
    return deleteObjectAttributes(
      attributes,
      userHiddenAttributes
    ) as UserToJSON
  }
}
