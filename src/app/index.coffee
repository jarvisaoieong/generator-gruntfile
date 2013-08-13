yeoman = require 'yeoman-generator'
path = require 'path'

exports = module.exports = class Generator extends yeoman.generators.Base

  constructor: (args, options, config) ->
    super
    @basename = path.basename options.env.cwd
    # @on 'end', ->
    #   @installDependencies skipInstall: options['skip-install']

  askFor: ->
    done = @async()
    console.log @yeoman
    @prompt [
      name: 'name'
      message: 'App name'
      default: @basename
    ,
      name: 'description'
      message: 'Description'
      default: ''
    ,
      name: 'version'
      message: 'Version'
      default: '0.0.0'
    ,
      name: 'env'
      type: 'list'
      message: 'Which environment'
      choices: ['node', 'bower']
    ],
      (props) =>
        @_.extend this, props
        done()

  copyRootFile: ->
    @template '_README.md', 'README.md'
    @directory 'root', '.'
    @template "#{@env}/_package.json", 'package.json'
    @template "#{@env}/_Gruntfile.coffee", 'Gruntfile.coffee'

  writeSrcFile: ->
    @mkdir 'src'
    @write "src/#{@name}.coffee", ''
