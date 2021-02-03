var config = require('./config');

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // minimize svgs
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false }, 
          { removeUselessStrokeAndFill: false}, 
          // {
            // removeAttrs: {
            //   attrs: ['xmlns'] // need this for background images
            // }
          // }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: "dist/assets/svg/",
            src: ['**/*.svg'],
            dest: 'dist/assets/svg-min/',
            ext: '.svg'
          }
        ]
      }
    },

    // compile sass
    sass: {
      options: {
        style: 'expanded' // options: compressed,  
        // lineNumbers: true
      },
      dist: {
        files: {
          'dev/assets/css/style.noprefix.css': 'dev/assets/sass/style.sass', // 'destination': 'source'
        }
      }
    },

    // add vendor-specific prefixes from Can I Use
    postcss: {
        options: {
            map: false,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        default: {
            src: 'dev/assets/css/style.noprefix.css',
            dest: 'dist/assets/css/style.css'
        }
    },

    'compile-handlebars': {
      globbedTemplateAndOutput: {
        files: [{
            expand: true,
            cwd: 'dev/',
            src: '*.html',
            dest: 'dist/',
            ext: '.html'
        }], 
        templateData: '',
        helpers: '',
        partials: 'dev/partials/**/*.html'
      },
    },

    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      }
    },

    // watch
    watch: {
      options: {
        livereload: true
      },
      dev: {
        files: ['dev/assets/sass/**/*', 'dev/**/*.html', 'dist/assets/svg/**/*', 'dist/assets/js/**/*'],
        tasks: ['svgmin', 'sass', 'postcss', 'compile-handlebars']
      },
      js: {
        files: ['dev/assets/js/**/*'],
        tasks: ['copy:js_to_frontend']
      }
    },

    // configure live reload
    livereload: {
      options: {
        base: ''
      },
      files: ['dist/**/*']
    }
  });

  require('matchdep').filterDev(['grunt-*']).forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['build']);

  if (config.USE_EXPRESS) {
    grunt.registerTask('build', ['svgmin', 'sass', 'postcss', 'compile-handlebars', 'watch', 'livereload']);
  }else{
    grunt.registerTask('build', ['svgmin', 'sass', 'postcss', 'compile-handlebars', 'watch']);
  }
};
