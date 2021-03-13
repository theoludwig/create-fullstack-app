import { Sequelize } from 'sequelize-typescript'
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

import { alreadyUsedValidation } from '../alreadyUsedValidation'
import PostTest from '../../database/__test__/utils/PostTest'
import { createPosts } from '../../database/__test__/utils/createPosts'

let sqlite: Database | undefined
let sequelize: Sequelize | undefined

describe('/tools/validations/alreadyUsedValidation', () => {
  beforeAll(async () => {
    sqlite = await open({
      filename: ':memory:',
      driver: sqlite3.Database
    })
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [PostTest]
    })
  })

  beforeEach(async () => {
    await sequelize?.sync({ force: true })
  })

  afterAll(async () => {
    await sqlite?.close()
    await sequelize?.close()
  })

  it("returns true if the post title doesn't exist yet", async () => {
    const numberOfPosts = 3
    await createPosts(numberOfPosts)
    expect(
      await alreadyUsedValidation(
        PostTest,
        'title',
        `title-${numberOfPosts + 1}`
      )
    ).toBeTruthy()
  })

  it('throws an error if the post title already exist', async () => {
    const numberOfPosts = 3
    await createPosts(numberOfPosts)
    await expect(
      alreadyUsedValidation(PostTest, 'title', 'title-1')
    ).rejects.toThrowError()
  })
})
