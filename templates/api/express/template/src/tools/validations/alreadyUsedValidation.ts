import { SequelizeModelInstance } from '../../typings/utils'
import { capitalize } from '../utils/capitalize'

/** returns true if the field property doesn't exist yet on the Sequelize model instance otherwise throws an error */
export const alreadyUsedValidation = async (
  Model: SequelizeModelInstance,
  fieldName: string,
  fieldValue: string
): Promise<boolean> => {
  const foundInstance = await Model.findOne({
    where: { [fieldName]: fieldValue }
  })
  if (foundInstance != null) {
    return await Promise.reject(
      new Error(`${capitalize(fieldName)} already used`)
    )
  }
  return true
}
