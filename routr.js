/**
 * Routr - Route specific initialization for JavaScript
 *
 * Version	: 0.3.2
 * Date		  : Nov 07, 2013
 * Author   : Srinath
 * Source   : http://github.com/Checksum/routr
 * Demo     : http://iambot.net/demo/routr/
 *
 */
var Routr = (function() {
    "use strict";
    
	var	base_url,
		fns = {};
	
	// Simple test to check if the path is a regex
	function isRegex(path) {
    	return typeof path === 'object' && typeof path.exec === 'function';
	}
	
	// Sanitizes our path by adding a / to the front and deleting
	// the trailing / if any
	function sanitize(path) {
	    if (path === '/') {
            return path;
	    }
		if (path.charAt(0) !== '/') {
            path = '/' + path;
		}
		if (path.charAt(path.length - 1) === '/') {
            path = path.substring(0, path.length - 1);
		}
		return path;
	}
    
	// Our magic starts here
	return ({
		// Set the root path for the application
		// Ex: if your app is at http://example.com/app/ then
		// set the url as /app
		root: function(url) {
			base_url = sanitize(url);
			return this;
		},

		// Bind paths
		// @route - can be a string or regex pattern ("/home" or /home/)
		// @fn 		- the callback function
		// @param - an array with the names of the parameters ['group','id']
		// @chain - if true, all the matching parent paths are executed
		bind: function(route, fn, chain, param) {
			// If our route is a regex patten, extract the patten string
			if (isRegex(route)) {
				route = route.source;
			}
			// Otherwise, sanitize our route
			else {
				route = sanitize(route);
			}
			// Store our stuff for the route
			fns[route] = {};
			fns[route].fn = fn;
			fns[route].param = param;
			fns[route].chain = chain ? true : false;
			return this;
		},

		// Run our app
		run: function() {
			var path = document.location.pathname,
				route,
				param,
				params = {},
				i,
                len,
				regex,
				paramName,
                slugs,
                slug;

			// Get our pathname and remove the base_url if set
			if (base_url && base_url !== '') {
				path = path.replace(base_url, '');
			}
			// Check if each route we have matches the path
			for (route in fns) {
				if (fns.hasOwnProperty(route)) {
					regex = '^' + route + '\\/?$';
					var matches = path.match(regex);
					if (matches) {
						// We don't need the first match as its the whole string
						path = matches.shift();
                        len = matches.length;
						for (i = 0; i < len; i++) {
							paramName = fns[route].param && fns[route].param[i] || 0;
							params[paramName] = matches[i];
						}
						// Now, if the parameter names array is sent, we are
						// directly placing the variables in the function scope
						// Ex: if ['name','number'] is sent then we can access its
						// values inside the function as this.name and this.number.
						// Else, we can access the entire array as this.param[0]
						if (fns[route].param && fns[route].param.length === len) {
							params.forEach(function(param) {
								this[param] = params[param];
							});
						}
						else {
							this.param = params;
						}
		
						// Matching and executing all our parent paths if chaining
						if (fns[route].chain) {
						    slugs = path.split("/");
						    slug = '';
							for (i = 1; i < slugs.length - 1; i++) {
								slug += '/' + slugs[i];
								fns[slug] && fns[slug].fn && fns[slug].fn.call(this);
							}
						}
						
						// Main route callback function
						fns[route].fn && fns[route].fn.call(this);
					}
				}
			}
		}
	});
})();
