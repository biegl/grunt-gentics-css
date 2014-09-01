# GenticsCSS

> The best Grunt plugin ever.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gentics-css --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gentics-css');
```

## The "Gentics Asset Creation" task

### Overview
In your project's Gruntfile, add a section named `genticsCSS` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  genticsCSS: {
    options: {
      baseFolder: "path_to_folder/gentics_css",
      css: [
        "file1.css",
        "file2.css"
      ],
      project: "project_name"
    }
  }
})
```

### Options

#### options.baseFolder
Type: `String`
Default value: `',  '`

The path to where the base folder should be created.

#### options.css
Type: `array`
Default value: `[]`

An array containing the CSS files to parse.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Initial commit.

## License
Copyright (c) 2014 Markus Bürgler. Licensed under the MIT license.
