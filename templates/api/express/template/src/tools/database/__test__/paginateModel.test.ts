import { Sequelize } from 'sequelize-typescript'
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

import { paginateModel } from '../paginateModel'
import { BadRequestError } from '../../errors/BadRequestError'
import PostTest from './utils/PostTest'
import { createPosts } from './utils/createPosts'

let sqlite: Database | undefined
let sequelize: Sequelize | undefined

describe('/tools/database/paginateModel', () => {
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

  it('fetch a certain amount of rows', async () => {
    const numberOfPosts = 21
    await createPosts(numberOfPosts)
    const result = await paginateModel({ Model: PostTest })
    expect(result.hasMore).toBeTruthy()
    expect(result.rows.length).toEqual(20)
    expect(result.totalItems).toEqual(numberOfPosts)
  })

  it('fetch less than 20 itemsPerPage', async () => {
    const numberOfPosts = 15
    await createPosts(numberOfPosts)
    const result = await paginateModel({ Model: PostTest })
    expect(result.hasMore).toBeFalsy()
    expect(result.rows.length).toEqual(numberOfPosts)
    expect(result.totalItems).toEqual(numberOfPosts)
  })

  it('fetch more than 20 itemsPerPage', async () => {
    const numberOfPosts = 30
    const itemsPerPage = '25'
    await createPosts(numberOfPosts)
    const result = await paginateModel({
      Model: PostTest,
      queryOptions: { itemsPerPage }
    })
    expect(result.hasMore).toBeTruthy()
    expect(result.rows.length).toEqual(parseInt(itemsPerPage))
    expect(result.totalItems).toEqual(numberOfPosts)
  })

  it('throws "BadRequestError" if "itemsPerPage" is more than 100', async () => {
    const numberOfPosts = 10
    const itemsPerPage = '101'
    await createPosts(numberOfPosts)
    await expect(
      paginateModel({ Model: PostTest, queryOptions: { itemsPerPage } })
    ).rejects.toThrow(BadRequestError)
  })

  it('goes to the next page', async () => {
    let page = 1
    const numberOfPosts = 100
    const itemsPerPage = '30'
    const itemsPerPageInt = parseInt(itemsPerPage)
    await createPosts(numberOfPosts)
    const result1 = await paginateModel({
      Model: PostTest,
      queryOptions: { itemsPerPage, page: page.toString() },
      findOptions: {
        order: [['id', 'ASC']]
      }
    })
    page += 1
    expect(result1.hasMore).toBeTruthy()
    expect(result1.rows[itemsPerPageInt - 1].getDataValue('title')).toEqual(
      `title-${itemsPerPage}`
    )
    expect(result1.totalItems).toEqual(numberOfPosts)
    const result2 = await paginateModel({
      Model: PostTest,
      queryOptions: { itemsPerPage, page: page.toString() },
      findOptions: {
        order: [['id', 'ASC']]
      }
    })
    expect(result2.hasMore).toBeTruthy()
    expect(result2.rows[itemsPerPageInt - 1].getDataValue('title')).toEqual(
      `title-${itemsPerPageInt * 2}`
    )
    expect(result2.totalItems).toEqual(numberOfPosts)
  })
})
