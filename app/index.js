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
    this.on('end', function() {
      return this.installDependencies({
        skipInstall: options['skip-install']
      });
    });
  }

  Generator.prototype.askFor = function() {
    var done,
      _this = this;
    done = this.async();
    console.log(this.yeoman);
    return this.prompt([
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
      _this._.extend(_this, props);
      return done();
    });
  };

  Generator.prototype.copyRootFile = function() {
    this.template('_README.md', 'README.md');
    this.directory('root', '.');
    this.template("" + this.env + "/_package.json", 'package.json');
    this.template("" + this.env + "/_Gruntfile.coffee", 'Gruntfile.coffee');
    if (this.env === 'bower') {
      return this.template("" + this.env + "/_bower.json", 'bower.json');
    }
  };

  Generator.prototype.writeSrcFile = function() {
    this.mkdir('src');
    return this.write("src/" + this.name + ".coffee", '');
  };

  return Generator;

})(yeoman.generators.Base);
