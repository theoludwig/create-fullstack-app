import ora from 'ora'

export const loading = async (
  text: string,
  callback: () => Promise<void>
): Promise<void> => {
  const loader = ora({
    text,
    spinner: 'dots',
    color: 'cyan'
  }).start()
  await callback()
  loader.succeed()
}
