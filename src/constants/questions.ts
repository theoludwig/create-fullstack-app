import { templateChoices } from './templateChoices'

const questionWebsiteTemplate = {
  name: 'templateWebsite',
  type: 'list',
  message: 'Select a Website template:',
  choices: templateChoices.website
}
const questionAPITemplate = {
  name: 'templateAPI',
  type: 'list',
  message: 'Select an API template:',
  choices: templateChoices.api
}
const questionCommon = [
  {
    name: 'projectName',
    type: 'input',
    message: 'Project name:'
  },
  {
    name: 'projectDescription',
    type: 'input',
    message: 'Project description:'
  }
]
const questionDomainName = {
  name: 'domainName',
  type: 'input',
  message: 'Project domain name in production:'
}

export function getQuestions (onlyApi: boolean, onlyWebsite: boolean) {
  if (onlyApi) {
    return [questionAPITemplate, ...questionCommon]
  }

  if (onlyWebsite) {
    return [questionWebsiteTemplate, ...questionCommon, questionDomainName]
  }

  return [
    questionWebsiteTemplate,
    questionAPITemplate,
    ...questionCommon,
    questionDomainName
  ]
}
