/**
 * Routr
 * Route based initialization for JS
 *
 * Author  : Srinath
 * Code    : https://github.com/Checksum/routr
 * Version : 0.1a
 * Date    : Feb 4, 2012
 *
 */
var Routr = function() {
	var	fns = {},
		common_fn,
		base_url,
		called = false;

	return ({
		root: function(url) {
			base_url = url;
			return this;
		},
		common: function(fn) {
			common_fn = fn;
			return this;
		},
		bind: function(route, fn, chain) {
			fns[route] = {};
			fns[route].fn = fn;
			fns[route].chain = chain ? true : false;
			return this;
		},
		run: function() {
			var path = document.location.pathname;
			if( base_url && base_url !== '' ) path = path.replace(base_url, '');
			var route = fns[path];
			if( route.chain ) {
				var slugs = path.split("/"),
					slug = '';
				for( var i=1; i<slugs.length; i++ ) {
					slug += '/'+slugs[i];
					if( fns[slug] && typeof fns[slug].fn === 'function' ) fns[slug].fn.call();
				}
				called = true;
			}
			if( !called && typeof fns[path].fn === 'function' ) route.fn.call();
			common_fn && common_fn.call();
		}
	});
}();

