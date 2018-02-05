module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        appCss: grunt.file.readJSON("config/src.css.json"),

        tag: {
            banner: '/*!\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright (c) <%= pkg.copyright %>. All rights reserved.\n' +
            ' */\n'
        },

        clean: ["dist"],

        // jshint
        jshint: {
            app: ['src/js/app/**/*.js'],
            api: ['src/js/api/**/*.js'],
            plugins: ['src/js/plugins/**/*.js'],
            options: {
                notypeof: true,
                debug: true,
                eqnull: true,
                sub: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },

        // concat
        concat: {
            options: {
                banner: '<%= tag.banner %>',
                separator: '\n\n/* ------------------------------------------------------------------------------------------------------------ */\n\n'
            },

            vendor: {
                src: grunt.file.readJSON("config/libraries.json"),
                dest: "dist/js/vendor.js"
            },

            angular: {
                src: grunt.file.readJSON("config/src.app.json"),
                dest: 'dist/js/app.js'
            },

            api: {
                src: grunt.file.readJSON("config/src.api.json"),
                dest: 'dist/js/api.js'
            },

            plugins: {
                src: grunt.file.readJSON("config/src.plugins.json"),
                dest: 'dist/js/plugins.js'
            }
        },

        // uglify javascript files
        uglify: {

            options: {
                banner: '<%= tag.banner %>',
                mangle: {
                    except: ['jQuery', 'angular', '$', 'require', 'exports', 'kendo']
                }
            },

            angular: {
                files: {
                    'dist/js/app.min.js': ['<%= concat.angular.dest %>']
                }
            },

            api: {
                files: {
                    'dist/js/api.min.js': ['<%= concat.api.dest %>']
                }
            },

            plugins: {
                files: {
                    'dist/js/plugins.min.js': ['<%= concat.plugins.dest %>']
                }
            }

        },

        // copy task
        copy: {

            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: ['css/**', 'fonts/**'],
                        dest: 'dist/fonts/font-awesome'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: ['**'],
                        dest: 'dist/fonts'
                    }
                ]
            },

            css: {
                expand: true,
                cwd: "bower_components/",
                src: grunt.file.readJSON("config/copy.css.json"),
                dest: "dist/css/",
                flatten: true,
                filter: 'isFile'
            },

            sprites: {
                expand: true,
                cwd: "bower_components/",
                src: "kendo-ui/styles/Default/*.*",
                dest: "dist/css/Default/",
                flatten: true,
                filter: 'isFile'
            }
        },

        // sass task
        sass: {
            dist: {
                options: {
                    noCache: true,
                    style: 'compressed'
                },
                files: {
                    'dist/css/main.css': 'src/sass/main.scss'
                }
            }
        },

        // angular templates
        ngtemplates: {
            app: {
                cwd: "src/js/app/",
                src: "**/*.html",
                dest: "dist/js/templates.js",
                options: {
                    htmlmin: {collapseWhitespace: true, collapseBooleanAttributes: true, removeComments: true}
                }
            }
        },

        // wiredep task
        wiredep: {
            dev: {
                src: "index.html"
            }
        },

        // include source task
        includeSource: {
            options: {
                basePath: '',
                typeMappings: {
                    'html': 'html'
                }
            },
            dev: {
                files: {
                    'index.html': 'src/index/index_dev.html'
                }
            }
        },

        // Watch file changes
        watch: {
            options: {
                livereload: true
            },

            // Watch CSS
            css: {
                files: ["**/*.scss"],
                tasks: ["sass"],
                options: {
                    spawn: false
                }
            },

            angular: {
                files: ['src/js/app/**/*.js'],
                tasks: ['jshint:app', 'ngtemplates', 'includeSource:dev', 'wiredep:dev']
            },

            angularTemplates: {
                files: ['src/js/app/**/*.html'],
                tasks: ["ngtemplates"]
            },

            api: {
                files: ['src/js/api/**/*.js'],
                tasks: ['jshint:api', 'includeSource:dev', 'wiredep:dev']
            },

            plugins: {
                files: ['src/js/plugins/**/*.js'],
                tasks: ['jshint:plugins', 'includeSource:dev', 'wiredep:dev']
            }
        },

        // browserSync task
        browserSync: {
            dev: {
                options: {
                    server: {
                        baseDir: "./"
                    }
                }
            }
        }

    });

    // Load Grunt Tasks Plugins
    require("jit-grunt")(grunt, {
        ngtemplates: 'grunt-angular-templates'
    });

    grunt.registerTask("dev", ["clean", "jshint", "copy", "sass", "ngtemplates", "includeSource:dev", "wiredep:dev"]);
    grunt.registerTask("start", ["dev", "browserSync"]);

};
