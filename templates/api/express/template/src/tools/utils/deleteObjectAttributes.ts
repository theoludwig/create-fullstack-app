import { ObjectAny } from '../../typings/utils'

export const deleteObjectAttributes = (
  object: ObjectAny,
  attributesToDelete: readonly string[]
): ObjectAny => {
  const map = new Map(Object.entries(object))
  for (const attribute of attributesToDelete) {
    map.delete(attribute)
  }
  return Object.fromEntries(map)
}
