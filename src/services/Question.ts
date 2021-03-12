import { QuestionCollection, DistinctQuestion } from 'inquirer'

import { getTemplates } from './Template'

export interface QuestionsAnswers {
  templateWebsite: string
  templateAPI: string
  projectName: string
  projectDescription: string
  domainName: string
}

const questionCommon: DistinctQuestion[] = [
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

export async function getQuestions (
  onlyApi: boolean,
  onlyWebsite: boolean
): Promise<QuestionCollection> {
  const templateChoices = await getTemplates()
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
