import { Sequelize } from 'sequelize-typescript'
import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

import { paginateModel } from '../paginateModel'
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
    const itemsPerPage = 20
    const page = 1
    await createPosts(numberOfPosts)
    const result = await paginateModel({
      Model: PostTest,
      paginateQuery: { itemsPerPage, page }
    })
    expect(result.hasMore).toBeTruthy()
    expect(result.rows.length).toEqual(20)
    expect(result.totalItems).toEqual(numberOfPosts)
  })

  it('fetch less than 20 itemsPerPage', async () => {
    const numberOfPosts = 15
    const itemsPerPage = 20
    const page = 1
    await createPosts(numberOfPosts)
    const result = await paginateModel({
      Model: PostTest,
      paginateQuery: { itemsPerPage, page }
    })
    expect(result.hasMore).toBeFalsy()
    expect(result.rows.length).toEqual(numberOfPosts)
    expect(result.totalItems).toEqual(numberOfPosts)
  })

  it('fetch more than 20 itemsPerPage', async () => {
    const numberOfPosts = 30
    const itemsPerPage = 25
    const page = 1
    await createPosts(numberOfPosts)
    const result = await paginateModel({
      Model: PostTest,
      paginateQuery: { itemsPerPage, page }
    })
    expect(result.hasMore).toBeTruthy()
    expect(result.rows.length).toEqual(itemsPerPage)
    expect(result.totalItems).toEqual(numberOfPosts)
    expect(result.itemsPerPage).toEqual(Number(itemsPerPage))
  })

  it('goes to the next page', async () => {
    let page = 1
    const numberOfPosts = 100
    const itemsPerPage = 30
    await createPosts(numberOfPosts)
    const result1 = await paginateModel({
      Model: PostTest,
      paginateQuery: { itemsPerPage, page },
      findOptions: {
        order: [['id', 'ASC']]
      }
    })
    page += 1
    expect(result1.hasMore).toBeTruthy()
    expect(result1.rows[itemsPerPage - 1].title).toEqual(
      `title-${itemsPerPage}`
    )
    expect(result1.totalItems).toEqual(numberOfPosts)
    const result2 = await paginateModel({
      Model: PostTest,
      paginateQuery: { itemsPerPage, page },
      findOptions: {
        order: [['id', 'ASC']]
      }
    })
    expect(result2.page).toEqual(page)
    expect(result2.hasMore).toBeTruthy()
    expect(result2.rows[itemsPerPage - 1].title).toEqual(
      `title-${itemsPerPage * 2}`
    )
    expect(result2.totalItems).toEqual(numberOfPosts)
  })
})
