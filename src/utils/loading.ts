import ora from 'ora'

const loading = async (text: string, callback: () => Promise<void>): Promise<void> => {
  const loader = ora({
    text,
    spinner: 'dots',
    color: 'cyan'
  }).start()
  await callback()
  loader.succeed()
}

export default loading
