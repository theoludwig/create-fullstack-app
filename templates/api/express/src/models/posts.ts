import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export default class Post extends Model<Post> {
    @Column({
      type: DataType.STRING,
      allowNull: false
    })
    title!: string;
}
