import fsMock from 'mock-fs'
import * as fsWithCallbacks from 'fs'

import {
  replaceProjectName,
  replaceProjectDescription,
  replaceDomainName
} from '../replaceInFiles'

const fs = fsWithCallbacks.promises

describe('utils/replaceInFiles', () => {
  it('should replace name, description and domain name', async () => {
    const projectName = 'create-fullstack-app'
    const projectDescription = 'Create Fullstack TypeScript application with ease.'
    const domainName = 'npmjs.com/package/create-fullstack-app'
    fsMock({
      '/files': {
        'README.md': '{{ projectName }} - {{ projectDescription }} - {{ domainName }}',
        'index.ts': "console.log('Welcome on {{ projectName }} - {{ projectDescription }} - {{ domainName }}')"
      }
    })
    await replaceProjectName(
      ['/files/README.md', '/files/index.ts'],
      projectName
    )
    await replaceProjectDescription(
      ['/files/README.md', '/files/index.ts'],
      projectDescription
    )
    await replaceDomainName(
      ['/files/README.md', '/files/index.ts'],
      domainName
    )
    const readmeContent = await fs.readFile('/files/README.md')
    const indexContent = await fs.readFile('/files/index.ts')
    expect(readmeContent.toString()).toEqual(`${projectName} - ${projectDescription} - ${domainName}`)
    expect(indexContent.toString()).toEqual(
      `console.log('Welcome on ${projectName} - ${projectDescription} - ${domainName}')`
    )
  })
})
