export interface ReplaceNameDescription {
  projectName: string
  projectDescription: string
}

export interface ReplaceFilesObject extends ReplaceNameDescription {
  domainName: string
}

export interface TemplateWebsite {
  path: string
  replaceInFiles: (
    directory: string,
    replaceFilesObject: ReplaceFilesObject
  ) => Promise<void>
}

export interface TemplateAPI {
  path: string
}

export interface QuestionsAnswers {
  templateWebsite: TemplateWebsite
  templateAPI: TemplateAPI
  projectName: string
  projectDescription: string
  domainName: string
}
