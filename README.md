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
-[ElectronJs]
    (https://www.electronjs.org/docs/latest)
-[ReactJs]
    (https://react.dev/reference/react)
-[Typescript]
    (https://www.typescriptlang.org/docs/)
-[TailwindCSS]
    (https://tailwindcss.com/docs/installation)
-[Jotai]
    (https://jotai.org/docs/introduction)
-[MDX-Editor]
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

    {<br>
    "editor.codeActionsOnSave": {<br>
        "source.fixAll.eslint": "always",<br>
        "source.orgainzeImports": "always"<br>
        },<br>
    "editor.formatOnSave": true,<br>
    "editor.defaultFormatter": "esbenp.prettier-vscode",<br>
    "editor.wordWrap": "on",<br>
    "markdownlint.config": {<br>
        "MD041": false
        }<br>
    }

## ESLint Config

1. Open 'eslintrc.cjs' file and add:

    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off'
    }

## Main Process Config

For the most part, the ElectronJS Config is go to go out of the box. We will go over the basic parts of the 'index.ts' file here and talk about what they do.

    Lines 8-18 contain the function that defines our window for our app. It defines the size, hides the menu bar, gives us an icon for Linux, and sets our web preferences.

    Lines 20-22 ake sure we only show the main window when we're ready for it to be shown.

    Lines 24-27 are where we can set whether or not our application can open new windows, and in our case here the default setting of 'deny' out of the box is fine.

    Lines 31-36 load our 'index.html' file when everything is ready.

    Lines 41-50 say that when the app is ready we can create the user model ID.

    Lines 52-59 actually create the window for our app using the preferences set in lines 8-18.

    Lines 64-68 contain the code that will shut down our app once the window is closed. This is here because it common on macOS that closing the app window does not actually terminate the app from running in the background. With these lines that will not happen.

For our app we will make a couple of changes to our settings from this file. Go to line 16 and update the 'sandbox' preference from 'false' to 'true'. The below that, add the 'contextIsolation' setting and set it to 'true'. These two properties are super important because they will enhance the security of our application. The context isolation property will separate the JavaScript context of the renderer from the main process. Updating the sandbox property to true will also make our renderer more secure.

## Preload Script Config

Open our 'src/preload/index.tx' file and we will remove everything below our imports and create a custom script. We will replace it with:

    if (!process.contextIsolated) {
        throw new Error('contextIsolation must be endabled in the BrowserWindow')
    }

    try {
        contextBridge.exposeInMainWorld('context', {
        //TODO
    })
    } catch (error) {
        console.error(error)
    }

Next, we will go to our 'src/preload/index.d.ts' file, which defines some Global type configuration so that our app will support TypeScript and allow us to call any of our functions available in our 'src/preload/index.ts' file. For now we will change these properties:

    Go to line 3 and comment the 'electron: ElectronAPI' property.

    On line 4 replace the 'api: unknown' property with 'context: {}' and leave the object empty. Later we will add some properties and function. Once again they will be for configuring TypeScript with our project. If you remember from how we updated our 'index.ts' file we exposed it to this 'context' field.

## Renderer Config

Open the 'src/renderer/index.html' file. This is the entry point for our renderer process. We will start by removing the title and comment on lines 5 and 6. Then we will replace the <meta> element on lines 5-8 with our own custom settings which are:

    <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval';"
    />

This will update our custom content security policies so that it will work with some of the libraries we will be using.

Now we can begin to remove some of the unnecessary files that come with our frameworks and libraries. These will be:

    'src/renderer/src/assets/electron.svg'
    'src/renderer/src/assets/wavy-lines.svg'

Then we can full clear out our 'src/renderer/src/main.css' file because we will be using TailwindCSS. Then we can remove:

    'src/renderer/src/components/Versions.tsx' file

This will fix the error message in the app window you received when removing the other two files.

Now we can go into our 'src/renderer/src/App.tsx' file and remove the imports and everything inside of the fragment brackets. This will give a blank screen to work with for our app. Also remove the 'JSX.Element from line 1 leaving an empty space between the parenthesis and curly brackets.

Now, we are finally ready to start working on the application itself. Now would be a great time to make a git commit.

## Project Scaffolding

Let's now go to the 'src/renderer/src/components/' folder and add an 'index.ts' file where we place and export all of React components from a single entrypoint file.

Then in the 'src/renderer/src' folder create a new folder for our 'hooks' which will contain all of our custom React hooks.

Then within the same folder as above we will create another folder called 'store'. We will being using Jotai as our state manager and inside of the store folder we will collect all of the items Jotai will use for managing this internal state.

And once more in the same folder as the last two we will create a 'utils' folder. This is where we will store our utility functions.

Now in the main 'src' folder we will create a new folder called 'shared'. This will store our configuration files and function types that are going to be shared amongst the 'main', 'preload', and 'renderer' folders.

Under the 'src/main' folder add another folder called 'lib' that will contain our API to interact with the file system that will represent our nodes that our application will display and interact with.

## TypeScript Config

Go to the 'tsconfig.web.json' file and we will update some configurations. Under the "include" property we will add:

    "src/shared/**/*"

This will include all of the folders and files that will be in our 'shared' folder so the 'renderer' and 'preload' can have access to everything within it.

Next, under compiler options we will update some configurations. Underneath the "baseUrl" property we will add:

    "noUnusedLocals": false

Then under the "paths" field we will add some new policies. They will be:

    "@shared/*": [
        "src/shared/*"
    ],
    "@/*": [
        "src/renderer/src/*"
    ]

These are also to help setup the 'shared' folder we created and create path names for it.

Now we must do the same things for 'tsconfig.node.json' file. This is the configuation used by the main process.

First, right-click your screen select 'Format Document with...' and in the command palette choose 'JSON'. This will make this file easier to read and update. The in the "include" field add:

    "src/shared/**/*"

Then below "compilerOptions" add a new field:

    "baseUrl": "."

Then below that add our new path policies:

    "@/*": [
        "src/main/*"
    ],
    "@shared/*": [
        "src/shared/*"
    ]

Once again we are making sure everything has access to our 'shared' folder.

## Electron Vite Config

This file contains configuations for every file that Electron will use in our project. Go to the 'electron.vite.config.ts' file. Here we will specify how to resolve the path analysis that we defined inside of the TypeScript configuration.

In the 'main' field below the 'plugins' field we will add:

    resolve: {
        alias: {
            '@/lib': resolve('src/main/lib'),
            '@shared': reslove('src/shared')
        }
    }

Now we must do the same under the 'renderer' field in the same file. We will add:

    '@shared': resolve('src/shared'),
    '@/hooks': resolve('src/renderer/src/hooks'),
    '@/assets': resolve('src/renderer/src/assets'),
    '@/store': resolve('src/renderer/src/store'),
    '@/components': resolve('src/renderer/src/components'),
    '@/mocks': resolve('src/renderer/src/mocks')

This will setup where resolves will wind up in our project.

Inside of our 'renderer' field abouve the 'resolve' nested field we will another nested field:

    assetsInclude: 'src/renderer/assets/**'

This will make sure the renderer has access to all of our assets for the project.

## Adding TailwindCSS

In the terminal type and enter the command:

    yarn add -D tailwindcss postcss auotprefixer

Next we will run:

    npx tailwindcss init -p

Now we will open up our 'tailwind.config.js' file and inside of the 'content' field add:

    'src/renderer/**/*.{js,ts,jsx,tsx}'

This will tell TailWind which files it will be affecting.

Now we will be updating our 'main.css' (this could be called index.css depending on version) and add:

    @tailwind base;
    @tailwind componenets;
    @tailwind utilities;

    html,
    body {
        @apply h-full;

        @apply select-none;

        @apply bg-transparent;

        @apply font-mono antialiased text-white;

        @apply overflow-hidden;
    }

Now we will install a few more dependencies. In the console run:

    yarn add -D tailwind-merge

Then run:

    yarn add -D clsx

Then finally:

    yarn add -D react-icons

Now we will move to our 'src/renderer/src/utils' folder and create a new file called 'index.ts' and in it we will add:

    import clsx, { ClassValue } from 'clsx'
    import { twMerge } from 'tailwind-merge'

    export const cn = (...args: ClassValue[]) => {
        return twMerge(clsx(...args))
    }

This will be used to merge custom class names with default Tailwind classes.

## Checking Our Work Setup

Now we're finally ready to make sure everything we've done up to this point is working correctly. Go to our 'src/renderer/src/App.tsx' file, and we can remove anything inside of main fragments/div. Inside the return fragment/div we'll enter:

    <div className="flex h-full items-center justify-center">
        <span className="text-4xl text-blue-500">
            Hello From Electron
        </span>
    </div>

Then we will go to our terminal and run the command:

    yarn run dev

If everything has been done correctly a window will open with our program and we'll see our "Hello From Electron" message on the front page.