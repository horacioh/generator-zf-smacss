#Generator-zf-smacss
##author: Horacio Herrera [hherrerag.com](http://hherrerag.com)
===================

[Yeoman](http:yeoman.io) Generator that scaffolds out a front-end basic Responsive web project

##What Includes?

- [Foundation](http://foundation.zurb.com) by [Zurb]()
- [JQuery](http://jquery.com)
- [Retina.js](http://retinajs.com/) by [imulus](http://imulus.com/)
- [SuperScrollorama](http://johnpolacek.github.io/superscrollorama/) by [@johnpolacek](https://twitter.com/johnpolacek)
- [SMACSS](http://smacss.com/) by [@snookca](https://twitter.com/snookca)


###Features

- All Dependencies managed by [Bower](http://bower.io/)
- Automatically install all your Grunt plugins & Bower components
- Built-in preview server with live-reload
- Automagically compile Coffescript & Sass(scss)
- Awesome Image Optimization (via grunt-ImageOptim)
- Uglify al yout Javascript code into one single file
- All Includes are Optional (see the list above)
- Two Enviroments by Default
- Automagically upload your deploy via (s)FTP


###Technologies you will use to code

- [Haml](http://haml-lang.com)
- [CoffeeScript](http://coffeescript.org/)
- [SASS (scss)](http://sass-lang.com/)
- & Javascript to custom Grunt-tasks

###Grunt Tasks installed

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) to erase all the content from every enviroment.
- [grunt-contrib-haml](https://github.com/jhchen/grunt-contrib-haml) to compile Haml code to HTML
- [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) to compile SASS(scss) code to CSS
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) to run tasks while the server is up & reload results
- [grunt-open](https://github.com/jsoverson/grunt-open) to open the preview server on your prefer Browser
- [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect) to connect de 'dev' enviroment to the preview server
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) to copy assets(images, fonts...) from source to the other enviroments
- [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) to 'Uglify' JS code (mostly components: jquery, Foundation, ...)
- [grunt-uncss](https://github.com/addyosmani/grunt-uncss) remove unused CSS from your builds
- [grunt-ftpush](https://github.com/inossidabile/grunt-ftpush) to push your deploys to a server
- [grunt-concurrent](https://github.com/sindresorhus/grunt-concurrent) to 'Run grunt tasks concurrently'
- [grunt-processhtml](https://github.com/dciccale/grunt-processhtml) to Process html files at build time to modify them depending on the release environment
- [grunt-contrib-coffee](https://github.com/gruntjs/grunt-contrib-coffee) to compie coffeescript code to Javascript
- [grunt-imageoptim](https://github.com/JamieMason/grunt-imageoptim) to make ImageOptime part of your automated build process (require ImageOptim to be Installed)
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) to minimize code processed by 'UNCSS'

**NOTE**: If you would like to manipulate the Grunt tasks via Yeoman, or you think is a good idea let me know!



##Getting Started
===================

1. Install the Generator Globally: `npm install -g zf-smacss`
2. Go to your working directory: `cd path/to/your/directory`
3. Run: `yo zf-smacss`
4. Follow the Prompt
5. Run: `grunt server`

###You will get this:

- A Scaffold project prepared so you can start coding your website with Foundation, Jquery, Modernizr & following the SMACSS style guide.
- A Preview Server will start on port `4567` (default port, can be changed in the *Gruntfile.js*)
- The *Watch Task* will be running, so whatever change you do on the source files, will be process on your `dev` enviroment.


### Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

** more options to come :)



##Contribute
===================

Note: We are regularly asked whether we can add or take away features. If a change is good enough to have a positive impact on all users, we are happy to consider it.

If not, `generator-zf-smacss` is fork-friendly and you can always maintain a custom version which you `npm install && npm link` to continue using via `yo zf-smacss` or a name of your choosing.