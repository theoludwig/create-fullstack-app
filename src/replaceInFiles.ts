import { replaceInFile } from 'replace-in-file'
import path from 'path'

interface ReplaceFilesObject {
  projectName: string
  projectDescription: string
  domainName: string
}

async function manageReplaceInFiles (
  { projectName, projectDescription, domainName }: ReplaceFilesObject,
  createdTemplatePathDirectory: string
) {
  async function replaceAppName () {
    await replaceInFile({
      files: [
        path.join(createdTemplatePathDirectory, 'README.md'),
        path.join(
          createdTemplatePathDirectory,
          'website',
          'public',
          'manifest.json'
        ),
        path.join(
          createdTemplatePathDirectory,
          'website',
          'components',
          'Head.tsx'
        )
      ],
      from: /{{ projectName }}/g,
      to: projectName
    })
  }

  async function replaceAppDescription () {
    await replaceInFile({
      files: [
        path.join(createdTemplatePathDirectory, 'README.md'),
        path.join(
          createdTemplatePathDirectory,
          'website',
          'components',
          'Head.tsx'
        )
      ],
      from: /{{ projectDescription }}/g,
      to: projectDescription
    })
  }

  async function replaceDomainName () {
    await replaceInFile({
      files: [
        path.join(
          createdTemplatePathDirectory,
          'website',
          'components',
          'Head.tsx'
        )
      ],
      from: /{{ domainName }}/g,
      to: domainName
    })
  }

  await replaceAppName()
  await replaceAppDescription()
  await replaceDomainName()
}

export default manageReplaceInFiles
