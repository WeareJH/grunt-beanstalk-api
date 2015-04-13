'use strict';

module.exports = function (grunt) {

    var objectAssign = require('object-assign');
    var path = require('path');
    var beanstalk = require('beanstalk-api');

    grunt.registerMultiTask('beanstalk', 'Interact with the Beanstalk API', function () {

        var task = this;
        var done = task.async();
        var options = task.options();

        if (grunt.option('token')) {
            options.creds.token = grunt.option('token');
        }

        if (!task.data.method) {
            return grunt.fatal('You must provide a `method` in your configuration');
        }

        var org = beanstalk.org(options.creds);

        if (task.data.method === 'file') {

            /**
             * Combine options
             */
            var args = objectAssign({}, { org: org }, options, task.data);

            grunt.log.ok('Connecting to the Beanstalk API...'.yellow.bold);

            /**
             * Log files that will be requested
             */
            logAdded(task.data.path);

            /**
             * Hit the api
             */
            beanstalk.file(args).then(function (file) {

                grunt.log.ok('Connection OK'.cyan.bold);

                /**
                 * Write the files to disk
                 */
                if (Array.isArray(file)) {
                    file.forEach(writeOne);
                } else {
                    writeOne(file);
                }

                done();
            })['catch'](function (err) {
                grunt.log.error('The Beanstalk API returned the following error:');
                grunt.fatal(err);
            });
        }

        /**
         * Log added files for sanity check
         * @param paths
         */
        function logAdded(paths) {
            if (Array.isArray(paths)) {
                paths.forEach(logOne);
            } else {
                logOne(paths);
            }
        }

        /**
         * @param path
         */
        function logOne(path) {
            grunt.verbose.ok('Getting ' + path);
        }

        /**
         * Write a single file to disk
         * @param file
         */
        function writeOne(file) {

            if (task.data.transformPath) {
                file.data.path = task.data.transformPath(file.data.path);
            }

            var outfile = path.join(file.outDir, file.data.path);
            grunt.log.ok('Writing file: '.green + outfile);
            grunt.file.write(outfile, file.data.contents);
        }
    });
};