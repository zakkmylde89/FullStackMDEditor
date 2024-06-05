# Full Stack Markdown Editor

Markdown editor desktop app made with ElectronJs and TypeScript.

## Source

Tutorial From:
    Code With Gionatha
        YouTube Channel (https://www.youtube.com/@gionatha)
        Project Video (https://www.youtube.com/watch?v=t8ane4BDyC8&list=PLhBwHe-QpYIWwXb5y1sxuNhqzT5P1D1z-&index=4)
        Original GitHub Repo (https://github.com/CodeWithGionatha-Labs/NoteMark)

## Frameworks, Libraries, Tools

Made With: 
-ElectronJs
    (https://www.electronjs.org/docs/latest)
-ReactJs
    (https://react.dev/reference/react)
-Typescript
    (https://www.typescriptlang.org/docs/)
-TailwindCSS
    (https://tailwindcss.com/docs/installation)
-Jotai
    (https://jotai.org/docs/introduction)
-MDX Editor
    (https://mdxeditor.dev/editor/docs/getting-started)

Yarn Package Manager
    (https://classic.yarnpkg.com/en/docs)

## How ElectronJS Works

An Electron application is divided into two main processes. The Main Process (Node.Js) and the Renderer Process (Browser Window). 

-The Main Process
    The Main Process (TMP) runs in the NodeJS environment and has access to the NodeJS API along with Electron Main Process Modules. This process is useful for running privileged operations such as having access to the main file system and having the ability to read, write, and delete files. It is basically an process isolated context so that we can run restricted operations.

-The Renderer Process
    The Renderer Process (TRP) is our browser window, and it is where our operation lives. It is broken into several different parts. It contains our entrypoint via our 'index.html' file. That connects to our 'index.ts' file. This is where our framework runs. The is also the preload script. This has access to a restricted set of functions from the NodeJS API, access to the DOM API, but the most important part is it able to access the IPC channel. It is used to communicate with TMP.

## Package Folders

Within our project we have the main 'src' folder which contains our 'main', 'preload', and 'renderer' floders.

-The 'main' folder contains a 'index.ts' file which contains the TMP

-The 'preload' folder contains our 'index.d.ts' and 'index.ts' files which contain our reload processes

-The 'renderer' folder contains a 'src' folder and 'index.html' file. The 'renderer/src/' folder contains our assets, components, main 'App.tsx' file, 'env.d.ts' environment file, and the 'main.tsx' file

## Prettier Config

Prettier is a VSCode extension that auto formats our files and makes easier to read.

1. Open '.vscode' folder and open 'settings.json' folder
2. Remove current settings and insert:

    {
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "always",
        "source.orgainzeImports": "always"
        },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.wordWrap": "on",
    "markdownlint.config": {
        "MD041": false
        }
    }

## ESLint Config

1. Open 'eslintrc.cjs' file and add:

    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    }

## Main Process Config

1. Open 'src/main/index.ts' file