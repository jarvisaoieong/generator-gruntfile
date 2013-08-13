
module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    concat:
      dist:
        src: [
          'lib/*.js'
        ]
        dest: 'dist/<%%= pkg.name %>.js'

    uglify:
      dist:
        src: '<%%= concat.dist.dest %>'
        dest: 'dist/<%%= pkg.name %>.min.js'

    coffee:
      compile:
        files: [
          expand: true
          cwd: 'src'
          src: '*.coffee'
          dest: 'lib'
          ext: '.js'
        ]

    watch:
      scripts:
        files: 'src/*.coffee'
        tasks: ['coffee', 'concat']

    clean: [
      'lib'
      'dist'
    ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'build', [
    'clean'
    'coffee'
    'concat'
    'uglify'
  ]
