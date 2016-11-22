module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        clean: {
            dist: {
                src: 'dist'
            }
        },
        copy: {
            svg: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/img/*.svg'],
                    dest: 'dist/img/'
                }]
            }
        },
        csslint: {
            lax: {
                src: config.cssSrcDir + 'main.css'
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    flatten: true,
                    ext: '.min.css',
                    src: config.cssSrcDir + '*.css',
                    dest: config.cssDistDir
                }]
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
            // css: {
            //     files: config.cssSrcDir + '*.css',
            //     tasks: ['csslint']
            // },
            html: {
                files: config.htmlSrcDir + '*.html',
                tasks: ['htmlmin']
            }
        }
    });

    grunt.registerTask('default', [
        'clean',
        'jshint',
        'copy',
        'csslint',
        'cssmin',
        'htmlmin',
        'watch'
    ]);
};
