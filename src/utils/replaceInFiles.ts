import { replaceInFile } from 'replace-in-file'
import path from 'path'

export async function replaceProjectName (
  files: string[],
  projectName: string
) {
  await replaceInFile({
    files,
    from: /{{ projectName }}/g,
    to: projectName
  })
}

export async function replaceProjectDescription (
  files: string[],
  projectDescription: string
) {
  await replaceInFile({
    files,
    from: /{{ projectDescription }}/g,
    to: projectDescription
  })
}

export async function replaceDomainName (files: string[], domainName: string) {
  await replaceInFile({
    files,
    from: /{{ domainName }}/g,
    to: domainName
  })
}

export async function replaceNameDescriptionInReadme (
  directory: string,
  { projectName, projectDescription }: ReplaceFilesObject
) {
  const readme = path.join(directory, 'README.md')
  await replaceProjectName([readme], projectName)
  await replaceProjectDescription([readme], projectDescription)
}
