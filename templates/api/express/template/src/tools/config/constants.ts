import path from 'path'

import { capitalize } from '../utils/capitalize'

export const srcPath = path.join(__dirname, '..', '..')
export const rootPath = path.join(srcPath, '..')

export const commonErrorsMessages = {
  charactersLength: (
    name: string,
    {
      min,
      max
    }: {
      min?: number
      max?: number
    }
  ) => {
    const capitalizedName = capitalize(name)
    if (min != null && max != null) {
      if (min >= max) {
        throw new Error('min should be less than max')
      }
      return `${capitalizedName} must be between ${min} and ${max} characters`
    }
    if (max != null) {
      return `${capitalizedName} must be no longer than ${max} characters`
    }
    if (min != null) {
      return `${capitalizedName} should be at least ${min} characters`
    }
    return `${capitalizedName} should not be empty`
  }
}
