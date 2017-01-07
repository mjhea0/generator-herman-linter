(function() {

  'use strict';

  const yeoman = require('yeoman-generator');
  const chalk = require('chalk');
  const yosay = require('yosay');
  const fs = require('fs');
  const path = require('path');

  module.exports = yeoman.Base.extend({
    prompting: function () {
      this.log(yosay(
        'Welcome to the finest ' + chalk.red('generator-herman-linter') + ' generator!'
      ));
      const prompts = [
        {
          name: 'name',
          message: 'Your name (for the LICENSE)?',
          required: true,
          default: 'Change Me'
        },
        {
          name: 'project',
          message: 'Project name (for package.json)?',
          required: true,
          default: 'Change Me'
        }
      ];
      return this.prompt(prompts).then(function(props) {
        this.props = props;
      }.bind(this));
    },
    generatePackageDotJSON: function() {
      const readFilePath = path.join(
        __dirname, 'templates', '_example.package.json');
      const writeFilePath = path.join(
        __dirname, 'templates', 'package.json');
      fs.readFile(readFilePath, (err, data) => {
        if (err) throw err;
        const jsonObject = JSON.parse(data);
        const sansSpaces = (this.props.project).replace(/\s/g, '');
        jsonObject.name = sansSpaces;
        const stringifiedObject = JSON.stringify(jsonObject, null, 2);
        fs.writeFile(writeFilePath, stringifiedObject, (err, data) => {
          if (err) {
            throw err;
          }
          this.fs.copy(
            this.templatePath('package.json'),
            this.destinationPath('package.json')
          );
        });
      });
    },
    writingFiles: function () {
      this.fs.copy(
        this.templatePath('dot-gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('.jscsrc'),
        this.destinationPath('.jscsrc')
      );
      this.fs.copy(
        this.templatePath('.jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copyTpl(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE'),
        {
          year: (new Date()).getFullYear(),
          name: this.props.name
        }
      );
    },
    writingFolders: function () {
      this.fs.copy(
        this.templatePath('src/'),
        this.destinationPath('src/')
      );
    }
  });

}());
