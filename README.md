# Gulpfile.js documentation
* Gulp version: 4.0.2
* Package version: 1.1.0
* Last updated: April 2020

## Requires:
___
* [node.js 12 or newer](https://nodejs.org/en/)

## Install gulp:
___
    npm install gulp-cli -g

## Setup:
___
### 1. Run 
    npm install
### 2. Modify [package.json](./package.json)
```
{
   "name": "Webtimistens-toolset",
   .
   .
   .
   "repository": {
   "type": "git",
   "url": "git+https://github.com/AUTHOR/PROJECT_NAME.git"
   },
   .
   .
   .
   "bugs": {
      "url": "https://github.com/AUTHOR/PROJECT_NAME/issues"
   },
   "homepage": "https://github.com/AUTHOR/PROJECT_NAME#readme"
}
```
Consider changing these settings before usage.
### 3. Start using gulp
    gulp

## Features
___
* SASS formatting (minification + auto-prefix)
* JavaScript formatting (minification + concat)
* HTML style and JavaScript injecting
* Automatic browser synchronization
* Image minification
* SVG formatting (minification + concat)
* Copy video and fonts

## How to change the file structure
___
To change the structure of the src folder or the dist folder visit the [gulp-config.js](./gulp-config.js)

Here all the paths are shown and can be changed to your liking.

## File structure in folders
___
    src
        > assets
            > img
            > svg
            > video
        > js
        > sass
        index.html

    dist
        > css
        > img
        > scripts
        > svg
        > video
        index.html

## Commands
___
-  `gulp` 
   -  This is the default command and runs every command in the correct order and ends on a watch which watches all file changes and operates accordingly
-  `gulp dev`
   -  Does the same as the default command
-  `gulp svg`
   -  Runs the SVG formatting
-  `gulp clean`
   -  Cleans the dist folder
-  `gulp sassFormat`
   -  Runs the SASS formatting
-  `gulp images`
   -  Runs the image formatting
-  `gulp video`
   -  Copies videos
-  `gulp fonts`
   -  Copies fonts
-  `gulp JSFormat`
   -  Runs the JavaScript formatting
-  `gulp injectToHTML`
   -  Injects styles and JavaScripts into the HTML files
-  `gulp serve`
   -  Starts a browser-sync instance
-  `gulp watch`
   -  Starts a watch of all the files in src
-  `gulp reload`
   -  Reloads the browser-sync instance

## Change browser support
___
This tool uses [browserslists](https://github.com/browserslist/browserslist) to define browser support which can be changed form the [package.json](./package.json) file

To change the support just change the "defaults" tag under browserslist:

```
"browserslist": [
    "defaults"
  ]
```

## Help
___
### I cannot run any commands:
    If you're getting an error saying you don't have permission to run scripts run this command in your PowerShell

* `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### I'm reinstalling an existing project and have errors:
    When reinstalling delete the `pachage.json-lock` and the `node_modules` folder then run `npm install`.
