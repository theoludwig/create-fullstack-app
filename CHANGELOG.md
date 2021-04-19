# Changelog

## [3.0.1](https://github.com/Divlo/create-fullstack-app/compare/v3.0.0...v3.0.1) (2021-04-19)

### Bug Fixes

- **templates:** update fastify add HOST variable ([41f2be5](https://github.com/Divlo/create-fullstack-app/commit/41f2be583372aed6bc833f4ba019a1168ab1ad69))

### Chore

- Update dependencies to latest version of every templates
- Set `engine-strict=true` inside `.npmrc`
- Update GitHub Actions to remove `commitlint.yml`, instead use `npm run lint:commit`

## [3.0.0](https://github.com/Divlo/create-fullstack-app/compare/v2.4.0...v3.0.0) (2021-04-03)

### Features

- **templates:** add `CODE_OF_CONDUCT.md` and `CONTRIBUTING.md` files ([ce2c2dc](https://github.com/Divlo/create-fullstack-app/commit/ce2c2dc933c011d247262a5a9ccbcb9ae93cad7c))
- **templates:** add `Fastify` ([6662010](https://github.com/Divlo/create-fullstack-app/commit/666201006d745980e9d861a44fc5c67da7dd3907)), closes [#21](https://github.com/Divlo/create-fullstack-app/issues/21)
- add `--github` option ([083b1cd](https://github.com/Divlo/create-fullstack-app/commit/083b1cdc17bd5c22c3da249fb7f748901fabfa45)), closes [#10](https://github.com/Divlo/create-fullstack-app/issues/10)
- add `--no-install` option ([bfcc827](https://github.com/Divlo/create-fullstack-app/commit/bfcc827b5698aa562de08a68fb2e3b6ea9475e1e)), closes [#25](https://github.com/Divlo/create-fullstack-app/issues/25)
- add docker configuration files ([ec20650](https://github.com/Divlo/create-fullstack-app/commit/ec20650715b0a3af6bbfe6f2eb5eb9c3d19f9321))

### BREAKING CHANGES

- Bump minimal `npm` and `Node.js` versions
- No longer ask for `projectName`, `projectDescription` and `domainName`
- It doesn't install the latest versions when creating a new project (now usage of `package-lock.json` inside templates)

## [2.4.0](https://github.com/Divlo/create-fullstack-app/compare/v2.3.1...v2.4.0) (2021-01-09)

### Features

- **templates:** improve website/next ([1ddb8f5](https://github.com/Divlo/create-fullstack-app/commit/1ddb8f5fae18182ce33ffcd684bd3df3ebc023c8))

### Chore

- now correctly using `semver` for the next releases

**Note:** It is strongly discouraged to install the versions before `2.4.0` since the package wasn't using `semver` correctly and contained lot of bugs between releases.

## [2.3.1](https://github.com/Divlo/create-fullstack-app/compare/v2.3.1...v2.4.0) (2020-12-06)

### Bug fixes

- correctly install dependencies with `strapi` template

## [2.3.0](https://github.com/Divlo/create-fullstack-app/compare/v2.3.0...v2.2.1) (2020-12-02)

### Features

- avoid using latest in package.json templates ([184ed14](https://github.com/Divlo/create-fullstack-app/commit/184ed140492037acabe1ec021c65d352f5ce4c1b)), closes [#24](https://github.com/Divlo/create-fullstack-app/issues/24)
- add `.editorconfig` file in every newly created project `templates/common`

## [v2.2.1](https://github.com/Divlo/create-fullstack-app/compare/v2.2.1...v2.2.0)

### Features

- add tests for `/templates/api/express`

### Chore

- update dependencies

## [v2.2.0](https://github.com/Divlo/create-fullstack-app/compare/v2.2.0...v2.1.3)

### Features

- update files structure in `templates/api/express`

## Bug fixes

- `sequelize-typescript` not using Sequelize v6 so downgrade to v5
- `ts-standard` can now crash if there are errors

## [v2.1.3](https://github.com/Divlo/create-fullstack-app/compare/v2.1.3...v2.1.2)

## Documentaion

- improve `README`

## Chore

- add GitHub actions

## [v2.1.2](https://github.com/Divlo/create-fullstack-app/compare/v2.1.2...v2.1.1)

### Bug fixes

- correctly postinstall in `templates/api/express`

### Documentaion

- improve `README` with `ts-standard` label

## [v2.1.1](https://github.com/Divlo/create-fullstack-app/compare/v2.1.1...v2.0.2) (2020-06-30)

### Features

- add `ts-standard` linting

## [v2.0.2](https://github.com/Divlo/create-fullstack-app/compare/v.2.0.2...v1.1.0) (2020-06-29)

### Features

- add `--only-api` or `--only-website` flags
- add `strapi` template
- add `nuxt.js` template
- add `nest.js` template

## [v1.1.0](https://github.com/Divlo/create-fullstack-app/compare/v1.0.6...v1.1.0) (2020-06-24)

### Features

- add `standard` linting ([1ad2faf](https://github.com/Divlo/create-fullstack-app/commit/1ad2faf41812f956f9bfed21870d2827223bae07))
- add `prettier` ([10157a3](https://github.com/Divlo/create-fullstack-app/commit/10157a3d1af66afe3235614fef9269b3750adf80))

## [1.0.6](https://github.com/Divlo/create-fullstack-app/compare/v1.0.5...v1.0.6) (2020-05-25)

### Features

- automatically execute `git init` in the newly created project ([c7d6a1c](https://github.com/Divlo/create-fullstack-app/commit/c7d6a1c3cb4ffa239d8bd997d80f993d576fd997))
- add updateNotifier : inform users of updates ([7394c4d](https://github.com/Divlo/create-fullstack-app/commit/7394c4def0f397a14d8943efc7f848f3c983ba42))

## 1.0.5 (2020-05-25)

First stable release.
create-fullstack-app is now ready to be used! 🚀
