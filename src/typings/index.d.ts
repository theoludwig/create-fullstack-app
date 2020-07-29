interface ReplaceNameDescription {
  projectName: string
  projectDescription: string
}

interface ReplaceFilesObject extends ReplaceNameDescription {
  domainName: string
}

interface TemplateWebsite {
  path: string
  replaceInFiles: (
    directory: string,
    replaceFilesObject: ReplaceFilesObject
  ) => Promise<void>
}

interface TemplateAPI {
  path: string
}

interface QuestionsAnswers {
  templateWebsite: TemplateWebsite
  templateAPI: TemplateAPI
  projectName: string
  projectDescription: string
  domainName: string
}
