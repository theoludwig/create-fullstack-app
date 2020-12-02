import path from 'path'
import { ReplaceFilesObject } from '../typings'

import {
  replaceProjectName,
  replaceProjectDescription,
  replaceDomainName
} from '../utils/replaceInFiles'

export const TEMPLATE_PATH = path.join(__dirname, '..', '..', 'templates')
export const TEMPLATE_API_PATH = path.join(TEMPLATE_PATH, 'api')
export const TEMPLATE_WEBSITE_PATH = path.join(TEMPLATE_PATH, 'website')
export const TEMPLATE_COMMON_PATH = path.join(TEMPLATE_PATH, 'common')

export const templateChoices = {
  api: [
    {
      name: 'Express.js with Sequelize (ORM)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'express')
      },
      dependencies: [
        'cors',
        'dotenv',
        'express',
        'express-async-errors',
        'express-fileupload',
        'express-http-to-https',
        'express-validator',
        'helmet',
        'morgan',
        'mysql2',
        'reflect-metadata',
        'sequelize@5.22.3',
        'sequelize-typescript@1.1.0',
        'tslib'
      ],
      devDependencies: [
        '@types/bluebird',
        '@types/cors',
        '@types/express',
        '@types/express-fileupload',
        '@types/helmet',
        '@types/jest',
        '@types/morgan',
        '@types/node',
        '@types/supertest',
        '@types/validator',
        'concurrently',
        'cross-env',
        'jest',
        'nodemon',
        'rimraf',
        'snazzy',
        'sqlite',
        'sqlite3',
        'supertest',
        'ts-jest',
        'ts-standard',
        'typescript'
      ]
    },
    {
      name: 'Strapi (Headless CMS)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'strapi')
      },
      dependencies: [
        'strapi',
        'strapi-admin',
        'strapi-utils',
        'strapi-plugin-content-type-builder',
        'strapi-plugin-content-manager',
        'strapi-plugin-users-permissions',
        'strapi-plugin-email',
        'strapi-plugin-upload',
        'strapi-connector-bookshelf',
        'knex',
        'mysql'
      ],
      devDependencies: ['snazzy', 'standard']
    },
    {
      name:
        'Nest.js (framework for building efficient, scalable server-side applications)',
      value: {
        path: path.join(TEMPLATE_API_PATH, 'nest')
      },
      dependencies: [
        '@nestjs/common',
        '@nestjs/config',
        '@nestjs/core',
        '@nestjs/platform-express',
        '@nestjs/typeorm',
        'mysql',
        'reflect-metadata',
        'rimraf',
        'rxjs',
        'typeorm'
      ],
      devDependencies: [
        '@nestjs/cli',
        '@nestjs/schematics',
        '@nestjs/testing',
        '@types/express',
        '@types/jest',
        '@types/node',
        '@types/supertest',
        'jest',
        'snazzy',
        'ts-standard',
        'supertest',
        'ts-jest',
        'ts-loader',
        'ts-node',
        'tsconfig-paths',
        'typescript'
      ]
    }
  ],
  website: [
    {
      name: 'React.js with Next.js (server-side rendering)',
      value: {
        path: path.join(TEMPLATE_WEBSITE_PATH, 'next'),
        replaceInFiles: async (
          directory: string,
          { projectName, projectDescription, domainName }: ReplaceFilesObject
        ) => {
          const headTag = path.join(directory, 'components', 'Head.tsx')
          const manifestJSON = path.join(directory, 'public', 'manifest.json')
          await replaceProjectName([headTag, manifestJSON], projectName)
          await replaceProjectDescription([headTag], projectDescription)
          await replaceDomainName([headTag], domainName)
        }
      },
      dependencies: [
        'axios',
        'express',
        'express-http-to-https',
        'next',
        'next-fonts',
        'next-pwa',
        'nextjs-redirect',
        'react',
        'react-dom'
      ],
      devDependencies: [
        '@types/node',
        '@types/react',
        '@types/styled-jsx',
        'cross-env',
        'snazzy',
        'ts-standard',
        'typescript'
      ]
    },
    {
      name: 'Vue.js with Nuxt.js (server-side rendering)',
      value: {
        path: path.join(TEMPLATE_WEBSITE_PATH, 'nuxt'),
        replaceInFiles: async (
          directory: string,
          { projectName, projectDescription, domainName }: ReplaceFilesObject
        ) => {
          const nuxtConfig = path.join(directory, 'nuxt.config.js')
          await replaceProjectName([nuxtConfig], projectName)
          await replaceProjectDescription([nuxtConfig], projectDescription)
          await replaceDomainName([nuxtConfig], domainName)
        }
      },
      dependencies: [
        '@nuxt/typescript-runtime',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        'nuxt'
      ],
      devDependencies: [
        '@nuxt/typescript-runtime',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        'nuxt'
      ]
    }
  ]
}
