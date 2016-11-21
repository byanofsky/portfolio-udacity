module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        csslint: {
            lax: {
                src: config.cssSrcDir + 'main.css'
            }
        },
        concat: {
            options: {
                separator: ';/n'
            },
            dist: {
                src: config.jsSrcDir + '**/*.js',
                dest: config.jsDistDir + 'built.js'
            }
        },
        htmlmin: {
            dist: {
                files: {
                    'dist/index.html': 'src/index.html'
                }
            }
        },
        jshint: {
        	all: [
        		'Gruntfile.js'
        	]
        },
        watch: {
            css: {
                files: config.cssSrcDir + '*.css',
                tasks: ['csslint']
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'csslint',
        'htmlmin'
    ]);
};
