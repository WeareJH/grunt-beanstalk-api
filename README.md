##Grunt Beanstalk API [![Build Status](https://travis-ci.org/WeareJH/grunt-beanstalk-api.svg?branch=master)](https://travis-ci.org/WeareJH/grunt-beanstalk-api)

*Example*

```js
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
                outDir:   './'
            }
        }
    });
    
    grunt.loadTasks('tasks');
};
```
