module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Tasks setup.
    clean: {
      dev: ['dev'],
      prod: ['build']
    },

    concurrent: {
      dev: ['haml:dev', 'sass:dev', 'coffee'],
      prod: ['haml:prod', 'sass:prod', 'coffee']
    },

    copy: {
      dev: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['source/assets/**'], dest: 'dev/assets/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['source/css/fonts/**'], dest: 'dev/css/fonts/', filter: 'isFile'}
        ]
      },
      prod: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['source/assets/**'], dest: 'build/assets/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['source/css/fonts/**'], dest: 'build/css/fonts/', filter: 'isFile'}
        ]
      }
    },

    haml: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'source/',
          src: ['**/*.haml'],
          dest: 'dev/',
          ext: '.html'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: 'source/',
          src: ['**/*.haml'],
          dest: 'build/',
          ext: '.html'
        }]
      }
    },

    processhtml: {
      prod: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['**/*.html'],
          dest: 'build/',
          ext: '.html'
        }]
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'dev/css/main.css': 'source/css/main.scss'
        }
      },

      prod: {
        options: {
          style: 'compressed',
          lineNumbers: false
        },
        files: {
          'build/css/main.min.css': 'source/css/main.scss'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },

      html: {
        files: '**/*.haml',
        tasks: ['haml:dev']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass:dev']
      },
      assets: {
        files: ['**/*.jpg', '**/*.png'],
        tasks: ['copy:dev']
      },
      coffee: {
        files: '**/*.coffee',
        tasks: ['coffee']
      }
    },

    uncss: {
      files: {
        'build/css/app.min.css': ['build/index.html']
      }
    },

    coffee: {
      compile: {
        files: {
          'dev/js/main.js': ['source/js/*.coffee']
        }
      }
    },

    uglify: {
      dev: {
        files: {
          'dev/js/app.js': [
            'source/components/jquery/dist/jquery.min.js'
            <% if (includeFoundation) { %>
            ,'source/components/foundation/js/foundation.min.js'
            <% }
            if (includeRetina) { %>
              ,'source/components/retina.js/src/retina.js'
            <% } %>
            ,'source/js/main.js'
          ],
          'dev/js/modernizr.min.js': ['source/components/modernizr/modernizr.js']
        }
      },
      prod: {
        files: {
          'build/js/app.min.js': [
            'source/components/jquery/dist/jquery.min.js'
            <% if (includeFoundation) { %>
            ,'source/components/foundation/js/foundation.min.js'
            <% }
            if (includeRetina) { %>
              ,'source/components/retina.js/src/retina.js'
            <% } %>
            ,'source/js/main.js'
          ],
          'build/js/modernizr.min.js': ['source/components/modernizr/modernizr.js']
        }
      }
    },

    connect: {
      dev: {
         options: {
          port: 4567,
          base: 'dev/',
          hostname: 'localhost'
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:4567'
      }
    },

    imageoptim: {
      prod: {
        src: ['source/assets']
      }
    },

    ftpush: {
      build: {
        auth: {
          host: 'billymob.com',
          port: 21000,
          authKey: 'admin'
        },
        src: 'build/',
        dest: 'dev/docs/',
        exclusions: ['build/**/.DS_Store', 'build/**/Thumbs.db'],
        simple: true,
        useList: false
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-haml');
  grunt.loadNpmTasks('grunt-processhtml');

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-ftpush');

  // Default task.
  grunt.registerTask('default', []);
  grunt.registerTask('server', ['clean:dev', 'concurrent:dev', 'copy:dev', 'uglify:dev', 'connect:dev', 'open', 'watch']);
  grunt.registerTask('build', ['clean:prod', 'concurrent:prod', 'copy:prod', 'processhtml:prod', 'uglify:prod']);
  grunt.registerTask('deploy', ['ftpush:build --simple']);

};
