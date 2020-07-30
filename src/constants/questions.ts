import { templateChoices } from './templateChoices'
import { QuestionCollection, DistinctQuestion } from 'inquirer'

const questionWebsiteTemplate: DistinctQuestion = {
  name: 'templateWebsite',
  type: 'list',
  message: 'Select a Website template:',
  choices: templateChoices.website
}
const questionAPITemplate: DistinctQuestion = {
  name: 'templateAPI',
  type: 'list',
  message: 'Select an API template:',
  choices: templateChoices.api
}
const questionCommon: DistinctQuestion = [
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
const questionDomainName: DistinctQuestion = {
  name: 'domainName',
  type: 'input',
  message: 'Project domain name in production:'
}

export function getQuestions (
  onlyApi: boolean,
  onlyWebsite: boolean
): QuestionCollection {
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
