# Contributing

Thanks a lot for your interest in contributing to **create-fullstack-app**! 🎉

## Types of contributions :

- Create a new project template
- Reporting a bug
- Improve the CLI
- Correct a spelling error

## Pull Requests :

- **Please first discuss** the change you wish to make via [issue](https://github.com/Divlo/create-fullstack-app/issues) before making a change. It might avoid a waste of your time.

- Ensure your code respect [Typescript Standard Style](https://www.npmjs.com/package/ts-standard).

## Commits :

The commit message guidelines respect [gitmoji](https://gitmoji.carloscuesta.me/).

## Create a new project template :

You can create a new template by following these steps, for the example we'll add a [fastify](https://www.fastify.io/) template.

- Create a new folder `/templates/<type>/<template-name>`, since Fastify is a framework for building APIs, you can do it like so for our example : `/templates/api/fastify` (In the folder you created, you can put your template files).

  *Note :* Your template folder can't have `LICENSE` or `README.md` files, because it will be added automatically (see `/templates/common`).

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
