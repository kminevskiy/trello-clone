module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      target: {
        files: {
          "public/javascripts/vendor/all.js": ["public/javascripts/vendor/all.js"]
        }
      }
    },
    bower_concat: {
      all: {
        dest: "public/javascripts/vendor/all.js",
        dependencies: {
          "underscore": "jquery",
          "backbone": "underscore"
        }
      }
    }
  });

  [
    "grunt-bower-concat",
    "grunt-contrib-uglify",
  ].forEach(function (task) {
    grunt.loadNpmTasks(task);
  })

  grunt.registerTask("default", ["bower_concat", "uglify"]);
}

