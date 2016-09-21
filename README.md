# sails-generate-foundation

Configures Grunt to use foundation 6 front end framework for your Sails application.

### Installation

```sh
$ npm install sails-generate-foundation
```

In your *new* project folder open .sailsrc file and make sure it has this generator configured like so:
```javascript
{
  "generators": {
    "modules": {
	  "foundation": "sails-generate-foundation"
	}
  }
}
```

### Usage

##### On the command line
cd into your new project folder and run
```sh
$ sails generate foundation 
```
To customize your foundation installation, create a `_settings.scss` file somewhere in your `assets/styles` and add it in `importer.scss` at the top.
More info: https://github.com/megakoresh/foundation6-sails
### License

**[MIT](./LICENSE)**
&copy; 2016 [balderdashy](http://github.com/balderdashy) & contributors

As for [Sails](http://sailsjs.org)?  It's free and open-source under the [MIT License](http://sails.mit-license.org/).

![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)
