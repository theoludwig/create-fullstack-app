import { FindOptions } from 'sequelize/types'

import { helperQueryNumber } from '../helperQueryNumber'

const DEFAULT_OPTIONS: FindOptions = {
  order: [['createdAt', 'DESC']]
}

/**
 * Allows to make a pagination system on a Sequelize model instance
 */
async function getPagesHelper (
  { req, res, next }: RequestHandlerObject,
  Model: SequelizeModelInstance,
  options = DEFAULT_OPTIONS
): Promise<void> {
  const page = helperQueryNumber(req.query.page as string, 1)
  const limit = helperQueryNumber(req.query.limit as string, 10)
  const offset = (page - 1) * limit
  const result = await Model.findAndCountAll({
    limit,
    offset,
    ...options
  })
  const { count, rows } = result
  const hasMore = page * limit < count
  res.status(200).json({ totalItems: count, hasMore, rows })
}

export { getPagesHelper }
