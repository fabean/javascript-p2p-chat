'use strict';
module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src: 'src',
        dist: 'dist',
        sass: {
            'dist': {
                'options': {
                    'style': 'compressed',
                    'quiet': false,
                    'compass': false,
                },
                'files': { '<%= dist %>/css/styles.css': '<%= src %>/scss/styles.scss' }
            }
        },
        autoprefixer: {
            'options': {
                'browsers': [
                    'last 2 versions',
                ],
                'remove': false
            },
            'dist': { 'src': '<%= dist %>/css/styles.css' }
        },
        jade: {
            'compile': {
                'options': {
                    'pretty': true,
                    'data': { 'debug': false }
                },
                'files': [{
                        'expand': true,
                        'cwd': '<%= src %>/',
                        'src': [
                            '*.jade',
                            '!_*.jade'
                        ],
                        'ext': '.html',
                        'dest': '<%= dist %>/'
                    }]
            }
        },
        babel: {
          options: {
            sourceMap: true
          },
          dist: {
            'files': { '<%= dist %>/js/scripts.js': '<%= src %>/js/scripts.js' }
          }
        },
        jshint: {
            'options': { 'jshintrc': '.jshintrc' },
            'all': [
                'Gruntfile.js',
                '<%= src %>/js/**/*.js'
            ]
        },
        watch: {
            'grunt': {
                'files': ['Gruntfile.js'],
                'tasks': [
                    'sass',
                    'jshint'
                ]
            },
            'sass': {
                'files': '<%= src %>/scss/**/*.scss',
                'tasks': [
                    'sass',
                    'autoprefixer'
                ]
            },
            'babel': {
      				'files': '<%= src %>/js/*.js',
      				'tasks': ['babel']
      			},
            'jade': {
                'files': '<%= src %>/**/*.jade',
                'tasks': ['jade']
            },
            'livereload': {
                'files': [
                    '<%= src %>/**/*.jade',
                    '<%= src %>/js/**/*.js',
                    '<%= src %>/scss/**/*.scss',
                ],
                'options': { 'livereload': true }
            }
        },
        connect: {
            'dist': {
                'options': {
                    'port': 9001,
                    'base': '<%= dist %>/',
                    'open': true,
                    'keepalive': false,
                    'livereload': true,
                    'hostname': '127.0.0.1'
                }
            }
        }
    });
    grunt.registerTask('default', [
        'jade',
        'sass',
        'autoprefixer',
        'jshint',
        'babel',
        'connect',
        'watch'
    ]);
};
