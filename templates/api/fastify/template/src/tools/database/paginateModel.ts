import { FindOptions, Model } from 'sequelize/types'
import {
  Static,
  TArray,
  TBoolean,
  TNumber,
  TObject,
  TSchema,
  Type
} from '@sinclair/typebox'

export const paginateQuerySchema = Type.Object({
  page: Type.Integer({ default: 1 }),
  itemsPerPage: Type.Integer({ default: 20, maximum: 100 })
})

export type PaginateQuery = Static<typeof paginateQuerySchema>

export const paginateModelSchema = <T extends TSchema>(
  items: T
): TObject<{
  totalItems: TNumber
  hasMore: TBoolean
  page: TNumber
  itemsPerPage: TNumber
  rows: TArray<T>
}> => {
  return Type.Object({
    totalItems: Type.Number(),
    hasMore: Type.Boolean(),
    page: Type.Number(),
    itemsPerPage: Type.Number(),
    rows: Type.Array<T>(items)
  })
}

interface PaginateModelOptions<M extends Model> {
  findOptions?: FindOptions
  paginateQuery: PaginateQuery
  Model: typeof Model & (new () => M)
}

/** Allows to make a pagination system on a Sequelize model instance */
export const paginateModel = async <M extends Model<any, any>>(
  options: PaginateModelOptions<M>
): Promise<{
  totalItems: number
  hasMore: boolean
  page: number
  itemsPerPage: number
  rows: M[]
}> => {
  const {
    findOptions = {
      order: [['createdAt', 'DESC']]
    },
    paginateQuery,
    Model
  } = options
  const { page, itemsPerPage } = paginateQuery
  const offset = (page - 1) * itemsPerPage
  const result = await Model.findAndCountAll<M>({
    limit: itemsPerPage,
    offset,
    ...findOptions
  })
  const { count, rows } = result
  const hasMore = page * itemsPerPage < count
  return { page, itemsPerPage, totalItems: count, hasMore, rows }
}
