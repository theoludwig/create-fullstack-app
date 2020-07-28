import path from 'path'

import {
  replaceProjectName,
  replaceProjectDescription,
  replaceDomainName,
  replaceNameDescriptionInReadme
} from '../utils/replaceInFiles'

export const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'templates')
export const TEMPLATE_API_PATH = path.join(TEMPLATE_PATH, 'api')
export const TEMPLATE_WEBSITE_PATH = path.join(TEMPLATE_PATH, 'website')
export const TEMPLATE_COMMON_PATH = path.join(TEMPLATE_PATH, 'common')

export const templateChoices = {
  api: [
    {
      name: 'Express with Sequelize (ORM)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'express'),
        replaceInFiles: replaceNameDescriptionInReadme
      }
    },
    {
      name: 'Strapi (Headless CMS)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'strapi'),
        replaceInFiles: replaceNameDescriptionInReadme
      }
    }
  ],
  website: [
    {
      name: 'React with Next (SSR)',
      value: {
        path: path.join(TEMPLATE_WEBSITE_PATH, 'next'),
        replaceInFiles: async (
          directory: string,
          { projectName, projectDescription, domainName }: ReplaceFilesObject
        ) => {
          const readme = path.join(directory, 'README.md')
          const headTag = path.join(directory, 'components', 'Head.tsx')
          const manifestJSON = path.join(directory, 'public', 'manifest.json')
          await replaceProjectName([readme, headTag, manifestJSON], projectName)
          await replaceProjectDescription([readme, headTag], projectDescription)
          await replaceDomainName([headTag], domainName)
        }
      }
    }
  ]
}
