import path from 'path'
import { ReplaceFilesObject } from '../typings'

import {
  replaceProjectName,
  replaceProjectDescription,
  replaceDomainName
} from '../utils/replaceInFiles'

export const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'templates')
export const TEMPLATE_API_PATH = path.join(TEMPLATE_PATH, 'api')
export const TEMPLATE_WEBSITE_PATH = path.join(TEMPLATE_PATH, 'website')
export const TEMPLATE_COMMON_PATH = path.join(TEMPLATE_PATH, 'common')

export const templateChoices = {
  api: [
    {
      name: 'Express.js with Sequelize (ORM)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'express')
      }
    },
    {
      name: 'Strapi (Headless CMS)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'strapi')
      }
    },
    {
      name:
        'Nest.js (framework for building efficient, scalable server-side applications)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'nest')
      }
    }
  ],
  website: [
    {
      name: 'React.js with Next.js (server-side rendering)',
      value: {
        path: path.join(TEMPLATE_WEBSITE_PATH, 'next'),
        replaceInFiles: async (
          directory: string,
          { projectName, projectDescription, domainName }: ReplaceFilesObject
        ) => {
          const headTag = path.join(directory, 'components', 'Head.tsx')
          const manifestJSON = path.join(directory, 'public', 'manifest.json')
          await replaceProjectName([headTag, manifestJSON], projectName)
          await replaceProjectDescription([headTag], projectDescription)
          await replaceDomainName([headTag], domainName)
        }
      }
    },
    {
      name: 'Vue.js with Nuxt.js (server-side rendering)',
      value: {
        path: path.join(TEMPLATE_WEBSITE_PATH, 'nuxt'),
        replaceInFiles: async (
          directory: string,
          { projectName, projectDescription, domainName }: ReplaceFilesObject
        ) => {
          const nuxtConfig = path.join(directory, 'nuxt.config.js')
          await replaceProjectName([nuxtConfig], projectName)
          await replaceProjectDescription([nuxtConfig], projectDescription)
          await replaceDomainName([nuxtConfig], domainName)
        }
      }
    }
  ]
}
