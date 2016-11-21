module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        csslint: {
            strict: {
                options: {
                    important: 2
                },
                src: config
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
                dest: config.jsDistDir + 'built.js'
            }
        }
    });

    grunt.registerTask('default', [
        'csslint',
        'jshint',
        'concat'
    ]);
};
