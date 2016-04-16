# typescript-project-template

# Features

- uses `typings` project for managing type definition files

# Usage

## What TypeScript files gets compiled?

Uses `tsconfig.json` for TypeScript compiler setup. Includes every `.ts` file in project excluding directories defined in `tsconfig.json:exclude`.

## When does compilation take place?

During `npm install` - calling the TypeScript compiler is part of `prepublish` script in `package.json`.

You can initiate the build manually, see [How to build](#how-to-build)

    npm run build

## <a name="how-to-build"></a> How to build

    npm run build

## How to run tests

    npm test
