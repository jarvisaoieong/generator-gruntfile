'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

exports = module.exports = function(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.basename = path.basename(options.env.cwd);
  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });
}

util.inherits(exports, yeoman.generators.Base);

exports.prototype.askFor = function() {
  var done = this.async();
  console.log(this.yeoman);

  this.prompt([
    {
      name: 'name',
      message: 'name',
      "default": this.basename
    }, {
      name: 'description',
      message: 'Description',
      "default": ''
    }, {
      name: 'version',
      message: 'Version',
      "default": '0.0.0'
    }, {
      name: 'env',
      type: 'list',
      message: 'Target for',
      choices: ['node', 'bower']
    }
  ], function(props) {
    this._.extend(this, props);
    done();
  }.bind(this));
};

exports.prototype.copyRootFile = function() {
  this.template('_README.md', 'README.md');
  this.directory('root', '.');
  this.template("" + this.env + "/_package.json", 'package.json');
  this.template("" + this.env + "/_Gruntfile.coffee", 'Gruntfile.coffee');
  if (this.env === 'bower') {
    this.template("" + this.env + "/_bower.json", 'bower.json');
  }
};

exports.prototype.writeSrcFile = function() {
  this.mkdir('src');
  this.write("src/" + this.name + ".coffee", '');
};
