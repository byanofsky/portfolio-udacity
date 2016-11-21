module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        sass: {
            dist: {
                src: config.scssDir + 'style.scss',
                dest: config.cssDir + 'style.css'
            }
        },
        csslint: {
            strict: {
                options: {
                    important: 2
                },
                src: '<%= sass.dist.dest %>'
            }
        },
        jshint: {
            options: {
                'eqeqeq': true
            },
            all: [
                'Gruntfile.js',
                config.jsSrcDir + '*.js'
            ]
        },
        concat: {
            options: {
                separator: ';/n',
            },
            dist: {
                src: config.jsSrcDir + '**/*.js',
                dest: config.jsConcatDir + 'built.js'
            }
        }
    });

    grunt.registerTask('default', [
        'sass',
        'csslint',
        'jshint',
        'concat'
    ]);
};
