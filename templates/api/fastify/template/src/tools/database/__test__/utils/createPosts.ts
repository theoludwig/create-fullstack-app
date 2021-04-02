import PostTest from './PostTest'

export const createPosts = async (
  numberOfPostsToCreate: number
): Promise<void> => {
  for (let index = 1; index <= numberOfPostsToCreate; index++) {
    await PostTest.create({ title: `title-${index}` })
  }
}
