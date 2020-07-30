declare module 'directory-exists' {
  /**
   * Check if a directory exists - synchronously
   * @param directory should be a string of a relative or absolute path.
   */
  function sync (directory: string): boolean
}
