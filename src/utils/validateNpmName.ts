import validateProjectName from 'validate-npm-package-name'

function validateNpmName (name: string): { isValid: boolean, problem: string } {
  const nameValidation = validateProjectName(name)
  if (nameValidation.validForNewPackages) {
    return { isValid: true, problem: '' }
  }

  const problems = [
    ...(nameValidation.errors ?? []),
    ...(nameValidation.warnings ?? [])
  ]

  return {
    isValid: false,
    problem: problems[0] ?? ''
  }
}

export default validateNpmName
