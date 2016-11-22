module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var config = grunt.file.readYAML('Gruntconfig.yml');

    grunt.initConfig({
        clean: {
            dist: {
                src: 'dist/**/*'
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
        responsive_images: {
            dist: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: '100%',
                        rename: false,
                        suffix: '-2x',
                        quality: 50
                    }, {
                        width: '50%',
                        rename: false,
                        suffix: '-1x',
                        quality: 50
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/img/**.{jpg,gif,png}'],
                    dest: 'dist/img/'
                }]
            }
        },
        watch: {
            css: {
                files: config.cssSrcDir + '*.css',
                tasks: ['cssmin']
            },
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
        'responsive_images',
        'watch'
    ]);
};
