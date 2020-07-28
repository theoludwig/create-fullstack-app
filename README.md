<h1 align="center">create-fullstack-app</h1>

<p align="center">
  <strong>Create Fullstack TypeScript application with ease.</strong>
</p>

<p align="center">
  <a href="https://gitmoji.carloscuesta.me/"><img src="https://camo.githubusercontent.com/2a4924a23bd9ef18afe793f4999b1b9ec474e48f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746d6f6a692d253230f09f989c253230f09f988d2d4646444436372e7376673f7374796c653d666c61742d737175617265" alt="Gitmoji"/></a>
  <a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="https://www.npmjs.com/package/create-fullstack-app"><img src="https://img.shields.io/npm/v/create-fullstack-app.svg" alt="npm version"></a>
  <br/> <br/>
  <a href="https://github.com/GoogleChrome/lighthouse"><img width="650px" src="https://raw.githubusercontent.com/Divlo/create-fullstack-app/master/.github/lighthouse_google-chrome.gif" alt="Google Chrome Lighthouse" /></a>
</p>

## 📜 About

**create-fullstack-app** is a CLI tool to easily generate boilerplate code for your projects with TypeScript. You don't need to learn and configure many tools and create the basics folders/files so you can **focus on development**. There are many templates available so you can generate any projects (front-end, back-end or both) with any frameworks.

## 🚀 Features

- 💯 Maximize Lighthouse Google Chrome score
- ✨ Follow [JavaScript Standard Style](https://standardjs.com/) (for TypeScript)
- ⚡️ Easy to use

## 📦 Templates availables :

### Website (front-end) :

- [React.js](https://reactjs.org/) with [Next.js](https://nextjs.org/) (server-side rendering)
- [Vue.js](https://vuejs.org/) with [Nuxt.js](https://nuxtjs.org/) (server-side rendering)

### API (back-end) :

_Note : The projects templates use [MySQL](https://www.mysql.com/) as database._

- [Express.js](https://expressjs.com/) with [Sequelize](https://sequelize.org/) (ORM)
- [Strapi](https://strapi.io/) (Headless CMS)

## ⚙️ Usage

```sh
npx create-fullstack-app <directory-name>
```

It will ask you some questions (template(s), name, description, etc.), when answered, it will copy and install all the dependencies needed for your project.

### Options :

```
-V, --version   output the version number
-h, --help      display help for command
--only-website  generate only a website project
--only-api      generate only an API project
```

### Tips :

By default, when you generate a website (front-end) project, there are the icons of the TypeScript logo in various sizes located in the static/public folder.

You can easily generate you own icons of various sizes thanks to [Web App Manifest Generator](https://app-manifest.firebaseapp.com/).

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## 📄 License

[MIT](./LICENSE)
