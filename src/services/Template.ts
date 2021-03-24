import * as fsWithCallbacks from 'fs'
import path from 'path'

const fs = fsWithCallbacks.promises

export const templatesPath = path.join(__dirname, '..', '..', 'templates')
export const commonTemplatesPath = path.join(templatesPath, 'common')
export const commonConfigTemplatesPath = path.join(templatesPath, 'common-config')

export type TemplateType = 'api' | 'website'

export type TemplateJSON = Omit<Template, 'type'>

export type Templates = {
  [key in TemplateType]: string[]
}

export interface Template {
  name: string
  type: TemplateType
  path: string
}

export const getTemplates = async (): Promise<Templates> => {
  const apiTemplatesFolders = await fs.readdir(path.join(templatesPath, 'api'))
  const websiteTemplatesFolders = await fs.readdir(
    path.join(templatesPath, 'website')
  )
  return {
    api: apiTemplatesFolders,
    website: websiteTemplatesFolders
  }
}

interface GetTemplateOptions {
  name: string
  type: TemplateType
}

export const getTemplate = async (
  options: GetTemplateOptions
): Promise<Template> => {
  const { type, name } = options
  const templatePath = path.join(templatesPath, type, name)
  const template = await fs.readFile(path.join(templatePath, 'template.json'), {
    encoding: 'utf-8'
  })
  const templateJSON: TemplateJSON = JSON.parse(template)
  return { ...templateJSON, type, path: templatePath }
}
