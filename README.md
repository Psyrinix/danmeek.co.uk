#Thrall.ui - Frontend boilerplate.

> Built using [Gulp](http://gulpjs.com/) and [NodeJS](https://www.npmjs.com/get-npm)

## Getting started

### First time usage
1. Install *npm* (easiest to get it bundled with *nodejs*) - [Install NPM](https://www.npmjs.com/get-npm) or [download NodeJS](https://nodejs.org/en/download/)
2. Run `$ npm install` in the root of the repo.
3. Run `$ gulp watch` in the root of the repo. This will execute the build & watch command to create a local development server and present you with a URL to view the website or application.

### Commands list
*Please keep this list up to date as new tasks are introduced*

- `$ gulp` - Runs the development build tasks and stops
- `$ gulp build` - Runs the development build tasks and stops
- `$ gulp watch` - Runs the development build tasks, spins up a server and watches files. This process will run until it is closed.
- `$ gulp release` - Cleans build folder, lints files, runs production build tasks and finishes
- `$ npm version [major|minor|patch]` - This will update the project version number in the package.json (as well as any files specified in the `config.semVerFiles` array), update the changelog based on commits, commit the files to the repo and then finally tag the commit with the new version number

## Contribution Guidelines

### GIT Branch structure
- `develop` is considered the main branch for this repository. `develop` should contain stable, feature complete code.
- When developing a new feature you should create a branch starting with `feature/`, and then the name of the feature(s) you are creating
- When this feature is complete open a pull request in to `develop`
- Once the feature has been merged into develop, run `npm version [major|minor|patch]`.
- The `master` branch represents the code that has been released to a production environment.

### Gulpfile guidelines
- Keep vars and object keys in alphabetical order
- Keep task names consistant. Follow the format of [type of task] [What the task is being used for]. (eg. `scriptsProduction()`)
- Keep task names agnostic of technology (ie. don't name tasks `sassProduction()`), so that commands can stay the same even if their underlying processes are superceded by newer technology


