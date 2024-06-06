# Full Stack Markdown Editor

Markdown editor desktop app made with ElectronJs and TypeScript.

## Source

Tutorial From:
Code With Gionatha
YouTube Channel (https://www.youtube.com/@gionatha)
Project Video (https://www.youtube.com/watch?v=t8ane4BDyC8&list=PLhBwHe-QpYIWwXb5y1sxuNhqzT5P1D1z-&index=4)
Original GitHub Repo (https://github.com/CodeWithGionatha-Labs/NoteMark)

## Frameworks, Libraries, Tools

Made With:<br> -[ElectronJs](https://www.electronjs.org/docs/latest)<br> -[ReactJs](https://react.dev/reference/react)<br> -[Typescript](https://www.typescriptlang.org/docs/)<br> -[TailwindCSS](https://tailwindcss.com/docs/installation)<br> -[Jotai](https://jotai.org/docs/introduction)<br> -[MDX-Editor](https://mdxeditor.dev/editor/docs/getting-started)<br>

Yarn Package Manager
(https://classic.yarnpkg.com/en/docs)

## Notes

One important thing to remember about this project is that the author built it on a MacOS machine, and as such there are certain things you will have to play with to make it work if you're on Windows. Things like there being no transparent background rendering, no "Traffic Lights" display, and how these things will affect the rest of our layout. I will do my best to explain the things I've done while building this on a Windows machine to make it work for me, but again I highly suggest using the listed documentation and little bit of Google-fu to make this thing work. It will be great learning experience for anyone who gives this a whirl on a non-MacOS machine.

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

 <code>
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
 </code>

## ESLint Config

1. Open 'eslintrc.cjs' file and add:

 <code>
 rules: {<br>
     '@typescript-eslint/explicit-function-return-type': 'off',<br>
     '@typescript-eslint/no-unused-vars': 'off'<br>
 }
 </code>

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

## Styling Our Window

Starting in this section we will begin adding larger blocks of code to our app so I ask you start referring to the files we are working on in order to see what we are doing. Hopefully you're following along with sourced video as well as this markdown file.

In our 'src/main/index.ts' file we go into our createWindow() function and adding space to line 14 we will add:

    center: true,
    title: 'NoteMark',
    frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    titleBarStyle: 'hidden',
    titleBarOverlay: 'true',                            // Windows only effect
    trafficLightPosition: { x: 15, y: 10},              // MacOS only effect

Both 'titleBarOverlay' and 'trafficLightPosition' are OS specific operations. We can also style our titleBarOverlay buttons if we'd like. Personally, my properties are below, and if you'd like to use them replace the current properties with these:

    titleBarOverlay: {
        color: '#37383f',
        symbolColor: '#3b82f6',
        height: 30
    },

There is also no transparent window when using Windows. So I added this backgroundColor setting to at least give a similar color to the basic transparent background on MacOS.

    backgroundColor: '#37383f',

This should give you a similar look and feel to what the app will look like on MacOS.

Now let's move into our 'src/renderer/src/components' folder and create a new file called 'AppLayout.tsx' file.

We will start by importing ComponentProps from React, and importing twMerge from Tailwind-Merge. Then we will create an exported function that will be our Sidebar component. This is the sidebar that we will be able to navigate through the projects we create within the app itslef.

Afterwards we will create an exported Content function that will serve as our text editor. Then finally, above our first two functions, we will create our RootLayout function that will serve as a basis for the layout of our entire app.

Now, back in our 'src/renderer/src/components/App.tsx' file we will import our Content, Sidebar, and RootLayout componenets from our '@/components' file and remove our placeholder content and place our newly created layout components. We will style them with placeholder stylings so that we can get an understanding of our layout to start. Now go to your terminal and run:

    yarn dev

And check out the work we've completed thusfar. I do suggest playing with your Tailwind margins some with your Sidebar and Content components if you're not on MacOS. Personally I removed all margins and just let both components fill the window.

Now we will remove those placehold stylings in the 'App.tsx' file for the Sidebar and Content components and give them our production stylings. Here we will slightly change the background color of our 'Sidebar' component giving it separation from our 'Content' component.

## Making Our Windows 'Draggable'

Here we will make it so that we can move our window around the screen. We will start by adding a new file to our 'src/renderer/src/components' folder called 'DraggableTopBar.tsx' which will essentially be another component we will add to our window.

Just like with our last two components, after created, we will add some placeholder stylings to make sure everything is placed where we want it to be, and then we will go into our 'main.css' file (or as stated earlier it could possibly be 'index.css' for some depending on the version of Electron/React you're using) to make it draggable.

## Sidebar Action Buttons

Now we will implement the two action buttons for our sidebar. These will allow us to create and delete files in our app. We will start by going to our 'src/renderer/src/components' folder and creating a new folder called 'Button' and within that we will create an 'ActionButton.tsx' file where we will build and style these buttons. After creating our button component within the same 'Button' folder we will create an 'index.ts' file to export it. We will need to export it from that file and from the 'index.ts' file a layer above at the 'src/renderer/src/components' folder in order to pass it upwards through our files so that our App.tsx file will have access to this component.

Next we will go back into our 'Button' folder and create a 'NewNoteButton.tsx' file where we will create our New Note Button for the sidebar. We will also create a 'DeleteNoteButton.tsx' file for deleting notes from our Sidebar. Then finally we will head back to our 'src/renderer/src/components' folder and create a new file called 'ActionButtonsRow.tsx' which will be the container for both of our buttons.

Once we've completed these files it is time to import them into our 'App.tsx' file. Once done I went back played with the margin-top of our 'AppLayout.tsx' file to properly place these buttons where I wanted them since I am on Windows. The lack of the 'Traffic Lights' on Windows gives the initial source code a bit too much space from the top for my liking. I personally wound up with margin-top of 1, and think that looks great with this particular UI. That said, I did have to go back to our 'DraggableTopBar' component and lower its height from 8 to 5 in order for it to interfere with being able to click our buttons. There is still small amount of overlap, but it is basically indetectable as it covers less than 1px of the top of our action buttons.

## Sidebar File System Setup

We will start this by adding some mock data to our sidebar to set it up, but it will eventually be filled with our actual file system for the app. To implement this we have to first go to our 'src/shared' folder and create a new file called 'models.ts' which will contain the models of our application. Here we will define our types for the content of our sidebar.

Now inside of our 'src/renderer/src/store' folder we will create a new folder called 'mocks' in which we will create an 'index.ts' file. This is where we will store our mock data for creating our sidebar. I suggest pausing the video at 57:49 to see the mock data the source video supplies and just recreating it. If it has been awhile since you've done a git commit now would be a great time.

Let's go back to our 'src/renderer/src/components' folder and create a file called 'NotePreviewList.tsx' that will contain an unordered list of our notes.

Next we will extract a component to render a proper design for each note in our Sidebar. To do this we will go into our 'src/renderer/src/components' folder and create a new file called 'NotePreview.tsx'
