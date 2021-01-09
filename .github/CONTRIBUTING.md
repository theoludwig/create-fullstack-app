# Contributing

Thanks a lot for your interest in contributing to **create-fullstack-app**! 🎉

## Types of contributions

- Create a new project template
- Reporting a bug
- Improve the CLI
- Correct a spelling error

## Pull Requests

- **Please first discuss** the change you wish to make via [issue](https://github.com/Divlo/create-fullstack-app/issues) before making a change. It might avoid a waste of your time.

- Ensure your code respect [Typescript Standard Style](https://www.npmjs.com/package/ts-standard).

- Make sure your **code passes the tests**.

If you're adding new features to **create-fullstack-app**, please include tests.

## Commits

The commit message guidelines respect [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) and [Semantic Versioning](https://semver.org/) for releases.

### Types

Types define which kind of changes you made to the project.

| Types    | Description                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| feat     | A new feature.                                                                                               |
| fix      | A bug fix.                                                                                                   |
| docs     | Documentation only changes.                                                                                  |
| style    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).      |
| refactor | A code change that neither fixes a bug nor adds a feature.                                                   |
| perf     | A code change that improves performance.                                                                     |
| test     | Adding missing tests or correcting existing tests.                                                           |
| build    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).         |
| ci       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs). |
| chore    | Other changes that don't modify src or test files.                                                           |
| revert   | Reverts a previous commit.                                                                                   |

### Scopes

Scopes define what part of the code changed.

There are 2 principal scopes in the project :

- template
- cli

### Examples

```sh
git commit -m "feat(cli): new --only-website flag"
git commit -m "docs(readme): update installation process"
git commit -m "fix(template): remove bugs"
```

## Create a new project template

You can create a new template by following these steps, for the example we'll add a [fastify](https://www.fastify.io/) template.

- Create a new folder `/templates/<type>/<template-name>`, since Fastify is a framework for building APIs, you can do it like so for our example : `/templates/api/fastify` (In the folder you created, you can put your template files).

  _Note :_ Your template folder can't have `LICENSE` or `README.md` files, because it will be added automatically (see `/templates/common`).

- Then in the `/src/constants/templateChoices.ts` file, you can edit the templateChoices variable, so you can add a new object in the array of the `api` key, with `name` property and the path of the template folder created in step one.
  For example it could be something like this :

```ts
{
  name: 'Fastify',
  value: {
    path: path.join(TEMPLATE_API_PATH, 'fastify')
  }
}
```

- Don't forget to update the README.md file so everyone know what templates are availables.
