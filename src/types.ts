export interface Pattern {
  basePath?: string
  paths: string[]
  ignore?: string[]
  includeFolders?: boolean
  indexOfFolders?: string
  output?: {
    filename?: string
    comment?: boolean | string
    semi?: boolean
    singleQuote?: boolean
    finalNewLine?: boolean
  }
  pathsJoined?: string[]
  pathsToExport?: string[]
  pathsToWatch?: string[]
}
