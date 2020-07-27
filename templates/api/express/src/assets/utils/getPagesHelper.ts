import { FindOptions } from 'sequelize/types'

import errorHandler from './errorHandler'
import { serverError } from '../config/errors'
import helperQueryNumber from '../utils/helperQueryNumber'

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
): Promise<any> {
  const page = helperQueryNumber(req.query.page, 1)
  const limit = helperQueryNumber(req.query.limit, 10)
  const offset = (page - 1) * limit
  try {
    const result = await Model.findAndCountAll({
      limit,
      offset,
      ...options
    })
    const { count, rows } = result
    const hasMore = page * limit < count
    return res.status(200).json({ totalItems: count, hasMore, rows })
  } catch (error) {
    console.log(error)
    return errorHandler(next, serverError)
  }
}

export default getPagesHelper
