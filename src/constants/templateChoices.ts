import path from 'path'
import { replaceInFile } from 'replace-in-file'

interface ReplaceFilesObject {
  projectName: string
  projectDescription: string
  domainName: string
}

export const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'templates')
export const TEMPLATE_API_PATH = path.join(TEMPLATE_PATH, 'api')
export const TEMPLATE_WEBSITE_PATH = path.join(TEMPLATE_PATH, 'website')
export const TEMPLATE_COMMON_PATH = path.join(TEMPLATE_PATH, 'common')

// TODO: Refactor replaceInFile method
export const templateChoices = {
  api: [
    {
      name: 'Express with Sequelize (ORM)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'express'),
        replaceInFile: async (
          directory: string,
          { projectName, projectDescription }: ReplaceFilesObject
        ) => {
          const readme = path.join(directory, 'README.md')
          async function replaceAppName () {
            await replaceInFile({
              files: [readme],
              from: /{{ projectName }}/g,
              to: projectName
            })
          }

          async function replaceAppDescription () {
            await replaceInFile({
              files: [readme],
              from: /{{ projectDescription }}/g,
              to: projectDescription
            })
          }

          await replaceAppName()
          await replaceAppDescription()
        }
      }
    }
  ],
  website: [
    {
      name: 'React with Next (SSR)',
      value: {
        path: path.join(TEMPLATE_WEBSITE_PATH, 'next'),
        replaceInFile: async (
          directory: string,
          { projectName, projectDescription, domainName }: ReplaceFilesObject
        ) => {
          const readme = path.join(directory, 'README.md')
          const headTag = path.join(directory, 'components', 'Head.tsx')
          const manifestJSON = path.join(directory, 'public', 'manifest.json')
          async function replaceAppName () {
            await replaceInFile({
              files: [readme, headTag, manifestJSON],
              from: /{{ projectName }}/g,
              to: projectName
            })
          }

          async function replaceAppDescription () {
            await replaceInFile({
              files: [readme, headTag],
              from: /{{ projectDescription }}/g,
              to: projectDescription
            })
          }

          async function replaceDomainName () {
            await replaceInFile({
              files: [headTag],
              from: /{{ domainName }}/g,
              to: domainName
            })
          }

          await replaceAppName()
          await replaceAppDescription()
          await replaceDomainName()
        }
      }
    }
  ]
}
