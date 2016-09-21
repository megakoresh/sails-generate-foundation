/**
 * Module dependencies
 */

var util = require('util');
var _ = require('lodash');
_.defaults = require('merge-defaults');
var fs = require('fs');
/**
 * sails-generate-foundation
 *
 * Usage:
 * `sails generate foundation`
 *
 * @description Generates a foundation
 * @help See http://links.sailsjs.org/docs/generators
 */
var paths = [
	'tasks/pipeline.js',
	'tasks/register/syncAssets.js',
	'tasks/register/compileAssets.js',
	'tasks/register/buildProd.js',
	'tasks/register/build.js',
	'tasks/config/watch.js',
	'tasks/config/sync.js',
	'tasks/config/sass.js',	
	'tasks/config/copy.js',
	'tasks/config/concat.js',	
	'assets/styles/importer.scss',
];
var targets = {};
for(var i in paths){
	targets['./'+paths[i]] = { template: paths[i] };
}
module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate foundation user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    //if (!scope.args[0]) {
      //return cb( new Error('Please provide a name for this foundation.') );
    //}

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }


    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    // Decide the output filename for use in targets below:
    // scope.filename = scope.args[0];

    // Add other stuff to the scope for use in our templates:
    // scope.whatIsThis = 'an example file created at '+scope.createdAt;

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
	
	// remove the old files
	for(var i=0;i<paths.length;i++) { try { fs.unlinkSync(scope.rootPath+'\\'+paths[i]); } catch(e) { console.log('Could not remove file at '+paths[i]); } }
    cb();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: targets,
  
  after: function (scope, cb) { //update dependencies
	var packagejson = JSON.parse(fs.readFileSync(scope.rootPath + '/package.json'));
	packagejson.dependencies['foundation-sites'] = '>=6.2.0';
	packagejson.dependencies['jade'] = '>=1.11.0';
	packagejson.dependencies['motion-ui'] = '>=1.1.0';
	packagejson.dependencies['grunt-sass'] = '>=1.1.0';
	packagejson.dependencies['load-grunt-tasks'] = '>=3.3.0';
	fs.writeFileSync(scope.rootPath + '/package.json', JSON.stringify(packagejson, null, 2));
	cb();
  },

  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};





/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "foundation":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-foundation`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}
