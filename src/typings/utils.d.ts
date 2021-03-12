export interface ObjectAny {
  [key: string]: any
}

export interface ReplaceNameDescription {
  projectName: string
  projectDescription: string
}

export interface ReplaceFilesObject extends ReplaceNameDescription {
  domainName: string
}
