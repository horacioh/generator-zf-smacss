'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ZfSmacssGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic ZfSmacss generator.'));

    var prompts = [
      {
        name: 'projName',
        message: 'What is the name of this project?'
      }
    ];

    this.prompt(prompts, function (props) {
      // `props` is an object passed in containing the response values, named in
      // accordance with the `name` property from your prompt object. So, for us:
      this.projName = props.projName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('dev');
    this.mkdir('build');
    this.mkdir('source');
    this.mkdir('source/assets');
    this.mkdir('source/js');
    this.mkdir('source/css');
    this.mkdir('source/css/base');
    this.mkdir('source/css/layout');
    this.mkdir('source/css/module');
    this.mkdir('source/css/state');
    this.mkdir('source/css/theme');
  },

  git: function () {
    this.copy('gitignore', '.gitignore');
  },

  bower: function () {
    this.copy('_bower.json', 'bower.json');
    this.copy('bowerrc', '.bowerrc');
  },

  grunt: function () {
    this.copy('Gruntfile.js', 'Gruntfile.js');
  },

  projectfiles: function () {
    this.copy('_package.json', 'package.json');
    this.copy('editorconfig', '.editorconfig');
    this.copy('ftppass', '.ftppass');
  },

  haml: function () {
    this.copy('pfs/_index.haml', 'source/index.haml');
  },

  coffee: function () {
    this.copy('pfs/coffee/_main.coffee', 'source/js/main.coffee');
  },

  sass: function () {
    this.copy('pfs/sass/_main.scss', 'source/css/main.scss');
    this.copy('pfs/sass/_shame.scss', 'source/css/_shame.scss');
    this.copy('pfs/sass/_base.scss', 'source/css/base/_base.scss');
    this.copy('pfs/sass/_variables.scss', 'source/css/base/_variables.scss');
    this.copy('pfs/sass/_mixins.scss', 'source/css/base/_mixins.scss');
    this.copy('pfs/sass/_overrides.scss', 'source/css/base/_overrides.scss');
    this.copy('pfs/sass/_layouts.scss', 'source/css/layout/_layouts.scss');
    this.copy('pfs/sass/_modules.scss', 'source/css/module/_modules.scss');
    this.copy('pfs/sass/_states.scss', 'source/css/state/_states.scss');
    this.copy('pfs/sass/_theme.scss', 'source/css/theme/_theme.scss');
    this.copy('pfs/sass/_theme-1.scss', 'source/css/theme/_theme-1.scss');
  }


});

module.exports = ZfSmacssGenerator;
