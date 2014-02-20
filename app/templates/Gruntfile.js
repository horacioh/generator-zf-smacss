module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //global variables
    srcFolder: 'source',
    devFolder: 'dev',
		buildFolder: 'build',
		port: 4567,

    // Tasks setup.
    clean: {
      dev: ['<%= devFolder %>'],
      prod: ['<%= buildFolder %>']
    },

    concurrent: {
      dev: ['haml:dev', 'sass:dev', 'coffee'],
      prod: ['haml:prod', 'sass:prod', 'coffee']
    },

    copy: {
      dev: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['<%= srcFolder %>/assets/**'], dest: '<%= devFolder %>/assets/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['<%= srcFolder %>/css/fonts/**'], dest: '<%= devFolder %>/css/fonts/', filter: 'isFile'}
        ]
      },
      prod: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['<%= srcFolder %>/assets/**'], dest: '<%= buildFolder %>/assets/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['<%= srcFolder %>/css/fonts/**'], dest: '<%= buildFolder %>/css/fonts/', filter: 'isFile'}
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
          cwd: '<%= srcFolder %>/',
          src: ['**/*.haml'],
          dest: '<%= devFolder %>/',
          ext: '.html'
        }]
      },
      prod: {
        files: [{
          expand: true,
          cwd: '<%= srcFolder %>/',
          src: ['**/*.haml'],
          dest: '<%= buildFolder %>/',
          ext: '.html'
        }]
      }
    },

    processhtml: {
      prod: {
        files: [{
          expand: true,
          cwd: '<%= devFolder %>/',
          src: ['**/*.html'],
          dest: '<%= buildFolder %>/',
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
          '<%= devFolder %>/css/app.css': '<%= srcFolder %>/css/app.scss'
        }
      },

      prod: {
        options: {
          style: 'compressed',
          lineNumbers: false
        },
        files: {
          '<%= buildFolder %>/css/app.min.css': '<%= srcFolder %>/css/app.scss'
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
      dev: {
        files: {
          '<%= devFolder %>/css/app.css': ['<%= devFolder %>/index.html', '<%= devFolder %>/kitchenSink.html']
        }
      },
      prod: {
        files: {
          '<%= buildFolder %>/css/app.min.css': ['<%= buildFolder %>/index.html', '<%= buildFolder %>/kitchenSink.html']
        }
      }
    },

    coffee: {
      compile: {
        files: {
          '<%= devFolder %>/js/main.js': ['<%= srcFolder %>/js/*.coffee']
        }
      }
    },

    uglify: {
      dev: {
        files: {
          '<%= devFolder %>/js/modernizr.min.js': ['<%= srcFolder %>/components/modernizr/modernizr.js']
        }
      },
      prod: {
        files: {
          '<%= buildFolder %>/js/app.min.js': [
            '<%= srcFolder %>/components/jqueryjquery.min.js',
            '<%= srcFolder %>/components/foundation/js/foundation.min.js',
            '<%= srcFolder %>/components/retina.js/src/retina.js',
            '<%= devFolder %>/js/main.js'
          ],
          '<%= buildFolder %>/js/modernizr.min.js': ['<%= srcFolder %>/components/modernizr/modernizr.js']
        }
      }
    },

    connect: {
      dev: {
         options: {
          port: '<%= port %>',
          base: '<%= devFolder %>/',
          hostname: 'localhost'
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.dev.options.port %>'
      }
    },

    imageoptim: {
      prod: {
        src: ['<%= srcFolder %>/assets']
      }
    },

    ftpush: {
      build: {
        auth: {
          host: 'billymob.com',
          port: 21000,
          authKey: 'admin'
        },
        src: '<%= buildFolder %>/',
        dest: 'dev/docs/',
        exclusions: ['<%= buildFolder %>/**/.DS_Store', '<%= buildFolder %>/**/Thumbs.db'],
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
