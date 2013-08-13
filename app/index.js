var Generator, exports, path, yeoman,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

yeoman = require('yeoman-generator');

path = require('path');

exports = module.exports = Generator = (function(_super) {
  __extends(Generator, _super);

  function Generator(args, options, config) {
    Generator.__super__.constructor.apply(this, arguments);
    this.basename = path.basename(options.env.cwd);
  }

  Generator.prototype.askFor = function() {
    var done,
      _this = this;
    done = this.async();
    console.log(this.yeoman);
    return this.prompt([
      {
        name: 'name',
        message: 'App name',
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
        message: 'Which environment',
        choices: ['node', 'bower']
      }
    ], function(props) {
      _this._.extend(_this, props);
      return done();
    });
  };

  Generator.prototype.copyRootFile = function() {
    this.template('_README.md', 'README.md');
    this.directory('root', '.');
    this.template("" + this.env + "/_package.json", 'package.json');
    return this.template("" + this.env + "/_Gruntfile.coffee", 'Gruntfile.coffee');
  };

  Generator.prototype.writeSrcFile = function() {
    this.mkdir('src');
    return this.write("src/" + this.name + ".coffee", '');
  };

  return Generator;

})(yeoman.generators.Base);
