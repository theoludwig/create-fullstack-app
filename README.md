<h1 align="center">create-fullstack-app</h1>

<p align="center">
  <strong>Create Fullstack TypeScript application with ease.</strong>
</p>

<p align="center">
  <a href="./CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" /></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="./CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <a href="https://dependabot.com/"><img src="https://badgen.net/github/dependabot/Divlo/create-fullstack-app?icon=dependabot" alt="Dependabot badge" /></a>
  <br />
  <a href="https://github.com/Divlo/create-fullstack-app/actions/workflows/build.yml"><img src="https://github.com/Divlo/create-fullstack-app/actions/workflows/build.yml/badge.svg?branch=develop" /></a>
  <a href="https://github.com/Divlo/create-fullstack-app/actions/workflows/lint.yml"><img src="https://github.com/Divlo/create-fullstack-app/actions/workflows/lint.yml/badge.svg?branch=develop" /></a>
  <a href="https://github.com/Divlo/create-fullstack-app/actions/workflows/test.yml"><img src="https://github.com/Divlo/create-fullstack-app/actions/workflows/test.yml/badge.svg?branch=develop" /></a>
  <br />
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release" /></a>
  <a href="https://www.npmjs.com/package/create-fullstack-app"><img src="https://img.shields.io/npm/v/create-fullstack-app.svg" alt="npm version"></a>
  <br/> <br/>
  <a href="https://github.com/GoogleChrome/lighthouse"><img width="650px" src="./lighthouse_google-chrome.gif" alt="Google Chrome Lighthouse" /></a>
</p>

## 📜 About

**create-fullstack-app** is a CLI tool to easily generate boilerplate code for your projects with TypeScript. You don't need to learn and configure many tools and create the basics folders/files so you can **focus on development**. There are many templates available so you can generate any projects (front-end, back-end or both by default) with any frameworks.

## 🚀 Features

- 💯 Maximize Lighthouse Google Chrome score
- ✨ Follow [Typescript Standard Style](https://www.npmjs.com/package/ts-standard)
- ⚡️ Easy to use

## 📦 Templates availables

### Website (front-end)

- [React.js](https://reactjs.org/) with [Next.js](https://nextjs.org/) (server-side rendering)
- [Vue.js](https://vuejs.org/) with [Nuxt.js](https://nuxtjs.org/) (server-side rendering)

### API (back-end)

- [Express.js](https://expressjs.com/) with [Sequelize](https://sequelize.org/) (ORM) + [MySQL](https://www.mysql.com/) as database
- [Fastify](https://fastify.io/) with [Sequelize](https://sequelize.org/) (ORM) + [MySQL](https://www.mysql.com/) as database
- [Fastify](https://fastify.io/) with [Prisma](https://www.prisma.io/) (ORM) + [PostgreSQL](https://www.postgresql.org/) as database
- [Strapi](https://strapi.io/) (Headless CMS) + [MySQL](https://www.mysql.com/) as database
- [Nest.js](https://nestjs.com/) (framework for building efficient, scalable server-side applications) + [MySQL](https://www.mysql.com/) as database

## ⚙️ Usage

```sh
npx create-fullstack-app <directory-name>
```

It will ask you some questions (template(s), name, description, etc.), when answered, it will copy and install all the dependencies needed for your project.

### Options

```text
-V, --version   Output the version number.
-h, --help      Display help for command.
--only-website  Generate only a website project.
--only-api      Generate only an API project.
--no-install    It avoids the installation of npm packages inside `node_modules`.
--github        It creates a `.github` folder that contains issues templates, pull request templates and configurations for GitHub Actions.
```

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or even correct a simple spelling mistake.

The steps to contribute can be found in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## 📄 License

[MIT](./LICENSE)
