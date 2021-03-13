import { FindOptions, Model } from 'sequelize/types'

import { BadRequestError } from '../errors/BadRequestError'
import { parseIntOrDefaultValue } from '../utils/parseIntOrDefaultValue'

interface PaginateModelOptions<M extends Model> {
  findOptions?: FindOptions
  queryOptions?: {
    page?: string
    itemsPerPage?: string
  }
  Model: typeof Model & (new () => M)
}

/** Allows to make a pagination system on a Sequelize model instance */
export const paginateModel = async <M extends Model<any, any>>(
  options: PaginateModelOptions<M>
): Promise<{
  totalItems: number
  hasMore: boolean
  rows: M[]
}> => {
  const {
    findOptions = {
      order: [['createdAt', 'DESC']]
    },
    queryOptions,
    Model
  } = options
  const page = parseIntOrDefaultValue(queryOptions?.page, 1)
  const itemsPerPage = parseIntOrDefaultValue(queryOptions?.itemsPerPage, 20)
  if (itemsPerPage > 100) {
    throw new BadRequestError('"itemsPerPage" should be less than 100')
  }
  const offset = (page - 1) * itemsPerPage
  const result = await Model.findAndCountAll<M>({
    limit: itemsPerPage,
    offset,
    ...findOptions
  })
  const { count, rows } = result
  const hasMore = page * itemsPerPage < count
  return { totalItems: count, hasMore, rows }
}
