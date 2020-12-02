import { replaceInFile } from 'replace-in-file'
import path from 'path'
import { ReplaceNameDescription } from '../typings'

export async function replaceProjectName (
  files: string[],
  projectName: string
): Promise<void> {
  await replaceInFile({
    files,
    from: /{{ projectName }}/g,
    to: projectName
  })
}

export async function replaceProjectDescription (
  files: string[],
  projectDescription: string
): Promise<void> {
  await replaceInFile({
    files,
    from: /{{ projectDescription }}/g,
    to: projectDescription
  })
}

export async function replaceDomainName (
  files: string[],
  domainName: string
): Promise<void> {
  await replaceInFile({
    files,
    from: /{{ domainName }}/g,
    to: domainName
  })
}

export async function replaceNameDescriptionInReadme (
  directory: string,
  { projectName, projectDescription }: ReplaceNameDescription
): Promise<void> {
  const readme = path.join(directory, 'README.md')
  await replaceProjectName([readme], projectName)
  await replaceProjectDescription([readme], projectDescription)
}
