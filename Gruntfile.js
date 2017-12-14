module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        coffee: {
            compile: {
                options: {
                    bare: true,
                    sourceMap: true
                },

                files: [{
                    expand: true,
                    cwd: "coffee/",
                    src: "**/*.coffee",
                    dest: "js/",
                    ext: ".js"
                }]
            }
        },

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "sass/",
                    src: "**/*.scss",
                    dest: "css/",
                    ext: ".css"
                }]
            }
        },

        watch: {
            build: {
                files: ["coffee/**/*.coffee", "sass/**/*.scss"],
                tasks: ["coffee", "sass"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("default", ["coffee", "sass", "watch"]);
};
