##Grunt Beanstalk API [![Build Status](https://travis-ci.org/WeareJH/grunt-beanstalk-api.svg?branch=master)](https://travis-ci.org/WeareJH/grunt-beanstalk-api)

> A Grunt task that allows you to pull individual files, from a specific revision in a Beanstalk repo.
  
A great use-case for this would be the sharing of common SASS files across multiple projects
for the same client. For example, here at JH, we would often be creating a Magento Store for a client that also includes a Wordpress blog.
We can use the CSS from the main Magento website for the base styling, but should we want to add any Wordpress specific
style we might need access to some `$vars` that are set in the main project. This presents the need to programmatically include sometimes
only a single file from another project (without having to clone the entire repo) - this is where our new plugin can help.

## How to use.

> In this example, change any occurrence of `your-org` with your actual Beanstalk sub-domain 

1. First, log into your Beanstalk account and create an access token at `https://your-org.beanstalkapp.com/access_tokens`
2. Create a `creds.json` file containing your orgname, username + access token.

```json
{
  "orgname": "your-org",
  "username": "awesome-user",
  "token": "beb9189992a55fcb129b156cdb6ae819acccb42d9f88ef8f2e"
}
```

3. Add the following configuration to your Gruntfile.js

```js
/**
 * Gruntfile.js configuration
 */

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
```

4. Run `grunt beanstalk:sync` to have your files pulled from beanstalk and written into the directory of your choice.
 
## Options

- **method**          - Currently we only support fetching files (as this was our immediate use-case)
- **repo**            - A repository ID, can be either the short-name or an actual numeric ID
- **path**            - A single file, or an array of file paths relating to the remote repo.
- **revision**        - Specify any git revision identifier, can be a commit hash or tag name
- **outDir**          - Where the files should be written locally.
- **transformPath**   - If you need to modify the file path before it's written to your project, you can provide a function. For example, 
to strip `public` from the start of all paths before they are written, you can provide a callback such as:

```js
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
        outDir:   './',
        transformPath: function(path) {
            return path.split("/").slice(1).join("/");
        }
    }
}
```
