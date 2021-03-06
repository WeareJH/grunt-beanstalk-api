'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        beanstalk: {
            options: {
                creds: require('./creds.json')
            },
            sync: {
                method:   'file',
                repo:     'some-repo',
                path:     [
                    'public/assets/scss/core.scss',
                    'public/assets/scss/modules/_mixins.scss'
                ],
                revision: '1.0.0',
                outDir:   './public/shane',
                transformPath: function (path) {
                    return path.split('/').slice(1).join('/');
                }
            }
        }
    });

    grunt.loadTasks('tasks');
};
