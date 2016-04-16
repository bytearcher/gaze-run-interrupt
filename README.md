# typescript-project-template

# Design philosophy

- minimal 
- not relying on too many other libraries, sticking to bare bones where possible or only using battle tested and well known libraries
- possibility to update project template later

# Features

- directory structure for project source
    + `src` sources
    + `test` unit tests
    + `dist` build artifacts
- build system to clean, build and test
    + `package.json` scripts called with `npm run <task>`
- managing type definition files with the [typings](https://github.com/typings/typings) project
    + use `node_modules/.bin/typings install <name>` to install new

# Usage

## Getting started

You're starting a fresh new project. Clone the project template repository.
    
    git clone https://github.com/bytearcher/typescript-project-template.git <yourprojectname>

Remove `origin` remote to not confuse ourselves later.

    git remote remove origin

At this point, optionally init your repository of choice. It can be Bitbucket, GitHub or something else.

Start developing your project. When the template project evolves, you can get latest changes see "Updating newest template to your existing project".

## Updating newest template to your existing project

Temporarily add `typescript-project-template-origin` remote.

# Questions

## What TypeScript files gets compiled?

Uses `tsconfig.json` for TypeScript compiler setup. Includes every `.ts` file in project excluding directories defined in `tsconfig.json:exclude`.

## When does compilation take place?

During `npm install` - calling the TypeScript compiler is part of `prepublish` script in `package.json`.

You can initiate the build manually, see "How to build".

## How to build

Make sure previous build artifacts are cleaned first.

    npm run build

## How to run tests

Make sure project is built first and then call

    npm test

## How to clean

    npm run clean
