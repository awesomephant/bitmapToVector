module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 3000,
                    base: '.'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['connect']);
};