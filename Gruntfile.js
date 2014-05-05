module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            development: {
                src: ['src/app.js', 'src/*.js'],
                dest: 'public/scripts/app.js'
            }
        },
        copy: {
            main: {
                files: [
                    {dest: "public/scripts/", src:"bower_components/mondernizr/modernizr.js", expand: true, flatten: true},
                    {dest: "public/scripts/", src:"bower_components/angular/angular.js", expand: true, flatten: true},
                    {dest: "public/scripts/", src:"bower_components/angular-route/angular-route.js", expand: true, flatten: true}
                ]
            }
        },
        jasmine: {
            options: {
                vendor: [
                    'bower_components/angular/angular.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'bower_components/angular-route/angular-route.js'
                ],
                specs: 'specs/*-spec.js',
                helpers: 'specs/*-helper.js',
                keepRunner: true
            },
            common: {
                src: 'src/**/*.js',
                options: {
                    display: 'short'
                }
            },
            debug: {
                src: 'src/**/*.js',
            }
        },
        stylus: {
            development: {
                options: {
                    compress: false,
                    linenos: true,
                    import: ['nib']
                },
                files: {
                    'public/styles/main.css': 'stylus/main.styl'
                }
            }
        },
        watch: {
            stylus: {
                files: ['src/**/*.js', 'specs/**/*.js', 'stylus/**/*.styl'],
                tasks: ['concat', 'copy', 'jasmine:debug', 'stylus:development']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'copy', 'jasmine:common', 'stylus']);
    grunt.registerTask('debug', ['concat', 'copy', 'jasmine:debug', 'stylus']);
    grunt.registerTask('force', ['concat', 'copy', 'stylus']);
};
