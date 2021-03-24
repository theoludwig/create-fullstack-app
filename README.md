<h1 align="center">create-fullstack-app</h1>

<p align="center">
  <strong>Create Fullstack TypeScript application with ease.</strong>
</p>

<p align="center">
  <a href="https://github.com/Divlo/create-fullstack-app/actions?query=workflow%3A%22Node.js+CI%22"><img src="https://github.com/Divlo/create-fullstack-app/workflows/Node.js%20CI/badge.svg" alt="Node.js CI" /></a>
  <a href="https://www.npmjs.com/package/create-fullstack-app"><img src="https://img.shields.io/npm/v/create-fullstack-app.svg" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/ts-standard"><img alt="Typescript Standard Style" src="https://camo.githubusercontent.com/f87caadb70f384c0361ec72ccf07714ef69a5c0a/68747470733a2f2f62616467656e2e6e65742f62616467652f636f64652532307374796c652f74732d7374616e646172642f626c75653f69636f6e3d74797065736372697074"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="./CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <br/> <br/>
  <a href="https://github.com/GoogleChrome/lighthouse"><img width="650px" src="https://raw.githubusercontent.com/Divlo/create-fullstack-app/master/.github/lighthouse_google-chrome.gif" alt="Google Chrome Lighthouse" /></a>
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

_Note : The projects templates use [MySQL](https://www.mysql.com/) as database._

- [Express.js](https://expressjs.com/) with [Sequelize](https://sequelize.org/) (ORM)
- [Strapi](https://strapi.io/) (Headless CMS)
- [Nest.js](https://nestjs.com/) (framework for building efficient, scalable server-side applications)

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
```

## 💡 Contributing

Anyone can help to improve the project, submit a Feature Request, a bug report or even correct a simple spelling mistake.

The steps to contribute can be found in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## 📄 License

[MIT](./LICENSE)
