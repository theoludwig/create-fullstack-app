import { QuestionCollection, DistinctQuestion } from 'inquirer'

import { getTemplates } from './Template'

export interface QuestionsAnswers {
  templateWebsite: string
  templateAPI: string
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
    return [questionAPITemplate]
  }

  if (onlyWebsite) {
    return [questionWebsiteTemplate]
  }

  return [
    questionWebsiteTemplate,
    questionAPITemplate
  ]
}
