/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//




window.addEventListener("scroll", function() {
    var t, e, n, i, r;
    n=window.pageYOffset||document.documentElement.scrollTop, r=150, e=$("#router"), n>r?e.hasClass("smaller")||e.addClass("smaller"): e.hasClass("smaller")&&e.removeClass("smaller"), i=50, t=$("#mobile-trigger"), n>i?t.hasClass("top")||t.addClass("top"):t.hasClass("top")&&t.removeClass("top");
});

function() {
    function t() {
}
function e(t, e) {
    for(var n=t.length;
    n--;
    )if(t[n].listener===e)return n;
    return-1;
}
function n(t) {
    return function() {
    return this[t].apply(this, arguments);
}
}var i=t.prototype, r=this, o=r.EventEmitter;
    i.getListeners=function(t) {
    var e, n, i=this._getEvents();
    if("object"==typeof t) {
    e= {
}
;
    for(n in i)i.hasOwnProperty(n)&&t.test(n)&&(e[n]=i[n]);
}
else e=i[t]||(i[t]=[]);
    return e;
}
, i.flattenListeners=function(t) {
    var e, n=[];
    for(e=0;
    t.length>e;
    e+=1)n.push(t[e].listener);
    return n;
}
, i.getListenersAsObject=function(t) {
    var e, n=this.getListeners(t);
    return n instanceof Array&&(e= {
}
, e[t]=n), e||n;
}
, i.addListener=function(t, n) {
    var i, r=this.getListenersAsObject(t), o="object"==typeof n;
    for(i in r)r.hasOwnProperty(i)&&-1===e(r[i], n)&&r[i].push(o?n:  {
    listener: n, once:!1;
}
);
    return this;
}
, i.on=n("addListener"), i.addOnceListener=function(t, e) {
    return this.addListener(t,  {
    listener: e, once:!0;
}
);
}, i.once=n("addOnceListener"), i.defineEvent=function(t) {
    return this.getListeners(t), this;
}
, i.defineEvents=function(t) {
    for(var e=0;
    t.length>e;
    e+=1)this.defineEvent(t[e]);
    return this;
}
, i.removeListener=function(t, n) {
    var i, r, o=this.getListenersAsObject(t);
    for(r in o)o.hasOwnProperty(r)&&(i=e(o[r], n), -1!==i&&o[r].splice(i, 1));
    return this;
}
, i.off=n("removeListener"), i.addListeners=function(t, e) {
    return this.manipulateListeners(!1, t, e);
}
, i.removeListeners=function(t, e) {
    return this.manipulateListeners(!0, t, e);
}
, i.manipulateListeners=function(t, e, n) {
    var i, r, o=t?this.removeListener: this.addListener, s=t?this.removeListeners:this.addListeners;
    if("object"!=typeof e||e instanceof RegExp)for(i=n.length;
    i--;
    )o.call(this, e, n[i]);
    else for(i in e)e.hasOwnProperty(i)&&(r=e[i])&&("function"==typeof r?o.call(this, i, r): s.call(this, i, r));
    return this;
}
, i.removeEvent=function(t) {
    var e, n=typeof t, i=this._getEvents();
    if("string"===n)delete i[t];
    else if("object"===n)for(e in i)i.hasOwnProperty(e)&&t.test(e)&&delete i[e];
    else delete this._events;
    return this;
}
, i.removeAllListeners=n("removeEvent"), i.emitEvent=function(t, e) {
    var n, i, r, o, s=this.getListenersAsObject(t);
    for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;
    i--;
    )n=s[r][i], n.once===!0&&this.removeListener(t, n.listener), o=n.listener.apply(this, e||[]), o===this._getOnceReturnValue()&&this.removeListener(t, n.listener);
    return this;
}
, i.trigger=n("emitEvent"), i.emit=function(t) {
    var e=Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(t, e);
}
, i.setOnceReturnValue=function(t) {
    return this._onceReturnValue=t, this;
}
, i._getOnceReturnValue=function() {
    return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue: !0;
}
, i._getEvents=function() {
    return this._events||(this._events= {
}
);
}
, t.noConflict=function() {
    return r.EventEmitter=o, t;
}
, "function"==typeof define&&define.amd?define("eventEmitter/EventEmitter", [], function() {
    return t;
}
): "object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t;
}.call(this), function(t) {
    function e(e) {
    var n=t.event;
    return n.target=n.target||n.srcElement||e, n;
}
var n=document.documentElement, i=function() {
}
;
    n.addEventListener?i=function(t, e, n) {
    t.addEventListener(e, n, !1);
}
: n.attachEvent&&(i=function(t, n, i) {
    t[n+i]=i.handleEvent?function() {
    var n=e(t);
    i.handleEvent.call(i, n);
}
: function() {
    var n=e(t);
    i.call(t, n);
}
, t.attachEvent("on"+n, t[n+i]);
});
    var r=function() {
}
;
    n.removeEventListener?r=function(t, e, n) {
    t.removeEventListener(e, n, !1);
}
: n.detachEvent&&(r=function(t, e, n) {
    t.detachEvent("on"+e, t[e+n]);
    try {
    delete t[e+n];
}
catch(i) {
    t[e+n]=void 0;
}
});
    var o= {
    bind: i, unbind:r;
}
;
    "function"==typeof define&&define.amd?define("eventie/eventie", o): t.eventie=o;
}
(this), function(t, e) {
    "function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter", "eventie/eventie"], function(n, i) {
    return e(t, n, i);
}
): "object"==typeof exports?module.exports=e(t, require("wolfy87-eventemitter"), require("eventie")):t.imagesLoaded=e(t, t.EventEmitter, t.eventie);
}(window, function(t, e, n) {
    function i(t, e) {
    for(var n in e)t[n]=e[n];
    return t;
}
function r(t) {
    return"[object Array]"===d.call(t);
}
function o(t) {
    var e=[];
    if(r(t))e=t;
    else if("number"==typeof t.length)for(var n=0, i=t.length;
    i>n;
    n++)e.push(t[n]);
    else e.push(t);
    return e;
}
function s(t, e, n) {
    if(!(this instanceof s))return new s(t, e);
    "string"==typeof t&&(t=document.querySelectorAll(t)), this.elements=o(t), this.options=i( {
}
, this.options), "function"==typeof e?n=e: i(this.options, e), n&&this.on("always", n), this.getImages(), u&&(this.jqDeferred=new u.Deferred);
    var r=this;
    setTimeout(function() {
    r.check();
}
);
}function a(t) {
    this.img=t;
}
function l(t) {
    this.src=t, f[t]=this;
}
var u=t.jQuery, c=t.console, h=void 0!==c, d=Object.prototype.toString;
    s.prototype=new e, s.prototype.options= {
}
, s.prototype.getImages=function() {
    this.images=[];
    for(var t=0, e=this.elements.length;
    e>t;
    t++) {
    var n=this.elements[t];
    "IMG"===n.nodeName&&this.addImage(n);
    var i=n.nodeType;
    if(i&&(1===i||9===i||11===i))for(var r=n.querySelectorAll("img"), o=0, s=r.length;
    s>o;
    o++) {
    var a=r[o];
    this.addImage(a);
}
}}, s.prototype.addImage=function(t) {
    var e=new a(t);
    this.images.push(e);
}
, s.prototype.check=function() {
    function t(t, r) {
    return e.options.debug&&h&&c.log("confirm", t, r), e.progress(t), n++, n===i&&e.complete(), !0;
}
var e=this, n=0, i=this.images.length;
    if(this.hasAnyBroken=!1, !i)return void this.complete();
    for(var r=0;
    i>r;
    r++) {
    var o=this.images[r];
    o.on("confirm", t), o.check();
}
}, s.prototype.progress=function(t) {
    this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;
    var e=this;
    setTimeout(function() {
    e.emit("progress", e, t), e.jqDeferred&&e.jqDeferred.notify&&e.jqDeferred.notify(e, t);
}
);
}, s.prototype.complete=function() {
    var t=this.hasAnyBroken?"fail": "done";
    this.isComplete=!0;
    var e=this;
    setTimeout(function() {
    if(e.emit(t, e), e.emit("always", e), e.jqDeferred) {
    var n=e.hasAnyBroken?"reject": "resolve";
    e.jqDeferred[n](e);
}
});
}, u&&(u.fn.imagesLoaded=function(t, e) {
    var n=new s(this, t, e);
    return n.jqDeferred.promise(u(this));
}
), a.prototype=new e, a.prototype.check=function() {
    var t=f[this.img.src]||new l(this.img.src);
    if(t.isConfirmed)return void this.confirm(t.isLoaded, "cached was confirmed");
    if(this.img.complete&&void 0!==this.img.naturalWidth)return void this.confirm(0!==this.img.naturalWidth, "naturalWidth");
    var e=this;
    t.on("confirm", function(t, n) {
    return e.confirm(t.isLoaded, n), !0;
}
), t.check();
}, a.prototype.confirm=function(t, e) {
    this.isLoaded=t, this.emit("confirm", this, e);
}
;
    var f= {
}
;
    return l.prototype=new e, l.prototype.check=function() {
    if(!this.isChecked) {
    var t=new Image;
    n.bind(t, "load", this), n.bind(t, "error", this), t.src=this.src, this.isChecked=!0;
}
}, l.prototype.handleEvent=function(t) {
    var e="on"+t.type;
    this[e]&&this[e](t);
}
, l.prototype.onload=function(t) {
    this.confirm(!0, "onload"), this.unbindProxyEvents(t);
}
, l.prototype.onerror=function(t) {
    this.confirm(!1, "onerror"), this.unbindProxyEvents(t);
}
, l.prototype.confirm=function(t, e) {
    this.isConfirmed=!0, this.isLoaded=t, this.emit("confirm", this, e);
}
, l.prototype.unbindProxyEvents=function(t) {
    n.unbind(t.target, "load", this), n.unbind(t.target, "error", this);
}
, s;
}), function(t, e) {
    "object"==typeof exports?module.exports=e(): "function"==typeof define&&define.amd?define(["jquery", "googlemaps!"], e):t.GMaps=e();
}
(this, function() {
    /*!
 * GMaps.js v0.4.18
 * http: //hpneo.github.com/gmaps/
 *
 * Copyright 2015,  Gustavo Leon
 * Released under the MIT License.
 */
if("object"!=typeof window.google||!window.google.maps)throw"Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.";
    var t=function(t, e) {
    var n;
    if(t===e)return t;
    for(n in e)t[n]=e[n];
    return t;
}
, n=function(t, e) {
    var n, i=Array.prototype.slice.call(arguments, 2), r=[], o=t.length;
    if(Array.prototype.map&&t.map===Array.prototype.map)r=Array.prototype.map.call(t, function(t) {
    var n=i.slice(0);
    return n.splice(0, 0, t), e.apply(this, n);
}
);
    else for(n=0;
    o>n;
    n++)callback_params=i, callback_params.splice(0, 0, t[n]), r.push(e.apply(this, callback_params));
    return r;
}
, i=function(t) {
    var e, n=[];
    for(e=0;
    e<t.length;
    e++)n=n.concat(t[e]);
    return n;
}
, r=function(t, e) {
    var n=t[0], i=t[1];
    return e&&(n=t[1], i=t[0]), new google.maps.LatLng(n, i);
}
, o=function(t, e) {
    var n;
    for(n=0;
    n<t.length;
    n++)t[n]instanceof google.maps.LatLng||(t[n]=t[n].length>0&&"object"==typeof t[n][0]?o(t[n], e): r(t[n], e));
    return t;
}
, s=function(t, e) {
    var n, i=t.replace(".", "");
    return n="jQuery"in this&&e?$("."+i, e)[0]: document.getElementsByClassName(i)[0];
}
, a=function(t, e) {
    var n, t=t.replace("#", "");
    return n="jQuery"in window&&e?$("#"+t, e)[0]: document.getElementById(t);
}
, l=function(t) {
    var e=0, n=0;
    if(t.offsetParent)do e+=t.offsetLeft, n+=t.offsetTop;
    while(t=t.offsetParent);
    return[e, n];
}
, u=function() {
    "use strict";
    var e=document, n=function(i) {
    if(!this)return new n(i);
    i.zoom=i.zoom||15, i.mapType=i.mapType||"roadmap";
    var r, o=this, u=["bounds_changed", "center_changed", "click", "dblclick", "drag", "dragend", "dragstart", "idle", "maptypeid_changed", "projection_changed", "resize", "tilesloaded", "zoom_changed"], c=["mousemove", "mouseout", "mouseover"], h=["el", "lat", "lng", "mapType", "width", "height", "markerClusterer", "enableNewStyle"], d=i.el||i.div, f=i.markerClusterer, p=google.maps.MapTypeId[i.mapType.toUpperCase()], g=new google.maps.LatLng(i.lat, i.lng), m=i.zoomControl||!0, v=i.zoomControlOpt|| {
    style: "DEFAULT", position:"TOP_LEFT"}
, y=v.style||"DEFAULT", b=v.position||"TOP_LEFT", w=i.panControl||!0, x=i.mapTypeControl||!0, _=i.scaleControl||!0, k=i.streetViewControl||!0, C=C||!0, T= {
}
, E= {
    zoom: this.zoom, center:g, mapTypeId:p;
}
, S= {
    panControl: w, zoomControl:m, zoomControlOptions: {
    style: google.maps.ZoomControlStyle[y], position:google.maps.ControlPosition[b];
}
, mapTypeControl:x, scaleControl:_, streetViewControl:k, overviewMapControl:C;
};
    if(this.el="string"==typeof i.el||"string"==typeof i.div?d.indexOf("#")>-1?a(d, i.context): s.apply(this, [d, i.context]):d, "undefined"==typeof this.el||null===this.el)throw"No element defined.";
    for(window.context_menu=window.context_menu|| {
}
, window.context_menu[o.el.id]= {
}
, this.controls=[], this.overlays=[], this.layers=[], this.singleLayers= {
}
, this.markers=[], this.polylines=[], this.routes=[], this.polygons=[], this.infoWindow=null, this.overlay_el=null, this.zoom=i.zoom, this.registered_events= {
}
, this.el.style.width=i.width||this.el.scrollWidth||this.el.offsetWidth, this.el.style.height=i.height||this.el.scrollHeight||this.el.offsetHeight, google.maps.visualRefresh=i.enableNewStyle, r=0;
    r<h.length;
    r++)delete i[h[r]];
    for(1!=i.disableDefaultUI&&(E=t(E, S)), T=t(E, i), r=0;
    r<u.length;
    r++)delete T[u[r]];
    for(r=0;
    r<c.length;
    r++)delete T[c[r]];
    this.map=new google.maps.Map(this.el, T), f&&(this.markerClusterer=f.apply(this, [this.map]));
    var M=function(t, e) {
    var n="", i=window.context_menu[o.el.id][t];
    for(var r in i)if(i.hasOwnProperty(r)) {
    var s=i[r];
    n+='<li><a id="'+t+"_"+r+'" href="#">'+s.title+"</a></li>"}
if(a("gmaps_context_menu")) {
    var u=a("gmaps_context_menu");
    u.innerHTML=n;
    var r, c=u.getElementsByTagName("a"), h=c.length;
    for(r=0;
    h>r;
    r++) {
    var d=c[r], f=function(n) {
    n.preventDefault(), i[this.id.replace(t+"_", "")].action.apply(o, [e]), o.hideContextMenu();
}
;
    google.maps.event.clearListeners(d, "click"), google.maps.event.addDomListenerOnce(d, "click", f, !1);
}
var p=l.apply(this, [o.el]), g=p[0]+e.pixel.x-15, m=p[1]+e.pixel.y-15;
    u.style.left=g+"px", u.style.top=m+"px", u.style.display="block"}
};
    this.buildContextMenu=function(t, e) {
    if("marker"===t) {
    e.pixel= {
}
;
    var n=new google.maps.OverlayView;
    n.setMap(o.map), n.draw=function() {
    var i=n.getProjection(), r=e.marker.getPosition();
    e.pixel=i.fromLatLngToContainerPixel(r), M(t, e);
}
}else M(t, e);
}, this.setContextMenu=function(t) {
    window.context_menu[o.el.id][t.control]= {
}
;
    var n, i=e.createElement("ul");
    for(n in t.options)if(t.options.hasOwnProperty(n)) {
    var r=t.options[n];
    window.context_menu[o.el.id][t.control][r.name]= {
    title: r.title, action:r.action;
}
}i.id="gmaps_context_menu", i.style.display="none", i.style.position="absolute", i.style.minWidth="100px", i.style.background="white", i.style.listStyle="none", i.style.padding="8px", i.style.boxShadow="2px 2px 6px #ccc", e.body.appendChild(i);
    var s=a("gmaps_context_menu");
    google.maps.event.addDomListener(s, "mouseout", function(t) {
    t.relatedTarget&&this.contains(t.relatedTarget)||window.setTimeout(function() {
    s.style.display="none"}
, 400);
}, !1);
}, this.hideContextMenu=function() {
    var t=a("gmaps_context_menu");
    t&&(t.style.display="none");
}
;
    var D=function(t, e) {
    google.maps.event.addListener(t, e, function(t) {
    void 0==t&&(t=this), i[e].apply(this, [t]), o.hideContextMenu();
}
);
};
    google.maps.event.addListener(this.map, "zoom_changed", this.hideContextMenu);
    for(var A=0;
    A<u.length;
    A++) {
    var N=u[A];
    N in i&&D(this.map, N);
}
for(var A=0;
    A<c.length;
    A++) {
    var N=c[A];
    N in i&&D(this.map, N);
}
google.maps.event.addListener(this.map, "rightclick", function(t) {
    i.rightclick&&i.rightclick.apply(this, [t]), void 0!=window.context_menu[o.el.id].map&&o.buildContextMenu("map", t);
}
), this.refresh=function() {
    google.maps.event.trigger(this.map, "resize");
}
, this.fitZoom=function() {
    var t, e=[], n=this.markers.length;
    for(t=0;
    n>t;
    t++)"boolean"==typeof this.markers[t].visible&&this.markers[t].visible&&e.push(this.markers[t].getPosition());
    this.fitLatLngBounds(e);
}
, this.fitLatLngBounds=function(t) {
    var e, n=t.length, i=new google.maps.LatLngBounds;
    for(e=0;
    n>e;
    e++)i.extend(t[e]);
    this.map.fitBounds(i);
}
, this.setCenter=function(t, e, n) {
    this.map.panTo(new google.maps.LatLng(t, e)), n&&n();
}
, this.getElement=function() {
    return this.el;
}
, this.zoomIn=function(t) {
    t=t||1, this.zoom=this.map.getZoom()+t, this.map.setZoom(this.zoom);
}
, this.zoomOut=function(t) {
    t=t||1, this.zoom=this.map.getZoom()-t, this.map.setZoom(this.zoom);
}
;
    var P, O=[];
    for(P in this.map)"function"!=typeof this.map[P]||this[P]||O.push(P);
    for(r=0;
    r<O.length;
    r++)!function(t, e, n) {
    t[n]=function() {
    return e[n].apply(e, arguments);
}
}(this, this.map, O[r]);
};
    return n;
}
(this);
    u.prototype.createControl=function(t) {
    var e=document.createElement("div");
    e.style.cursor="pointer", t.disableDefaultStyles!==!0&&(e.style.fontFamily="Roboto,  Arial,  sans-serif", e.style.fontSize="11px", e.style.boxShadow="rgba(0,  0,  0,  0.298039) 0px 1px 4px -1px");
    for(var n in t.style)e.style[n]=t.style[n];
    t.id&&(e.id=t.id), t.classes&&(e.className=t.classes), t.content&&("string"==typeof t.content?e.innerHTML=t.content: t.content instanceof HTMLElement&&e.appendChild(t.content)), t.position&&(e.position=google.maps.ControlPosition[t.position.toUpperCase()]);
    for(var i in t.events)!function(e, n) {
    google.maps.event.addDomListener(e, n, function() {
    t.events[n].apply(this, [this]);
}
);
}(e, i);
    return e.index=1, e;
}
, u.prototype.addControl=function(t) {
    var e=this.createControl(t);
    return this.controls.push(e), this.map.controls[e.position].push(e), e;
}
, u.prototype.removeControl=function(t) {
    var e, n=null;
    for(e=0;
    e<this.controls.length;
    e++)this.controls[e]==t&&(n=this.controls[e].position, this.controls.splice(e, 1));
    if(n)for(e=0;
    e<this.map.controls.length;
    e++) {
    var i=this.map.controls[t.position];
    if(i.getAt(e)==t) {
    i.removeAt(e);
    break;
}
}return t;
}, u.prototype.createMarker=function(e) {
    if(void 0==e.lat&&void 0==e.lng&&void 0==e.position)throw"No latitude or longitude defined.";
    var n=this, i=e.details, r=e.fences, o=e.outside, s= {
    position: new google.maps.LatLng(e.lat, e.lng), map:null;
}
, a=t(s, e);
    delete a.lat, delete a.lng, delete a.fences, delete a.outside;
    var l=new google.maps.Marker(a);
    if(l.fences=r, e.infoWindow) {
    l.infoWindow=new google.maps.InfoWindow(e.infoWindow);
    for(var u=["closeclick", "content_changed", "domready", "position_changed", "zindex_changed"], c=0;
    c<u.length;
    c++)!function(t, n) {
    e.infoWindow[n]&&google.maps.event.addListener(t, n, function(t) {
    e.infoWindow[n].apply(this, [t]);
}
);
}(l.infoWindow, u[c]);
}for(var h=["animation_changed", "clickable_changed", "cursor_changed", "draggable_changed", "flat_changed", "icon_changed", "position_changed", "shadow_changed", "shape_changed", "title_changed", "visible_changed", "zindex_changed"], d=["dblclick", "drag", "dragend", "dragstart", "mousedown", "mouseout", "mouseover", "mouseup"], c=0;
    c<h.length;
    c++)!function(t, n) {
    e[n]&&google.maps.event.addListener(t, n, function() {
    e[n].apply(this, [this]);
}
);
}(l, h[c]);
    for(var c=0;
    c<d.length;
    c++)!function(t, n, i) {
    e[i]&&google.maps.event.addListener(n, i, function(n) {
    n.pixel||(n.pixel=t.getProjection().fromLatLngToPoint(n.latLng)), e[i].apply(this, [n]);
}
);
}(this.map, l, d[c]);
    return google.maps.event.addListener(l, "click", function() {
    this.details=i, e.click&&e.click.apply(this, [this]), l.infoWindow&&(n.hideInfoWindows(), l.infoWindow.open(n.map, l));
}
), google.maps.event.addListener(l, "rightclick", function(t) {
    t.marker=this, e.rightclick&&e.rightclick.apply(this, [t]), void 0!=window.context_menu[n.el.id].marker&&n.buildContextMenu("marker", t);
}
), l.fences&&google.maps.event.addListener(l, "dragend", function() {
    n.checkMarkerGeofence(l, function(t, e) {
    o(t, e);
}
);
}), l;
}, u.prototype.addMarker=function(t) {
    var e;
    if(t.hasOwnProperty("gm_accessors_"))e=t;
    else {
    if(!(t.hasOwnProperty("lat")&&t.hasOwnProperty("lng")||t.position))throw"No latitude or longitude defined.";
    e=this.createMarker(t);
}
return e.setMap(this.map), this.markerClusterer&&this.markerClusterer.addMarker(e), this.markers.push(e), u.fire("marker_added", e, this), e;
}, u.prototype.addMarkers=function(t) {
    for(var e, n=0;
    e=t[n];
    n++)this.addMarker(e);
    return this.markers;
}
, u.prototype.hideInfoWindows=function() {
    for(var t, e=0;
    t=this.markers[e];
    e++)t.infoWindow&&t.infoWindow.close();
}
, u.prototype.removeMarker=function(t) {
    for(var e=0;
    e<this.markers.length;
    e++)if(this.markers[e]===t) {
    this.markers[e].setMap(null), this.markers.splice(e, 1), this.markerClusterer&&this.markerClusterer.removeMarker(t), u.fire("marker_removed", t, this);
    break;
}
return t;
}, u.prototype.removeMarkers=function(t) {
    var e=[];
    if("undefined"==typeof t) {
    for(var n=0;
    n<this.markers.length;
    n++) {
    var i=this.markers[n];
    i.setMap(null), this.markerClusterer&&this.markerClusterer.removeMarker(i), u.fire("marker_removed", i, this);
}
this.markers=e;
}else {
    for(var n=0;
    n<t.length;
    n++) {
    var r=this.markers.indexOf(t[n]);
    if(r>-1) {
    var i=this.markers[r];
    i.setMap(null), this.markerClusterer&&this.markerClusterer.removeMarker(i), u.fire("marker_removed", i, this);
}
}for(var n=0;
    n<this.markers.length;
    n++) {
    var i=this.markers[n];
    null!=i.getMap()&&e.push(i);
}
this.markers=e;
}}, u.prototype.drawOverlay=function(t) {
    var e=new google.maps.OverlayView, n=!0;
    return e.setMap(this.map), null!=t.auto_show&&(n=t.auto_show), e.onAdd=function() {
    var n=document.createElement("div");
    n.style.borderStyle="none", n.style.borderWidth="0px", n.style.position="absolute", n.style.zIndex=100, n.innerHTML=t.content, e.el=n, t.layer||(t.layer="overlayLayer");
    var i=this.getPanes(), r=i[t.layer], o=["contextmenu", "DOMMouseScroll", "dblclick", "mousedown"];
    r.appendChild(n);
    for(var s=0;
    s<o.length;
    s++)!function(t, e) {
    google.maps.event.addDomListener(t, e, function(t) {
    -1!=navigator.userAgent.toLowerCase().indexOf("msie")&&document.all?(t.cancelBubble=!0, t.returnValue=!1): t.stopPropagation();
}
);
}(n, o[s]);
    t.click&&(i.overlayMouseTarget.appendChild(e.el), google.maps.event.addDomListener(e.el, "click", function() {
    t.click.apply(e, [e]);
}
)), google.maps.event.trigger(this, "ready");
}, e.draw=function() {
    var i=this.getProjection(), r=i.fromLatLngToDivPixel(new google.maps.LatLng(t.lat, t.lng));
    t.horizontalOffset=t.horizontalOffset||0, t.verticalOffset=t.verticalOffset||0;
    var o=e.el, s=o.children[0], a=s.clientHeight, l=s.clientWidth;
    switch(t.verticalAlign) {
    case"top": o.style.top=r.y-a+t.verticalOffset+"px";
    break;
    default: case"middle":o.style.top=r.y-a/2+t.verticalOffset+"px";
    break;
    case"bottom": o.style.top=r.y+t.verticalOffset+"px"}
switch(t.horizontalAlign) {
    case"left": o.style.left=r.x-l+t.horizontalOffset+"px";
    break;
    default: case"center":o.style.left=r.x-l/2+t.horizontalOffset+"px";
    break;
    case"right": o.style.left=r.x+t.horizontalOffset+"px"}
o.style.display=n?"block":"none", n||t.show.apply(this, [o]);
}, e.onRemove=function() {
    var n=e.el;
    t.remove?t.remove.apply(this, [n]): (e.el.parentNode.removeChild(e.el), e.el=null);
}
, this.overlays.push(e), e;
}, u.prototype.removeOverlay=function(t) {
    for(var e=0;
    e<this.overlays.length;
    e++)if(this.overlays[e]===t) {
    this.overlays[e].setMap(null), this.overlays.splice(e, 1);
    break;
}
}, u.prototype.removeOverlays=function() {
    for(var t, e=0;
    t=this.overlays[e];
    e++)t.setMap(null);
    this.overlays=[];
}
, u.prototype.drawPolyline=function(t) {
    var e=[], n=t.path;
    if(n.length)if(void 0===n[0][0])e=n;
    else for(var i, r=0;
    i=n[r];
    r++)e.push(new google.maps.LatLng(i[0], i[1]));
    var o= {
    map: this.map, path:e, strokeColor:t.strokeColor, strokeOpacity:t.strokeOpacity, strokeWeight:t.strokeWeight, geodesic:t.geodesic, clickable:!0, editable:!1, visible:!0;
}
;
    t.hasOwnProperty("clickable")&&(o.clickable=t.clickable), t.hasOwnProperty("editable")&&(o.editable=t.editable), t.hasOwnProperty("icons")&&(o.icons=t.icons), t.hasOwnProperty("zIndex")&&(o.zIndex=t.zIndex);
    for(var s=new google.maps.Polyline(o), a=["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l=0;
    l<a.length;
    l++)!function(e, n) {
    t[n]&&google.maps.event.addListener(e, n, function(e) {
    t[n].apply(this, [e]);
}
);
}(s, a[l]);
    return this.polylines.push(s), u.fire("polyline_added", s, this), s;
}
, u.prototype.removePolyline=function(t) {
    for(var e=0;
    e<this.polylines.length;
    e++)if(this.polylines[e]===t) {
    this.polylines[e].setMap(null), this.polylines.splice(e, 1), u.fire("polyline_removed", t, this);
    break;
}
}, u.prototype.removePolylines=function() {
    for(var t, e=0;
    t=this.polylines[e];
    e++)t.setMap(null);
    this.polylines=[];
}
, u.prototype.drawCircle=function(e) {
    e=t( {
    map: this.map, center:new google.maps.LatLng(e.lat, e.lng);
}
, e), delete e.lat, delete e.lng;
    for(var n=new google.maps.Circle(e), i=["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], r=0;
    r<i.length;
    r++)!function(t, n) {
    e[n]&&google.maps.event.addListener(t, n, function(t) {
    e[n].apply(this, [t]);
}
);
}(n, i[r]);
    return this.polygons.push(n), n;
}
, u.prototype.drawRectangle=function(e) {
    e=t( {
    map: this.map;
}
, e);
    var n=new google.maps.LatLngBounds(new google.maps.LatLng(e.bounds[0][0], e.bounds[0][1]), new google.maps.LatLng(e.bounds[1][0], e.bounds[1][1]));
    e.bounds=n;
    for(var i=new google.maps.Rectangle(e), r=["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], o=0;
    o<r.length;
    o++)!function(t, n) {
    e[n]&&google.maps.event.addListener(t, n, function(t) {
    e[n].apply(this, [t]);
}
);
}(i, r[o]);
    return this.polygons.push(i), i;
}
, u.prototype.drawPolygon=function(e) {
    var r=!1;
    e.hasOwnProperty("useGeoJSON")&&(r=e.useGeoJSON), delete e.useGeoJSON, e=t( {
    map: this.map;
}
, e), 0==r&&(e.paths=[e.paths.slice(0)]), e.paths.length>0&&e.paths[0].length>0&&(e.paths=i(n(e.paths, o, r)));
    for(var s=new google.maps.Polygon(e), a=["click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "rightclick"], l=0;
    l<a.length;
    l++)!function(t, n) {
    e[n]&&google.maps.event.addListener(t, n, function(t) {
    e[n].apply(this, [t]);
}
);
}(s, a[l]);
    return this.polygons.push(s), u.fire("polygon_added", s, this), s;
}
, u.prototype.removePolygon=function(t) {
    for(var e=0;
    e<this.polygons.length;
    e++)if(this.polygons[e]===t) {
    this.polygons[e].setMap(null), this.polygons.splice(e, 1), u.fire("polygon_removed", t, this);
    break;
}
}, u.prototype.removePolygons=function() {
    for(var t, e=0;
    t=this.polygons[e];
    e++)t.setMap(null);
    this.polygons=[];
}
, u.prototype.getFromFusionTables=function(t) {
    var e=t.events;
    delete t.events;
    var n=t, i=new google.maps.FusionTablesLayer(n);
    for(var r in e)!function(t, n) {
    google.maps.event.addListener(t, n, function(t) {
    e[n].apply(this, [t]);
}
);
}(i, r);
    return this.layers.push(i), i;
}
, u.prototype.loadFromFusionTables=function(t) {
    var e=this.getFromFusionTables(t);
    return e.setMap(this.map), e;
}
, u.prototype.getFromKML=function(t) {
    var e=t.url, n=t.events;
    delete t.url, delete t.events;
    var i=t, r=new google.maps.KmlLayer(e, i);
    for(var o in n)!function(t, e) {
    google.maps.event.addListener(t, e, function(t) {
    n[e].apply(this, [t]);
}
);
}(r, o);
    return this.layers.push(r), r;
}
, u.prototype.loadFromKML=function(t) {
    var e=this.getFromKML(t);
    return e.setMap(this.map), e;
}
, u.prototype.addLayer=function(t, e) {
    e=e|| {
}
;
    var n;
    switch(t) {
    case"weather": this.singleLayers.weather=n=new google.maps.weather.WeatherLayer;
    break;
    case"clouds": this.singleLayers.clouds=n=new google.maps.weather.CloudLayer;
    break;
    case"traffic": this.singleLayers.traffic=n=new google.maps.TrafficLayer;
    break;
    case"transit": this.singleLayers.transit=n=new google.maps.TransitLayer;
    break;
    case"bicycling": this.singleLayers.bicycling=n=new google.maps.BicyclingLayer;
    break;
    case"panoramio": this.singleLayers.panoramio=n=new google.maps.panoramio.PanoramioLayer, n.setTag(e.filter), delete e.filter, e.click&&google.maps.event.addListener(n, "click", function(t) {
    e.click(t), delete e.click;
}
);
    break;
    case"places": if(this.singleLayers.places=n=new google.maps.places.PlacesService(this.map), e.search||e.nearbySearch||e.radarSearch) {
    var i= {
    bounds: e.bounds||null, keyword:e.keyword||null, location:e.location||null, name:e.name||null, radius:e.radius||null, rankBy:e.rankBy||null, types:e.types||null;
}
;
    e.radarSearch&&n.radarSearch(i, e.radarSearch), e.search&&n.search(i, e.search), e.nearbySearch&&n.nearbySearch(i, e.nearbySearch);
}
if(e.textSearch) {
    var r= {
    bounds: e.bounds||null, location:e.location||null, query:e.query||null, radius:e.radius||null;
}
;
    n.textSearch(r, e.textSearch);
}
}return void 0!==n?("function"==typeof n.setOptions&&n.setOptions(e), "function"==typeof n.setMap&&n.setMap(this.map), n): void 0;
}, u.prototype.removeLayer=function(t) {
    if("string"==typeof t&&void 0!==this.singleLayers[t])this.singleLayers[t].setMap(null), delete this.singleLayers[t];
    else for(var e=0;
    e<this.layers.length;
    e++)if(this.layers[e]===t) {
    this.layers[e].setMap(null), this.layers.splice(e, 1);
    break;
}
};
    var c, h;
    return u.prototype.getRoutes=function(e) {
    switch(e.travelMode) {
    case"bicycling": c=google.maps.TravelMode.BICYCLING;
    break;
    case"transit": c=google.maps.TravelMode.TRANSIT;
    break;
    case"driving": c=google.maps.TravelMode.DRIVING;
    break;
    default: c=google.maps.TravelMode.WALKING;
}
h="imperial"===e.unitSystem?google.maps.UnitSystem.IMPERIAL:google.maps.UnitSystem.METRIC;
    var n= {
    avoidHighways: !1, avoidTolls:!1, optimizeWaypoints:!1, waypoints:[];
}
, i=t(n, e);
    i.origin=/string/.test(typeof e.origin)?e.origin: new google.maps.LatLng(e.origin[0], e.origin[1]), i.destination=/string/.test(typeof e.destination)?e.destination:new google.maps.LatLng(e.destination[0], e.destination[1]), i.travelMode=c, i.unitSystem=h, delete i.callback, delete i.error;
    var r=this, o=new google.maps.DirectionsService;
    o.route(i, function(t, n) {
    if(n===google.maps.DirectionsStatus.OK) {
    for(var i in t.routes)t.routes.hasOwnProperty(i)&&r.routes.push(t.routes[i]);
    e.callback&&e.callback(r.routes);
}
else e.error&&e.error(t, n);
});
}, u.prototype.removeRoutes=function() {
    this.routes=[];
}
, u.prototype.getElevations=function(e) {
    e=t( {
    locations: [], path:!1, samples:256;
}
, e), e.locations.length>0&&e.locations[0].length>0&&(e.locations=i(n([e.locations], o, !1)));
    var r=e.callback;
    delete e.callback;
    var s=new google.maps.ElevationService;
    if(e.path) {
    var a= {
    path: e.locations, samples:e.samples;
}
;
    s.getElevationAlongPath(a, function(t, e) {
    r&&"function"==typeof r&&r(t, e);
}
);
}else delete e.path, delete e.samples, s.getElevationForLocations(e, function(t, e) {
    r&&"function"==typeof r&&r(t, e);
}
);
}, u.prototype.cleanRoute=u.prototype.removePolylines, u.prototype.drawRoute=function(t) {
    var e=this;
    this.getRoutes( {
    origin: t.origin, destination:t.destination, travelMode:t.travelMode, waypoints:t.waypoints, unitSystem:t.unitSystem, error:t.error, callback:function(n) {
    if(n.length>0) {
    var i= {
    path: n[n.length-1].overview_path, strokeColor:t.strokeColor, strokeOpacity:t.strokeOpacity, strokeWeight:t.strokeWeight;
}
;
    t.hasOwnProperty("icons")&&(i.icons=t.icons), e.drawPolyline(i), t.callback&&t.callback(n[n.length-1]);
}
}});
}, u.prototype.travelRoute=function(t) {
    if(t.origin&&t.destination)this.getRoutes( {
    origin: t.origin, destination:t.destination, travelMode:t.travelMode, waypoints:t.waypoints, unitSystem:t.unitSystem, error:t.error, callback:function(e) {
    if(e.length>0&&t.start&&t.start(e[e.length-1]), e.length>0&&t.step) {
    var n=e[e.length-1];
    if(n.legs.length>0)for(var i, r=n.legs[0].steps, o=0;
    i=r[o];
    o++)i.step_number=o, t.step(i, n.legs[0].steps.length-1);
}
e.length>0&&t.end&&t.end(e[e.length-1]);
}});
    else if(t.route&&t.route.legs.length>0)for(var e, n=t.route.legs[0].steps, i=0;
    e=n[i];
    i++)e.step_number=i, t.step(e);
}
, u.prototype.drawSteppedRoute=function(t) {
    var e=this;
    if(t.origin&&t.destination)this.getRoutes( {
    origin: t.origin, destination:t.destination, travelMode:t.travelMode, waypoints:t.waypoints, error:t.error, callback:function(n) {
    if(n.length>0&&t.start&&t.start(n[n.length-1]), n.length>0&&t.step) {
    var i=n[n.length-1];
    if(i.legs.length>0)for(var r, o=i.legs[0].steps, s=0;
    r=o[s];
    s++) {
    r.step_number=s;
    var a= {
    path: r.path, strokeColor:t.strokeColor, strokeOpacity:t.strokeOpacity, strokeWeight:t.strokeWeight;
}
;
    t.hasOwnProperty("icons")&&(a.icons=t.icons), e.drawPolyline(a), t.step(r, i.legs[0].steps.length-1);
}
}n.length>0&&t.end&&t.end(n[n.length-1]);
}});
    else if(t.route&&t.route.legs.length>0)for(var n, i=t.route.legs[0].steps, r=0;
    n=i[r];
    r++) {
    n.step_number=r;
    var o= {
    path: n.path, strokeColor:t.strokeColor, strokeOpacity:t.strokeOpacity, strokeWeight:t.strokeWeight;
}
;
    t.hasOwnProperty("icons")&&(o.icons=t.icons), e.drawPolyline(o), t.step(n);
}
}, u.Route=function(t) {
    this.origin=t.origin, this.destination=t.destination, this.waypoints=t.waypoints, this.map=t.map, this.route=t.route, this.step_count=0, this.steps=this.route.legs[0].steps, this.steps_length=this.steps.length;
    var e= {
    path: new google.maps.MVCArray, strokeColor:t.strokeColor, strokeOpacity:t.strokeOpacity, strokeWeight:t.strokeWeight;
}
;
    t.hasOwnProperty("icons")&&(e.icons=t.icons), this.polyline=this.map.drawPolyline(e).getPath();
}
, u.Route.prototype.getRoute=function(t) {
    var n=this;
    this.map.getRoutes( {
    origin: this.origin, destination:this.destination, travelMode:t.travelMode, waypoints:this.waypoints||[], error:t.error, callback:function() {
    n.route=e[0], t.callback&&t.callback.call(n);
}
});
}, u.Route.prototype.back=function() {
    if(this.step_count>0) {
    this.step_count--;
    var t=this.route.legs[0].steps[this.step_count].path;
    for(var e in t)t.hasOwnProperty(e)&&this.polyline.pop();
}
}, u.Route.prototype.forward=function() {
    if(this.step_count<this.steps_length) {
    var t=this.route.legs[0].steps[this.step_count].path;
    for(var e in t)t.hasOwnProperty(e)&&this.polyline.push(t[e]);
    this.step_count++}
}, u.prototype.checkGeofence=function(t, e, n) {
    return n.containsLatLng(new google.maps.LatLng(t, e));
}
, u.prototype.checkMarkerGeofence=function(t, e) {
    if(t.fences)for(var n, i=0;
    n=t.fences[i];
    i++) {
    var r=t.getPosition();
    this.checkGeofence(r.lat(), r.lng(), n)||e(t, n);
}
}, u.prototype.toImage=function(t) {
    var t=t|| {
}
, e= {
}
;
    if(e.size=t.size||[this.el.clientWidth, this.el.clientHeight], e.lat=this.getCenter().lat(), e.lng=this.getCenter().lng(), this.markers.length>0) {
    e.markers=[];
    for(var n=0;
    n<this.markers.length;
    n++)e.markers.push( {
    lat: this.markers[n].getPosition().lat(), lng:this.markers[n].getPosition().lng();
}
);
}if(this.polylines.length>0) {
    var i=this.polylines[0];
    e.polyline= {
}
, e.polyline.path=google.maps.geometry.encoding.encodePath(i.getPath()), e.polyline.strokeColor=i.strokeColor, e.polyline.strokeOpacity=i.strokeOpacity, e.polyline.strokeWeight=i.strokeWeight;
}
return u.staticMapURL(e);
}, u.staticMapURL=function(t) {
    function e(t, e) {
    if("#"===t[0]&&(t=t.replace("#", "0x"), e)) {
    if(e=parseFloat(e), e=Math.min(1, Math.max(e, 0)), 0===e)return"0x00000000";
    e=(255*e).toString(16), 1===e.length&&(e+=e), t=t.slice(0, 8)+e;
}
return t;
}var n, i=[], r=("file: "===location.protocol?"http:":location.protocol)+"//maps.googleapis.com/maps/api/staticmap";
    t.url&&(r=t.url, delete t.url), r+="?";
    var o=t.markers;
    delete t.markers, !o&&t.marker&&(o=[t.marker], delete t.marker);
    var s=t.styles;
    delete t.styles;
    var a=t.polyline;
    if(delete t.polyline, t.center)i.push("center="+t.center), delete t.center;
    else if(t.address)i.push("center="+t.address), delete t.address;
    else if(t.lat)i.push(["center=", t.lat, ", ", t.lng].join("")), delete t.lat, delete t.lng;
    else if(t.visible) {
    var l=encodeURI(t.visible.join("|"));
    i.push("visible="+l);
}
var u=t.size;
    u?(u.join&&(u=u.join("x")), delete t.size): u="630x300", i.push("size="+u), t.zoom||t.zoom===!1||(t.zoom=15);
    var c=t.hasOwnProperty("sensor")?!!t.sensor: !0;
    delete t.sensor, i.push("sensor="+c);
    for(var h in t)t.hasOwnProperty(h)&&i.push(h+"="+t[h]);
    if(o)for(var d, f, p=0;
    n=o[p];
    p++) {
    d=[], n.size&&"normal"!==n.size?(d.push("size: "+n.size), delete n.size):n.icon&&(d.push("icon:"+encodeURI(n.icon)), delete n.icon), n.color&&(d.push("color:"+n.color.replace("#", "0x")), delete n.color), n.label&&(d.push("label:"+n.label[0].toUpperCase()), delete n.label), f=n.address?n.address:n.lat+", "+n.lng, delete n.address, delete n.lat, delete n.lng;
    for(var h in n)n.hasOwnProperty(h)&&d.push(h+": "+n[h]);
    d.length||0===p?(d.push(f), d=d.join("|"), i.push("markers="+encodeURI(d))): (d=i.pop()+encodeURI("|"+f), i.push(d));
}
if(s)for(var p=0;
    p<s.length;
    p++) {
    var g=[];
    s[p].featureType&&g.push("feature: "+s[p].featureType.toLowerCase()), s[p].elementType&&g.push("element:"+s[p].elementType.toLowerCase());
    for(var m=0;
    m<s[p].stylers.length;
    m++)for(var v in s[p].stylers[m]) {
    var y=s[p].stylers[m][v];
    ("hue"==v||"color"==v)&&(y="0x"+y.substring(1)), g.push(v+": "+y);
}
var b=g.join("|");
    ""!=b&&i.push("style="+b);
}
if(a) {
    if(n=a, a=[], n.strokeWeight&&a.push("weight: "+parseInt(n.strokeWeight, 10)), n.strokeColor) {
    var w=e(n.strokeColor, n.strokeOpacity);
    a.push("color: "+w);
}
if(n.fillColor) {
    var x=e(n.fillColor, n.fillOpacity);
    a.push("fillcolor: "+x);
}
var _=n.path;
    if(_.join)for(var k, m=0;
    k=_[m];
    m++)a.push(k.join(", "));
    else a.push("enc: "+_);
    a=a.join("|"), i.push("path="+encodeURI(a));
}
var C=window.devicePixelRatio||1;
    return i.push("scale="+C), i=i.join("&"), r+i;
}
, u.prototype.addMapType=function(t, e) {
    if(!e.hasOwnProperty("getTileUrl")||"function"!=typeof e.getTileUrl)throw"'getTileUrl' function required.";
    e.tileSize=e.tileSize||new google.maps.Size(256, 256);
    var n=new google.maps.ImageMapType(e);
    this.map.mapTypes.set(t, n);
}
, u.prototype.addOverlayMapType=function(t) {
    if(!t.hasOwnProperty("getTile")||"function"!=typeof t.getTile)throw"'getTile' function required.";
    var e=t.index;
    delete t.index, this.map.overlayMapTypes.insertAt(e, t);
}
, u.prototype.removeOverlayMapType=function(t) {
    this.map.overlayMapTypes.removeAt(t);
}
, u.prototype.addStyle=function(t) {
    var e=new google.maps.StyledMapType(t.styles,  {
    name: t.styledMapName;
}
);
    this.map.mapTypes.set(t.mapTypeId, e);
}
, u.prototype.setStyle=function(t) {
    this.map.setMapTypeId(t);
}
, u.prototype.createPanorama=function(t) {
    return t.hasOwnProperty("lat")&&t.hasOwnProperty("lng")||(t.lat=this.getCenter().lat(), t.lng=this.getCenter().lng()), this.panorama=u.createPanorama(t), this.map.setStreetView(this.panorama), this.panorama;
}
, u.createPanorama=function(e) {
    var n=a(e.el, e.context);
    e.position=new google.maps.LatLng(e.lat, e.lng), delete e.el, delete e.context, delete e.lat, delete e.lng;
    for(var i=["closeclick", "links_changed", "pano_changed", "position_changed", "pov_changed", "resize", "visible_changed"], r=t( {
    visible: !0;
}
, e), o=0;
    o<i.length;
    o++)delete r[i[o]];
    for(var s=new google.maps.StreetViewPanorama(n, r), o=0;
    o<i.length;
    o++)!function(t, n) {
    e[n]&&google.maps.event.addListener(t, n, function() {
    e[n].apply(this);
}
);
}(s, i[o]);
    return s;
}
, u.prototype.on=function(t, e) {
    return u.on(t, this, e);
}
, u.prototype.off=function(t) {
    u.off(t, this);
}
, u.custom_events=["marker_added", "marker_removed", "polyline_added", "polyline_removed", "polygon_added", "polygon_removed", "geolocated", "geolocation_failed"], u.on=function(t, e, n) {
    if(-1==u.custom_events.indexOf(t))return e instanceof u&&(e=e.map), google.maps.event.addListener(e, t, n);
    var i= {
    handler: n, eventName:t;
}
;
    return e.registered_events[t]=e.registered_events[t]||[], e.registered_events[t].push(i), i;
}
, u.off=function(t, e) {
    -1==u.custom_events.indexOf(t)?(e instanceof u&&(e=e.map), google.maps.event.clearListeners(e, t)): e.registered_events[t]=[];
}
, u.fire=function(t, e, n) {
    if(-1==u.custom_events.indexOf(t))google.maps.event.trigger(e, t, Array.prototype.slice.apply(arguments).slice(2));
    else if(t in n.registered_events)for(var i=n.registered_events[t], r=0;
    r<i.length;
    r++)!function(t, e, n) {
    t.apply(e, [n]);
}
(i[r].handler, n, e);
}, u.geolocate=function(t) {
    var e=t.always||t.complete;
    navigator.geolocation?navigator.geolocation.getCurrentPosition(function(n) {
    t.success(n), e&&e();
}
, function(n) {
    t.error(n), e&&e();
}
, t.options): (t.not_supported(), e&&e());
}, u.geocode=function(t) {
    this.geocoder=new google.maps.Geocoder;
    var e=t.callback;
    t.hasOwnProperty("lat")&&t.hasOwnProperty("lng")&&(t.latLng=new google.maps.LatLng(t.lat, t.lng)), delete t.lat, delete t.lng, delete t.callback, this.geocoder.geocode(t, function(t, n) {
    e(t, n);
}
);
}, google.maps.Polygon.prototype.getBounds||(google.maps.Polygon.prototype.getBounds=function() {
    for(var t, e=new google.maps.LatLngBounds, n=this.getPaths(), i=0;
    i<n.getLength();
    i++) {
    t=n.getAt(i);
    for(var r=0;
    r<t.getLength();
    r++)e.extend(t.getAt(r));
}
return e;
}), google.maps.Polygon.prototype.containsLatLng||(google.maps.Polygon.prototype.containsLatLng=function(t) {
    var e=this.getBounds();
    if(null!==e&&!e.contains(t))return!1;
    for(var n=!1, i=this.getPaths().getLength(), r=0;
    i>r;
    r++)for(var o=this.getPaths().getAt(r), s=o.getLength(), a=s-1, l=0;
    s>l;
    l++) {
    var u=o.getAt(l), c=o.getAt(a);
    (u.lng()<t.lng()&&c.lng()>=t.lng()||c.lng()<t.lng()&&u.lng()>=t.lng())&&u.lat()+(t.lng()-u.lng())/(c.lng()-u.lng())*(c.lat()-u.lat())<t.lat()&&(n=!n), a=l;
}
return n;
}), google.maps.Circle.prototype.containsLatLng||(google.maps.Circle.prototype.containsLatLng=function(t) {
    return google.maps.geometry?google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), t)<=this.getRadius(): !0;
}
), google.maps.LatLngBounds.prototype.containsLatLng=function(t) {
    return this.contains(t);
}
, google.maps.Marker.prototype.setFences=function(t) {
    this.fences=t;
}
, google.maps.Marker.prototype.addFence=function(t) {
    this.fences.push(t);
}
, google.maps.Marker.prototype.getId=function() {
    return this.__gm_id;
}
, Array.prototype.indexOf||(Array.prototype.indexOf=function(t) {
    "use strict";
    if(null==this)throw new TypeError;
    var e=Object(this), n=e.length>>>0;
    if(0===n)return-1;
    var i=0;
    if(arguments.length>1&&(i=Number(arguments[1]), i!=i?i=0: 0!=i&&1/0!=i&&i!=-1/0&&(i=(i>0||-1)*Math.floor(Math.abs(i)))), i>=n)return-1;
    for(var r=i>=0?i: Math.max(n-Math.abs(i), 0);
    n>r;
    r++)if(r in e&&e[r]===t)return r;
    return-1;
}
), u;
}), function() {
    window.waitForFinalEvent=function() {
    var t;
    return t= {
}
, function(e, n, i) {
    i||(i="Don't call this twice without a uniqueId"), t[i]&&clearTimeout(t[i]), t[i]=setTimeout(e, n);
}
}();
}.call(this), function() {
    var t, e;
    e=function(t) {
    var e;
    return e=/^([\w-]+(?: \.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-] {
    0, 66;
}
)\.([a-z] {
    2, 6;
}
(?: \.[a-z] {
    2;
}
)?)$/i, e.test(t);
}, t=function() {
    var t, n;
    return t=$("#new_contact"), n=!0, $("input.required").each(function() {
    return""===$(this).val()?(n=!1, $(this).addClass("deny"), $(".error").show()): $(this).removeClass("deny");
}
), e($("#contact_email").val())?$("#contact_email").removeClass("deny"):(n=!1, $("#contact_email").addClass("deny"), $(".error").show()), $("textarea").each(function() {
    return""===$(this).val()?(n=!1, $(this).addClass("deny"), $(".error").show()): $(this).removeClass("deny");
}
), n===!0?($(".error").hide(), $(".form-loader").show(), $("#new_contact").submit()):void 0;
}, jQuery(function() {
    return $(".error").hide(), $(".form-loader").hide(), $(".success").hide(), $("#submit").click(function() {
    return t();
}
);
});
}.call(this), function() {
}
.call(this), function() {
    var t, e, n, i;
    n=function() {
    window.addEventListener("scroll", function() {
    var t, e, n, i, r;
    n=window.pageYOffset||document.documentElement.scrollTop, r=150, e=$("#router"), n>r?e.hasClass("smaller")||e.addClass("smaller"): e.hasClass("smaller")&&e.removeClass("smaller"), i=50, t=$("#mobile-trigger"), n>i?t.hasClass("top")||t.addClass("top"):t.hasClass("top")&&t.removeClass("top");
}
);
}, t=function() {
    var t, e;
    return $("nav a").click(function() {
    return $("nav ul.roots li").removeClass("active"), $(this).closest("li").addClass("active");
}
), e=window.location.pathname.split("/")[1], t=$("nav a[href='/"+e+"']").parent(), t.hasClass("active")||$(".ignore-nav")[0]?void 0: ($("nav ul.roots li").removeClass("active"), t.addClass("active"));
}, e=function() {
    var t, e, n, i, r, o;
    return e=void 0, r=void 0, o=void 0, i=$("#router nav"), t=$("#router nav li.active"), 0===$("#magic-line").length&&i.append("<li id='magic-line'></li>"), 0===$("ul.roots").find(".active").length?$("#magic-line").remove(): (n=$("#magic-line"), $(window).width()>991?n.width(t.width()).css("left", t.position().left):n.css("left", t.position().left).width(t.width()), $("#router nav li a").on("click touchstart", function() {
    var t;
    e=$(this), r=e.position().left, o=e.parent().width(), t=e.position().top, n.stop().animate($(window).width()>991? {
    left: r, width:o;
}
: {
    top: t;
}
);
}));
}, i=function(t) {
    var e;
    return null==t&&(t=!0), e=$("#router nav"), e.hasClass("show")||!t?(e.removeClass("show"), $("#darkener").fadeOut(), $("#mobile-trigger").removeClass("active")): (e.addClass("show"), $("#darkener").fadeIn(), $("#mobile-trigger").addClass("active"))
}
, window.mobile_trigger_init=!1, document.addEventListener("page:change", function() {
    return window.mobile_trigger_init===!1?(window.mobile_trigger_init=!0, $("#mobile-trigger").on("touchstart click", function() {
    return i(), !1;
}
), $("nav,  #darkener,  ul.roots").on("touchstart click", function(t) {
    return t.target===this?(i(), !1): void 0;
}
)):void 0;
}), document.addEventListener("page:fetch", function() {
    return i(!1);
}
), jQuery(function() {
    return n(), t(), window.waitForFinalEvent(function() {
    return e();
}
, 100, "nav-line-init"), $(window).resize(function() {
    return window.waitForFinalEvent(function() {
    return e();
}
, 100, "nav-resize");
}), i(!1);
});
}.call(this), function() {
    var t, e;
    t=function() {
    return $("#content").hide(), $("#content").fadeIn(), $("footer").hide(), $("footer").fadeIn();
}
, e=function() {
    return $("#content").fadeOut(), $("footer").fadeOut();
}
, jQuery(function() {
    return window.submenu=!1, $(".nav-loader").hide(), $("nav a").click(function() {
    return $(".nav-loader").show(), document.addEventListener("page: change", t), document.addEventListener("page:fetch", e);
}
), $(".submenu a").click(function() {
    return $(".nav-loader").hide(), $(this).closest("ul").hasClass("scroll-stick")?(window.submenu=!0, document.removeEventListener("page: change", t), document.removeEventListener("page:fetch", e)):(document.addEventListener("page:change", t), document.addEventListener("page:fetch", e));
}
), $(document).on("page:fetch", function() {
    return window.submenu===!0?(window.prevPageYOffset=window.pageYOffset, window.prevPageXOffset=window.pageXOffset): (window.prevPageYOffset=0, window.prevPageXOffset=0);
}
);
}), $(document).on("page:load", function() {
    return $(".fix-scroll").length>0&&($(".fix-scroll").hide().show(), 0!==window.prevPageYOffset)?window.scrollTo(window.prevPageXOffset, window.prevPageYOffset): void 0;
}
);
}.call(this), function() {
    this.GoogleAnalytics=function() {
    function t() {
}
return t.load=function() {
    var e, n;
    return window._gaq=[], window._gaq.push(["_setAccount", t.analyticsId()]), n=document.createElement("script"), n.type="text/javascript", n.async=!0, n.src=("https: "===document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js", e=document.getElementsByTagName("script")[0], e.parentNode.insertBefore(n, e), "undefined"!=typeof Turbolinks&&Turbolinks.supported?document.addEventListener("page:change", function() {
    return t.trackPageview();
}
, !0): t.trackPageview();
}, t.trackPageview=function(e) {
    return t.isLocalRequest()?void 0: (window._gaq.push(e?["_trackPageview", e]:["_trackPageview"]), window._gaq.push(["_trackPageLoadTime"]));
}
, t.isLocalRequest=function() {
    return t.documentDomainIncludes("local");
}
, t.documentDomainIncludes=function(t) {
    return-1!==document.domain.indexOf(t);
}
, t.analyticsId=function() {
    return"UA-64229105-1"}
, t;
}(), GoogleAnalytics.load();
}.call(this), !function() {
    function t(t) {
    return t&&(t.ownerDocument||t.document||t).documentElement;
}
function e(t) {
    return t&&(t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView);
}
function n(t, e) {
    return e>t?-1: t>e?1:t>=e?0:0/0;
}
function i(t) {
    return null===t?0/0: +t;
}
function r(t) {
    return!isNaN(t);
}
function o(t) {
    return {
    left: function(e, n, i, r) {
    for(arguments.length<3&&(i=0), arguments.length<4&&(r=e.length);
    r>i;
    ) {
    var o=i+r>>>1;
    t(e[o], n)<0?i=o+1: r=o;
}
return i;
}, right:function(e, n, i, r) {
    for(arguments.length<3&&(i=0), arguments.length<4&&(r=e.length);
    r>i;
    ) {
    var o=i+r>>>1;
    t(e[o], n)>0?r=o: i=o+1;
}
return i;
}}}function s(t) {
    return t.length;
}
function a(t) {
    for(var e=1;
    t*e%1;
    )e*=10;
    return e;
}
function l(t, e) {
    for(var n in e)Object.defineProperty(t.prototype, n,  {
    value: e[n], enumerable:!1;
}
);
}function u() {
    this._=Object.create(null);
}
function c(t) {
    return(t+="")===xa||t[0]===_a?_a+t: t;
}
function h(t) {
    return(t+="")[0]===_a?t.slice(1): t;
}
function d(t) {
    return c(t)in this._;
}
function f(t) {
    return(t=c(t))in this._&&delete this._[t];
}
function p() {
    var t=[];
    for(var e in this._)t.push(h(e));
    return t;
}
function g() {
    var t=0;
    for(var e in this._)++t;
    return t;
}
function m() {
    for(var t in this._)return!1;
    return!0;
}
function v() {
    this._=Object.create(null);
}
function y(t) {
    return t;
}
function b(t, e, n) {
    return function() {
    var i=n.apply(e, arguments);
    return i===e?t: i;
}
}function w(t, e) {
    if(e in t)return e;
    e=e.charAt(0).toUpperCase()+e.slice(1);
    for(var n=0, i=ka.length;
    i>n;
    ++n) {
    var r=ka[n]+e;
    if(r in t)return r;
}
}function x() {
}
function _() {
}
function k(t) {
    function e() {
    for(var e, i=n, r=-1, o=i.length;
    ++r<o;
    )(e=i[r].on)&&e.apply(this, arguments);
    return t;
}
var n=[], i=new u;
    return e.on=function(e, r) {
    var o, s=i.get(e);
    return arguments.length<2?s&&s.on: (s&&(s.on=null, n=n.slice(0, o=n.indexOf(s)).concat(n.slice(o+1)), i.remove(e)), r&&n.push(i.set(e,  {
    on: r;
}
)), t);
}, e;
}function C() {
    la.event.preventDefault();
}
function T() {
    for(var t, e=la.event;
    t=e.sourceEvent;
    )e=t;
    return e;
}
function E(t) {
    for(var e=new _, n=0, i=arguments.length;
    ++n<i;
    )e[arguments[n]]=k(e);
    return e.of=function(n, i) {
    return function(r) {
    try {
    var o=r.sourceEvent=la.event;
    r.target=t, la.event=r, e[r.type].apply(n, i);
}
finally {
    la.event=o;
}
}}, e;
}function S(t) {
    return Ta(t, Da), t;
}
function M(t) {
    return"function"==typeof t?t: function() {
    return Ea(t, this);
}
}function D(t) {
    return"function"==typeof t?t: function() {
    return Sa(t, this);
}
}function A(t, e) {
    function n() {
    this.removeAttribute(t);
}
function i() {
    this.removeAttributeNS(t.space, t.local);
}
function r() {
    this.setAttribute(t, e);
}
function o() {
    this.setAttributeNS(t.space, t.local, e);
}
function s() {
    var n=e.apply(this, arguments);
    null==n?this.removeAttribute(t): this.setAttribute(t, n);
}
function a() {
    var n=e.apply(this, arguments);
    null==n?this.removeAttributeNS(t.space, t.local): this.setAttributeNS(t.space, t.local, n);
}
return t=la.ns.qualify(t), null==e?t.local?i:n:"function"==typeof e?t.local?a:s:t.local?o:r;
}function N(t) {
    return t.trim().replace(/\s+/g, " ");
}
function P(t) {
    return new RegExp("(?: ^|\\s+)"+la.requote(t)+"(?:\\s+|$)", "g");
}
function O(t) {
    return(t+"").trim().split(/^|\s+/);
}
function I(t, e) {
    function n() {
    for(var n=-1;
    ++n<r;
    )t[n](this, e);
}
function i() {
    for(var n=-1, i=e.apply(this, arguments);
    ++n<r;
    )t[n](this, i);
}
t=O(t).map(L);
    var r=t.length;
    return"function"==typeof e?i: n;
}
function L(t) {
    var e=P(t);
    return function(n, i) {
    if(r=n.classList)return i?r.add(t): r.remove(t);
    var r=n.getAttribute("class")||"";
    i?(e.lastIndex=0, e.test(r)||n.setAttribute("class", N(r+" "+t))): n.setAttribute("class", N(r.replace(e, " ")));
}
}function j(t, e, n) {
    function i() {
    this.style.removeProperty(t);
}
function r() {
    this.style.setProperty(t, e, n);
}
function o() {
    var i=e.apply(this, arguments);
    null==i?this.style.removeProperty(t): this.style.setProperty(t, i, n);
}
return null==e?i:"function"==typeof e?o:r;
}function H(t, e) {
    function n() {
    delete this[t];
}
function i() {
    this[t]=e;
}
function r() {
    var n=e.apply(this, arguments);
    null==n?delete this[t]: this[t]=n;
}
return null==e?n:"function"==typeof e?r:i;
}function z(t) {
    function e() {
    var e=this.ownerDocument, n=this.namespaceURI;
    return n===Aa&&e.documentElement.namespaceURI===Aa?e.createElement(t): e.createElementNS(n, t);
}
function n() {
    return this.ownerDocument.createElementNS(t.space, t.local);
}
return"function"==typeof t?t: (t=la.ns.qualify(t)).local?n:e;
}function R() {
    var t=this.parentNode;
    t&&t.removeChild(this);
}
function q(t) {
    return {
    __data__: t;
}
}function F(t) {
    return function() {
    return Ma(this, t);
}
}function $(t) {
    return arguments.length||(t=n), function(e, n) {
    return e&&n?t(e.__data__, n.__data__): !e-!n;
}
}function W(t, e) {
    for(var n=0, i=t.length;
    i>n;
    n++)for(var r, o=t[n], s=0, a=o.length;
    a>s;
    s++)(r=o[s])&&e(r, s, n);
    return t;
}
function B(t) {
    return Ta(t, Pa), t;
}
function V(t) {
    var e, n;
    return function(i, r, o) {
    var s, a=t[o].update, l=a.length;
    for(o!=n&&(n=o, e=0), r>=e&&(e=r+1);
    !(s=a[e])&&++e<l;
    );
    return s;
}
}function Y(t, e, n) {
    function i() {
    var e=this[s];
    e&&(this.removeEventListener(t, e, e.$), delete this[s]);
}
function r() {
    var r=l(e, ca(arguments));
    i.call(this), this.addEventListener(t, this[s]=r, r.$=n), r._=e;
}
function o() {
    var e, n=new RegExp("^__on([^.]+)"+la.requote(t)+"$");
    for(var i in this)if(e=i.match(n)) {
    var r=this[i];
    this.removeEventListener(e[1], r, r.$), delete this[i];
}
}var s="__on"+t, a=t.indexOf("."), l=U;
    a>0&&(t=t.slice(0, a));
    var u=Oa.get(t);
    return u&&(t=u, l=X), a?e?r: i:e?x:o;
}
function U(t, e) {
    return function(n) {
    var i=la.event;
    la.event=n, e[0]=this.__data__;
    try {
    t.apply(this, e);
}
finally {
    la.event=i;
}
}}function X(t, e) {
    var n=U(t, e);
    return function(t) {
    var e=this, i=t.relatedTarget;
    i&&(i===e||8&i.compareDocumentPosition(e))||n.call(e, t);
}
}function Q(n) {
    var i=".dragsuppress-"+ ++La, r="click"+i, o=la.select(e(n)).on("touchmove"+i, C).on("dragstart"+i, C).on("selectstart"+i, C);
    if(null==Ia&&(Ia="onselectstart"in n?!1: w(n.style, "userSelect")), Ia) {
    var s=t(n).style, a=s[Ia];
    s[Ia]="none"}
return function(t) {
    if(o.on(i, null), Ia&&(s[Ia]=a), t) {
    var e=function() {
    o.on(r, null);
}
;
    o.on(r, function() {
    C(), e();
}
, !0), setTimeout(e, 0);
}}}function G(t, n) {
    n.changedTouches&&(n=n.changedTouches[0]);
    var i=t.ownerSVGElement||t;
    if(i.createSVGPoint) {
    var r=i.createSVGPoint();
    if(0>ja) {
    var o=e(t);
    if(o.scrollX||o.scrollY) {
    i=la.select("body").append("svg").style( {
    position: "absolute", top:0, left:0, margin:0, padding:0, border:"none"}
, "important");
    var s=i[0][0].getScreenCTM();
    ja=!(s.f||s.e), i.remove();
}
}return ja?(r.x=n.pageX, r.y=n.pageY): (r.x=n.clientX, r.y=n.clientY), r=r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y];
}var a=t.getBoundingClientRect();
    return[n.clientX-a.left-t.clientLeft, n.clientY-a.top-t.clientTop];
}
function K() {
    return la.event.changedTouches[0].identifier;
}
function Z(t) {
    return t>0?1: 0>t?-1:0;
}
function J(t, e, n) {
    return(e[0]-t[0])*(n[1]-t[1])-(e[1]-t[1])*(n[0]-t[0]);
}
function te(t) {
    return t>1?0: -1>t?Ra:Math.acos(t);
}
function ee(t) {
    return t>1?$a: -1>t?-$a:Math.asin(t);
}
function ne(t) {
    return((t=Math.exp(t))-1/t)/2;
}
function ie(t) {
    return((t=Math.exp(t))+1/t)/2;
}
function re(t) {
    return((t=Math.exp(2*t))-1)/(t+1);
}
function oe(t) {
    return(t=Math.sin(t/2))*t;
}
function se() {
}
function ae(t, e, n) {
    return this instanceof ae?(this.h=+t, this.s=+e, void(this.l=+n)): arguments.length<2?t instanceof ae?new ae(t.h, t.s, t.l):xe(""+t, _e, ae):new ae(t, e, n);
}
function le(t, e, n) {
    function i(t) {
    return t>360?t-=360: 0>t&&(t+=360), 60>t?o+(s-o)*t/60:180>t?s:240>t?o+(s-o)*(240-t)/60:o;
}
function r(t) {
    return Math.round(255*i(t));
}
var o, s;
    return t=isNaN(t)?0: (t%=360)<0?t+360:t, e=isNaN(e)?0:0>e?0:e>1?1:e, n=0>n?0:n>1?1:n, s=.5>=n?n*(1+e):n+e-n*e, o=2*n-s, new ve(r(t+120), r(t), r(t-120));
}
function ue(t, e, n) {
    return this instanceof ue?(this.h=+t, this.c=+e, void(this.l=+n)): arguments.length<2?t instanceof ue?new ue(t.h, t.c, t.l):t instanceof he?fe(t.l, t.a, t.b):fe((t=ke((t=la.rgb(t)).r, t.g, t.b)).l, t.a, t.b):new ue(t, e, n);
}
function ce(t, e, n) {
    return isNaN(t)&&(t=0), isNaN(e)&&(e=0), new he(n, Math.cos(t*=Wa)*e, Math.sin(t)*e);
}
function he(t, e, n) {
    return this instanceof he?(this.l=+t, this.a=+e, void(this.b=+n)): arguments.length<2?t instanceof he?new he(t.l, t.a, t.b):t instanceof ue?ce(t.h, t.c, t.l):ke((t=ve(t)).r, t.g, t.b):new he(t, e, n);
}
function de(t, e, n) {
    var i=(t+16)/116, r=i+e/500, o=i-n/200;
    return r=pe(r)*tl, i=pe(i)*el, o=pe(o)*nl, new ve(me(3.2404542*r-1.5371385*i-.4985314*o), me(-.969266*r+1.8760108*i+.041556*o), me(.0556434*r-.2040259*i+1.0572252*o));
}
function fe(t, e, n) {
    return t>0?new ue(Math.atan2(n, e)*Ba, Math.sqrt(e*e+n*n), t): new ue(0/0, 0/0, t);
}
function pe(t) {
    return t>.206893034?t*t*t: (t-4/29)/7.787037;
}
function ge(t) {
    return t>.008856?Math.pow(t, 1/3): 7.787037*t+4/29;
}
function me(t) {
    return Math.round(255*(.00304>=t?12.92*t: 1.055*Math.pow(t, 1/2.4)-.055));
}
function ve(t, e, n) {
    return this instanceof ve?(this.r=~~t, this.g=~~e, void(this.b=~~n)): arguments.length<2?t instanceof ve?new ve(t.r, t.g, t.b):xe(""+t, ve, le):new ve(t, e, n);
}
function ye(t) {
    return new ve(t>>16, t>>8&255, 255&t);
}
function be(t) {
    return ye(t)+""}
function we(t) {
    return 16>t?"0"+Math.max(0, t).toString(16): Math.min(255, t).toString(16);
}
function xe(t, e, n) {
    var i, r, o, s=0, a=0, l=0;
    if(i=/([a-z]+)\((.*)\)/.exec(t=t.toLowerCase()))switch(r=i[2].split(", "), i[1]) {
    case"hsl": return n(parseFloat(r[0]), parseFloat(r[1])/100, parseFloat(r[2])/100);
    case"rgb": return e(Te(r[0]), Te(r[1]), Te(r[2]));
}
return(o=ol.get(t))?e(o.r, o.g, o.b):(null==t||"#"!==t.charAt(0)||isNaN(o=parseInt(t.slice(1), 16))||(4===t.length?(s=(3840&o)>>4, s=s>>4|s, a=240&o, a=a>>4|a, l=15&o, l=l<<4|l):7===t.length&&(s=(16711680&o)>>16, a=(65280&o)>>8, l=255&o)), e(s, a, l));
}function _e(t, e, n) {
    var i, r, o=Math.min(t/=255, e/=255, n/=255), s=Math.max(t, e, n), a=s-o, l=(s+o)/2;
    return a?(r=.5>l?a/(s+o): a/(2-s-o), i=t==s?(e-n)/a+(n>e?6:0):e==s?(n-t)/a+2:(t-e)/a+4, i*=60):(i=0/0, r=l>0&&1>l?0:i), new ae(i, r, l);
}
function ke(t, e, n) {
    t=Ce(t), e=Ce(e), n=Ce(n);
    var i=ge((.4124564*t+.3575761*e+.1804375*n)/tl), r=ge((.2126729*t+.7151522*e+.072175*n)/el), o=ge((.0193339*t+.119192*e+.9503041*n)/nl);
    return he(116*r-16, 500*(i-r), 200*(r-o));
}
function Ce(t) {
    return(t/=255)<=.04045?t/12.92: Math.pow((t+.055)/1.055, 2.4);
}
function Te(t) {
    var e=parseFloat(t);
    return"%"===t.charAt(t.length-1)?Math.round(2.55*e): e;
}
function Ee(t) {
    return"function"==typeof t?t: function() {
    return t;
}
}function Se(t) {
    return function(e, n, i) {
    return 2===arguments.length&&"function"==typeof n&&(i=n, n=null), Me(e, n, t, i);
}
}function Me(t, e, n, i) {
    function r() {
    var t, e=l.status;
    if(!e&&Ae(l)||e>=200&&300>e||304===e) {
    try {
    t=n.call(o, l);
}
catch(i) {
    return void s.error.call(o, i);
}
s.load.call(o, t);
}else s.error.call(o, l);
}var o= {
}
, s=la.dispatch("beforesend", "progress", "load", "error"), a= {
}
, l=new XMLHttpRequest, u=null;
    return!this.XDomainRequest||"withCredentials"in l||!/^(http(s)?: )?\/\//.test(t)||(l=new XDomainRequest), "onload"in l?l.onload=l.onerror=r:l.onreadystatechange=function() {
    l.readyState>3&&r();
}
, l.onprogress=function(t) {
    var e=la.event;
    la.event=t;
    try {
    s.progress.call(o, l);
}
finally {
    la.event=e;
}
}, o.header=function(t, e) {
    return t=(t+"").toLowerCase(), arguments.length<2?a[t]: (null==e?delete a[t]:a[t]=e+"", o);
}
, o.mimeType=function(t) {
    return arguments.length?(e=null==t?null: t+"", o):e;
}
, o.responseType=function(t) {
    return arguments.length?(u=t, o): u;
}
, o.response=function(t) {
    return n=t, o;
}
, ["get", "post"].forEach(function(t) {
    o[t]=function() {
    return o.send.apply(o, [t].concat(ca(arguments)));
}
}), o.send=function(n, i, r) {
    if(2===arguments.length&&"function"==typeof i&&(r=i, i=null), l.open(n, t, !0), null==e||"accept"in a||(a.accept=e+", */*"), l.setRequestHeader)for(var c in a)l.setRequestHeader(c, a[c]);
    return null!=e&&l.overrideMimeType&&l.overrideMimeType(e), null!=u&&(l.responseType=u), null!=r&&o.on("error", r).on("load", function(t) {
    r(null, t);
}
), s.beforesend.call(o, l), l.send(null==i?null: i), o;
}, o.abort=function() {
    return l.abort(), o;
}
, la.rebind(o, s, "on"), null==i?o: o.get(De(i));
}function De(t) {
    return 1===t.length?function(e, n) {
    t(null==e?n: null);
}
:t;
}function Ae(t) {
    var e=t.responseType;
    return e&&"text"!==e?t.response: t.responseText;
}
function Ne(t, e, n) {
    var i=arguments.length;
    2>i&&(e=0), 3>i&&(n=Date.now());
    var r=n+e, o= {
    c: t, t:r, n:null;
}
;
    return al?al.n=o: sl=o, al=o, ll||(ul=clearTimeout(ul), ll=1, cl(Pe)), o;
}
function Pe() {
    var t=Oe(), e=Ie()-t;
    e>24?(isFinite(e)&&(clearTimeout(ul), ul=setTimeout(Pe, e)), ll=0): (ll=1, cl(Pe));
}
function Oe() {
    for(var t=Date.now(), e=sl;
    e;
    )t>=e.t&&e.c(t-e.t)&&(e.c=null), e=e.n;
    return t;
}
function Ie() {
    for(var t, e=sl, n=1/0;
    e;
    )e.c?(e.t<n&&(n=e.t), e=(t=e).n): e=t?t.n=e.n:sl=e.n;
    return al=t, n;
}
function Le(t, e) {
    return e-(t?Math.ceil(Math.log(t)/Math.LN10): 1);
}
function je(t, e) {
    var n=Math.pow(10, 3*wa(8-e));
    return {
    scale: e>8?function(t) {
    return t/n;
}
: function(t) {
    return t*n;
}
, symbol: t;
}}function He(t) {
    var e=t.decimal, n=t.thousands, i=t.grouping, r=t.currency, o=i&&n?function(t, e) {
    for(var r=t.length, o=[], s=0, a=i[0], l=0;
    r>0&&a>0&&(l+a+1>e&&(a=Math.max(1, e-l)), o.push(t.substring(r-=a, r+a)), !((l+=a+1)>e));
    )a=i[s=(s+1)%i.length];
    return o.reverse().join(n);
}
: y;
    return function(t) {
    var n=dl.exec(t), i=n[1]||" ", s=n[2]||">", a=n[3]||"-", l=n[4]||"", u=n[5], c=+n[6], h=n[7], d=n[8], f=n[9], p=1, g="", m="", v=!1, y=!0;
    switch(d&&(d=+d.substring(1)), (u||"0"===i&&"="===s)&&(u=i="0", s="="), f) {
    case"n": h=!0, f="g";
    break;
    case"%": p=100, m="%", f="f";
    break;
    case"p": p=100, m="%", f="r";
    break;
    case"b": case"o":case"x":case"X":"#"===l&&(g="0"+f.toLowerCase());
    case"c": y=!1;
    case"d": v=!0, d=0;
    break;
    case"s": p=-1, f="r"}
"$"===l&&(g=r[0], m=r[1]), "r"!=f||d||(f="g"), null!=d&&("g"==f?d=Math.max(1, Math.min(21, d)):"e"!=f&&"f"!=f||(d=Math.max(0, Math.min(20, d)))), f=fl.get(f)||ze;
    var b=u&&h;
    return function(t) {
    var n=m;
    if(v&&t%1)return"";
    var r=0>t||0===t&&0>1/t?(t=-t, "-"): "-"===a?"":a;
    if(0>p) {
    var l=la.formatPrefix(t, d);
    t=l.scale(t), n=l.symbol+m;
}
else t*=p;
    t=f(t, d);
    var w, x, _=t.lastIndexOf(".");
    if(0>_) {
    var k=y?t.lastIndexOf("e"): -1;
    0>k?(w=t, x=""): (w=t.substring(0, k), x=t.substring(k));
}
else w=t.substring(0, _), x=e+t.substring(_+1);
    !u&&h&&(w=o(w, 1/0));
    var C=g.length+w.length+x.length+(b?0: r.length), T=c>C?new Array(C=c-C+1).join(i):"";
    return b&&(w=o(T+w, T.length?c-x.length: 1/0)), r+=g, t=w+x, ("<"===s?r+t+T:">"===s?T+r+t:"^"===s?T.substring(0, C>>=1)+r+t+T.substring(C):r+(b?t:T+t))+n;
}
}}function ze(t) {
    return t+""}
function Re() {
    this._=new Date(arguments.length>1?Date.UTC.apply(this, arguments): arguments[0]);
}
function qe(t, e, n) {
    function i(e) {
    var n=t(e), i=o(n, 1);
    return i-e>e-n?n: i;
}
function r(n) {
    return e(n=t(new gl(n-1)), 1), n;
}
function o(t, n) {
    return e(t=new gl(+t), n), t;
}
function s(t, i, o) {
    var s=r(t), a=[];
    if(o>1)for(;
    i>s;
    )n(s)%o||a.push(new Date(+s)), e(s, 1);
    else for(;
    i>s;
    )a.push(new Date(+s)), e(s, 1);
    return a;
}
function a(t, e, n) {
    try {
    gl=Re;
    var i=new Re;
    return i._=t, s(i, e, n);
}
finally {
    gl=Date;
}
}t.floor=t, t.round=i, t.ceil=r, t.offset=o, t.range=s;
    var l=t.utc=Fe(t);
    return l.floor=l, l.round=Fe(i), l.ceil=Fe(r), l.offset=Fe(o), l.range=a, t;
}
function Fe(t) {
    return function(e, n) {
    try {
    gl=Re;
    var i=new Re;
    return i._=e, t(i, n)._;
}
finally {
    gl=Date;
}
}}function $e(t) {
    function e(t) {
    function e(e) {
    for(var n, r, o, s=[], a=-1, l=0;
    ++a<i;
    )37===t.charCodeAt(a)&&(s.push(t.slice(l, a)), null!=(r=vl[n=t.charAt(++a)])&&(n=t.charAt(++a)), (o=M[n])&&(n=o(e, null==r?"e"===n?" ": "0":r)), s.push(n), l=a+1);
    return s.push(t.slice(l, a)), s.join("");
}
var i=t.length;
    return e.parse=function(e) {
    var i= {
    y: 1900, m:0, d:1, H:0, M:0, S:0, L:0, Z:null;
}
, r=n(i, t, e, 0);
    if(r!=e.length)return null;
    "p"in i&&(i.H=i.H%12+12*i.p);
    var o=null!=i.Z&&gl!==Re, s=new(o?Re: gl);
    return"j"in i?s.setFullYear(i.y, 0, i.j): "W"in i||"U"in i?("w"in i||(i.w="W"in i?1:0), s.setFullYear(i.y, 0, 1), s.setFullYear(i.y, 0, "W"in i?(i.w+6)%7+7*i.W-(s.getDay()+5)%7:i.w+7*i.U-(s.getDay()+6)%7)):s.setFullYear(i.y, i.m, i.d), s.setHours(i.H+(i.Z/100|0), i.M+i.Z%100, i.S, i.L), o?s._:s;
}
, e.toString=function() {
    return t;
}
, e;
}function n(t, e, n, i) {
    for(var r, o, s, a=0, l=e.length, u=n.length;
    l>a;
    ) {
    if(i>=u)return-1;
    if(r=e.charCodeAt(a++), 37===r) {
    if(s=e.charAt(a++), o=D[s in vl?e.charAt(a++): s], !o||(i=o(t, n, i))<0)return-1;
}
else if(r!=n.charCodeAt(i++))return-1;
}return i;
}function i(t, e, n) {
    _.lastIndex=0;
    var i=_.exec(e.slice(n));
    return i?(t.w=k.get(i[0].toLowerCase()), n+i[0].length): -1;
}
function r(t, e, n) {
    w.lastIndex=0;
    var i=w.exec(e.slice(n));
    return i?(t.w=x.get(i[0].toLowerCase()), n+i[0].length): -1;
}
function o(t, e, n) {
    E.lastIndex=0;
    var i=E.exec(e.slice(n));
    return i?(t.m=S.get(i[0].toLowerCase()), n+i[0].length): -1;
}
function s(t, e, n) {
    C.lastIndex=0;
    var i=C.exec(e.slice(n));
    return i?(t.m=T.get(i[0].toLowerCase()), n+i[0].length): -1;
}
function a(t, e, i) {
    return n(t, M.c.toString(), e, i);
}
function l(t, e, i) {
    return n(t, M.x.toString(), e, i);
}
function u(t, e, i) {
    return n(t, M.X.toString(), e, i);
}
function c(t, e, n) {
    var i=b.get(e.slice(n, n+=2).toLowerCase());
    return null==i?-1: (t.p=i, n);
}
var h=t.dateTime, d=t.date, f=t.time, p=t.periods, g=t.days, m=t.shortDays, v=t.months, y=t.shortMonths;
    e.utc=function(t) {
    function n(t) {
    try {
    gl=Re;
    var e=new gl;
    return e._=t, i(e);
}
finally {
    gl=Date;
}
}var i=e(t);
    return n.parse=function(t) {
    try {
    gl=Re;
    var e=i.parse(t);
    return e&&e._;
}
finally {
    gl=Date;
}
}, n.toString=i.toString, n;
}, e.multi=e.utc.multi=un;
    var b=la.map(), w=Be(g), x=Ve(g), _=Be(m), k=Ve(m), C=Be(v), T=Ve(v), E=Be(y), S=Ve(y);
    p.forEach(function(t, e) {
    b.set(t.toLowerCase(), e);
}
);
    var M= {
    a: function(t) {
    return m[t.getDay()];
}
, A: function(t) {
    return g[t.getDay()];
}
, b: function(t) {
    return y[t.getMonth()];
}
, B: function(t) {
    return v[t.getMonth()];
}
, c: e(h), d:function(t, e) {
    return We(t.getDate(), e, 2);
}
, e: function(t, e) {
    return We(t.getDate(), e, 2);
}
, H: function(t, e) {
    return We(t.getHours(), e, 2);
}
, I: function(t, e) {
    return We(t.getHours()%12||12, e, 2);
}
, j: function(t, e) {
    return We(1+pl.dayOfYear(t), e, 3);
}
, L: function(t, e) {
    return We(t.getMilliseconds(), e, 3);
}
, m: function(t, e) {
    return We(t.getMonth()+1, e, 2);
}
, M: function(t, e) {
    return We(t.getMinutes(), e, 2);
}
, p: function(t) {
    return p[+(t.getHours()>=12)];
}
, S: function(t, e) {
    return We(t.getSeconds(), e, 2);
}
, U: function(t, e) {
    return We(pl.sundayOfYear(t), e, 2);
}
, w: function(t) {
    return t.getDay();
}
, W: function(t, e) {
    return We(pl.mondayOfYear(t), e, 2);
}
, x: e(d), X:e(f), y:function(t, e) {
    return We(t.getFullYear()%100, e, 2);
}
, Y: function(t, e) {
    return We(t.getFullYear()%1e4, e, 4);
}
, Z: an, "%":function() {
    return"%"}
}, D= {
    a: i, A:r, b:o, B:s, c:a, d:tn, e:tn, H:nn, I:nn, j:en, L:sn, m:Je, M:rn, p:c, S:on, U:Ue, w:Ye, W:Xe, x:l, X:u, y:Ge, Y:Qe, Z:Ke, "%":ln;
}
;
    return e;
}
function We(t, e, n) {
    var i=0>t?"-": "", r=(i?-t:t)+"", o=r.length;
    return i+(n>o?new Array(n-o+1).join(e)+r: r);
}
function Be(t) {
    return new RegExp("^(?: "+t.map(la.requote).join("|")+")", "i");
}
function Ve(t) {
    for(var e=new u, n=-1, i=t.length;
    ++n<i;
    )e.set(t[n].toLowerCase(), n);
    return e;
}
function Ye(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+1));
    return i?(t.w=+i[0], n+i[0].length): -1;
}
function Ue(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n));
    return i?(t.U=+i[0], n+i[0].length): -1;
}
function Xe(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n));
    return i?(t.W=+i[0], n+i[0].length): -1;
}
function Qe(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+4));
    return i?(t.y=+i[0], n+i[0].length): -1;
}
function Ge(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+2));
    return i?(t.y=Ze(+i[0]), n+i[0].length): -1;
}
function Ke(t, e, n) {
    return/^[+-]\d {
    4;
}
$/.test(e=e.slice(n, n+5))?(t.Z=-e, n+5): -1;
}function Ze(t) {
    return t+(t>68?1900: 2e3);
}
function Je(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+2));
    return i?(t.m=i[0]-1, n+i[0].length): -1;
}
function tn(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+2));
    return i?(t.d=+i[0], n+i[0].length): -1;
}
function en(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+3));
    return i?(t.j=+i[0], n+i[0].length): -1;
}
function nn(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+2));
    return i?(t.H=+i[0], n+i[0].length): -1;
}
function rn(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+2));
    return i?(t.M=+i[0], n+i[0].length): -1;
}
function on(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+2));
    return i?(t.S=+i[0], n+i[0].length): -1;
}
function sn(t, e, n) {
    yl.lastIndex=0;
    var i=yl.exec(e.slice(n, n+3));
    return i?(t.L=+i[0], n+i[0].length): -1;
}
function an(t) {
    var e=t.getTimezoneOffset(), n=e>0?"-": "+", i=wa(e)/60|0, r=wa(e)%60;
    return n+We(i, "0", 2)+We(r, "0", 2);
}
function ln(t, e, n) {
    bl.lastIndex=0;
    var i=bl.exec(e.slice(n, n+1));
    return i?n+i[0].length: -1;
}
function un(t) {
    for(var e=t.length, n=-1;
    ++n<e;
    )t[n][0]=this(t[n][0]);
    return function(e) {
    for(var n=0, i=t[n];
    !i[1](e);
    )i=t[++n];
    return i[0](e);
}
}function cn() {
}
function hn(t, e, n) {
    var i=n.s=t+e, r=i-t, o=i-r;
    n.t=t-o+(e-r);
}
function dn(t, e) {
    t&&kl.hasOwnProperty(t.type)&&kl[t.type](t, e);
}
function fn(t, e, n) {
    var i, r=-1, o=t.length-n;
    for(e.lineStart();
    ++r<o;
    )i=t[r], e.point(i[0], i[1], i[2]);
    e.lineEnd();
}
function pn(t, e) {
    var n=-1, i=t.length;
    for(e.polygonStart();
    ++n<i;
    )fn(t[n], e, 1);
    e.polygonEnd();
}
function gn() {
    function t(t, e) {
    t*=Wa, e=e*Wa/2+Ra/4;
    var n=t-i, s=n>=0?1: -1, a=s*n, l=Math.cos(e), u=Math.sin(e), c=o*u, h=r*l+c*Math.cos(a), d=c*s*Math.sin(a);
    Tl.add(Math.atan2(d, h)), i=t, r=l, o=u;
}
var e, n, i, r, o;
    El.point=function(s, a) {
    El.point=t, i=(e=s)*Wa, r=Math.cos(a=(n=a)*Wa/2+Ra/4), o=Math.sin(a);
}
, El.lineEnd=function() {
    t(e, n);
}
}function mn(t) {
    var e=t[0], n=t[1], i=Math.cos(n);
    return[i*Math.cos(e), i*Math.sin(e), Math.sin(n)];
}
function vn(t, e) {
    return t[0]*e[0]+t[1]*e[1]+t[2]*e[2];
}
function yn(t, e) {
    return[t[1]*e[2]-t[2]*e[1], t[2]*e[0]-t[0]*e[2], t[0]*e[1]-t[1]*e[0]];
}
function bn(t, e) {
    t[0]+=e[0], t[1]+=e[1], t[2]+=e[2];
}
function wn(t, e) {
    return[t[0]*e, t[1]*e, t[2]*e];
}
function xn(t) {
    var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);
    t[0]/=e, t[1]/=e, t[2]/=e;
}
function _n(t) {
    return[Math.atan2(t[1], t[0]), ee(t[2])];
}
function kn(t, e) {
    return wa(t[0]-e[0])<Ha&&wa(t[1]-e[1])<Ha;
}
function Cn(t, e) {
    t*=Wa;
    var n=Math.cos(e*=Wa);
    Tn(n*Math.cos(t), n*Math.sin(t), Math.sin(e));
}
function Tn(t, e, n) {
    ++Sl, Dl+=(t-Dl)/Sl, Al+=(e-Al)/Sl, Nl+=(n-Nl)/Sl;
}
function En() {
    function t(t, r) {
    t*=Wa;
    var o=Math.cos(r*=Wa), s=o*Math.cos(t), a=o*Math.sin(t), l=Math.sin(r), u=Math.atan2(Math.sqrt((u=n*l-i*a)*u+(u=i*s-e*l)*u+(u=e*a-n*s)*u), e*s+n*a+i*l);
    Ml+=u, Pl+=u*(e+(e=s)), Ol+=u*(n+(n=a)), Il+=u*(i+(i=l)), Tn(e, n, i);
}
var e, n, i;
    zl.point=function(r, o) {
    r*=Wa;
    var s=Math.cos(o*=Wa);
    e=s*Math.cos(r), n=s*Math.sin(r), i=Math.sin(o), zl.point=t, Tn(e, n, i);
}
}function Sn() {
    zl.point=Cn;
}
function Mn() {
    function t(t, e) {
    t*=Wa;
    var n=Math.cos(e*=Wa), s=n*Math.cos(t), a=n*Math.sin(t), l=Math.sin(e), u=r*l-o*a, c=o*s-i*l, h=i*a-r*s, d=Math.sqrt(u*u+c*c+h*h), f=i*s+r*a+o*l, p=d&&-te(f)/d, g=Math.atan2(d, f);
    Ll+=p*u, jl+=p*c, Hl+=p*h, Ml+=g, Pl+=g*(i+(i=s)), Ol+=g*(r+(r=a)), Il+=g*(o+(o=l)), Tn(i, r, o);
}
var e, n, i, r, o;
    zl.point=function(s, a) {
    e=s, n=a, zl.point=t, s*=Wa;
    var l=Math.cos(a*=Wa);
    i=l*Math.cos(s), r=l*Math.sin(s), o=Math.sin(a), Tn(i, r, o);
}
, zl.lineEnd=function() {
    t(e, n), zl.lineEnd=Sn, zl.point=Cn;
}
}function Dn(t, e) {
    function n(n, i) {
    return n=t(n, i), e(n[0], n[1]);
}
return t.invert&&e.invert&&(n.invert=function(n, i) {
    return n=e.invert(n, i), n&&t.invert(n[0], n[1]);
}
), n;
}function An() {
    return!0;
}
function Nn(t, e, n, i, r) {
    var o=[], s=[];
    if(t.forEach(function(t) {
    if(!((e=t.length-1)<=0)) {
    var e, n=t[0], i=t[e];
    if(kn(n, i)) {
    r.lineStart();
    for(var a=0;
    e>a;
    ++a)r.point((n=t[a])[0], n[1]);
    return void r.lineEnd();
}
var l=new On(n, t, null, !0), u=new On(n, null, l, !1);
    l.o=u, o.push(l), s.push(u), l=new On(i, t, null, !1), u=new On(i, null, l, !0), l.o=u, o.push(l), s.push(u);
}
}), s.sort(e), Pn(o), Pn(s), o.length) {
    for(var a=0, l=n, u=s.length;
    u>a;
    ++a)s[a].e=l=!l;
    for(var c, h, d=o[0];
    ;
    ) {
    for(var f=d, p=!0;
    f.v;
    )if((f=f.n)===d)return;
    c=f.z, r.lineStart();
    do {
    if(f.v=f.o.v=!0, f.e) {
    if(p)for(var a=0, u=c.length;
    u>a;
    ++a)r.point((h=c[a])[0], h[1]);
    else i(f.x, f.n.x, 1, r);
    f=f.n;
}
else {
    if(p) {
    c=f.p.z;
    for(var a=c.length-1;
    a>=0;
    --a)r.point((h=c[a])[0], h[1]);
}
else i(f.x, f.p.x, -1, r);
    f=f.p;
}
f=f.o, c=f.z, p=!p;
}while(!f.v);
    r.lineEnd();
}
}}function Pn(t) {
    if(e=t.length) {
    for(var e, n, i=0, r=t[0];
    ++i<e;
    )r.n=n=t[i], n.p=r, r=n;
    r.n=n=t[0], n.p=r;
}
}function On(t, e, n, i) {
    this.x=t, this.z=e, this.o=n, this.e=i, this.v=!1, this.n=this.p=null;
}
function In(t, e, n, i) {
    return function(r, o) {
    function s(e, n) {
    var i=r(e, n);
    t(e=i[0], n=i[1])&&o.point(e, n);
}
function a(t, e) {
    var n=r(t, e);
    m.point(n[0], n[1]);
}
function l() {
    y.point=a, m.lineStart();
}
function u() {
    y.point=s, m.lineEnd();
}
function c(t, e) {
    g.push([t, e]);
    var n=r(t, e);
    w.point(n[0], n[1]);
}
function h() {
    w.lineStart(), g=[];
}
function d() {
    c(g[0][0], g[0][1]), w.lineEnd();
    var t, e=w.clean(), n=b.buffer(), i=n.length;
    if(g.pop(), p.push(g), g=null, i)if(1&e) {
    t=n[0];
    var r, i=t.length-1, s=-1;
    if(i>0) {
    for(x||(o.polygonStart(), x=!0), o.lineStart();
    ++s<i;
    )o.point((r=t[s])[0], r[1]);
    o.lineEnd();
}
}else i>1&&2&e&&n.push(n.pop().concat(n.shift())), f.push(n.filter(Ln));
}var f, p, g, m=e(o), v=r.invert(i[0], i[1]), y= {
    point: s, lineStart:l, lineEnd:u, polygonStart:function() {
    y.point=c, y.lineStart=h, y.lineEnd=d, f=[], p=[];
}
, polygonEnd: function() {
    y.point=s, y.lineStart=l, y.lineEnd=u, f=la.merge(f);
    var t=Fn(v, p);
    f.length?(x||(o.polygonStart(), x=!0), Nn(f, Hn, t, n, o)): t&&(x||(o.polygonStart(), x=!0), o.lineStart(), n(null, null, 1, o), o.lineEnd()), x&&(o.polygonEnd(), x=!1), f=p=null;
}
, sphere:function() {
    o.polygonStart(), o.lineStart(), n(null, null, 1, o), o.lineEnd(), o.polygonEnd();
}
}, b=jn(), w=e(b), x=!1;
    return y;
}
}function Ln(t) {
    return t.length>1;
}
function jn() {
    var t, e=[];
    return {
    lineStart: function() {
    e.push(t=[]);
}
, point: function(e, n) {
    t.push([e, n]);
}
, lineEnd: x, buffer:function() {
    var n=e;
    return e=[], t=null, n;
}
, rejoin: function() {
    e.length>1&&e.push(e.pop().concat(e.shift()));
}
}}function Hn(t, e) {
    return((t=t.x)[0]<0?t[1]-$a-Ha: $a-t[1])-((e=e.x)[0]<0?e[1]-$a-Ha:$a-e[1]);
}
function zn(t) {
    var e, n=0/0, i=0/0, r=0/0;
    return {
    lineStart: function() {
    t.lineStart(), e=1;
}
, point: function(o, s) {
    var a=o>0?Ra: -Ra, l=wa(o-n);
    wa(l-Ra)<Ha?(t.point(n, i=(i+s)/2>0?$a: -$a), t.point(r, i), t.lineEnd(), t.lineStart(), t.point(a, i), t.point(o, i), e=0):r!==a&&l>=Ra&&(wa(n-r)<Ha&&(n-=r*Ha), wa(o-a)<Ha&&(o-=a*Ha), i=Rn(n, i, o, s), t.point(r, i), t.lineEnd(), t.lineStart(), t.point(a, i), e=0), t.point(n=o, i=s), r=a;
}
, lineEnd:function() {
    t.lineEnd(), n=i=0/0;
}
, clean: function() {
    return 2-e;
}
}}function Rn(t, e, n, i) {
    var r, o, s=Math.sin(t-n);
    return wa(s)>Ha?Math.atan((Math.sin(e)*(o=Math.cos(i))*Math.sin(n)-Math.sin(i)*(r=Math.cos(e))*Math.sin(t))/(r*o*s)): (e+i)/2;
}
function qn(t, e, n, i) {
    var r;
    if(null==t)r=n*$a, i.point(-Ra, r), i.point(0, r), i.point(Ra, r), i.point(Ra, 0), i.point(Ra, -r), i.point(0, -r), i.point(-Ra, -r), i.point(-Ra, 0), i.point(-Ra, r);
    else if(wa(t[0]-e[0])>Ha) {
    var o=t[0]<e[0]?Ra: -Ra;
    r=n*o/2, i.point(-o, r), i.point(0, r), i.point(o, r);
}
else i.point(e[0], e[1]);
}function Fn(t, e) {
    var n=t[0], i=t[1], r=[Math.sin(n), -Math.cos(n), 0], o=0, s=0;
    Tl.reset();
    for(var a=0, l=e.length;
    l>a;
    ++a) {
    var u=e[a], c=u.length;
    if(c)for(var h=u[0], d=h[0], f=h[1]/2+Ra/4, p=Math.sin(f), g=Math.cos(f), m=1;
    ;
    ) {
    m===c&&(m=0), t=u[m];
    var v=t[0], y=t[1]/2+Ra/4, b=Math.sin(y), w=Math.cos(y), x=v-d, _=x>=0?1: -1, k=_*x, C=k>Ra, T=p*b;
    if(Tl.add(Math.atan2(T*_*Math.sin(k), g*w+T*Math.cos(k))), o+=C?x+_*qa: x, C^d>=n^v>=n) {
    var E=yn(mn(h), mn(t));
    xn(E);
    var S=yn(r, E);
    xn(S);
    var M=(C^x>=0?-1: 1)*ee(S[2]);
    (i>M||i===M&&(E[0]||E[1]))&&(s+=C^x>=0?1: -1);
}
if(!m++)break;
    d=v, p=b, g=w, h=t;
}
}return(-Ha>o||Ha>o&&-Ha>Tl)^1&s;
}function $n(t) {
    function e(t, e) {
    return Math.cos(t)*Math.cos(e)>o;
}
function n(t) {
    var n, o, l, u, c;
    return {
    lineStart: function() {
    u=l=!1, c=1;
}
, point: function(h, d) {
    var f, p=[h, d], g=e(h, d), m=s?g?0: r(h, d):g?r(h+(0>h?Ra:-Ra), d):0;
    if(!n&&(u=l=g)&&t.lineStart(), g!==l&&(f=i(n, p), (kn(n, f)||kn(p, f))&&(p[0]+=Ha, p[1]+=Ha, g=e(p[0], p[1]))), g!==l)c=0, g?(t.lineStart(), f=i(p, n), t.point(f[0], f[1])): (f=i(n, p), t.point(f[0], f[1]), t.lineEnd()), n=f;
    else if(a&&n&&s^g) {
    var v;
    m&o||!(v=i(p, n, !0))||(c=0, s?(t.lineStart(), t.point(v[0][0], v[0][1]), t.point(v[1][0], v[1][1]), t.lineEnd()): (t.point(v[1][0], v[1][1]), t.lineEnd(), t.lineStart(), t.point(v[0][0], v[0][1])));
}
!g||n&&kn(n, p)||t.point(p[0], p[1]), n=p, l=g, o=m;
}, lineEnd:function() {
    l&&t.lineEnd(), n=null;
}
, clean: function() {
    return c|(u&&l)<<1;
}
}}function i(t, e, n) {
    var i=mn(t), r=mn(e), s=[1, 0, 0], a=yn(i, r), l=vn(a, a), u=a[0], c=l-u*u;
    if(!c)return!n&&t;
    var h=o*l/c, d=-o*u/c, f=yn(s, a), p=wn(s, h), g=wn(a, d);
    bn(p, g);
    var m=f, v=vn(p, m), y=vn(m, m), b=v*v-y*(vn(p, p)-1);
    if(!(0>b)) {
    var w=Math.sqrt(b), x=wn(m, (-v-w)/y);
    if(bn(x, p), x=_n(x), !n)return x;
    var _, k=t[0], C=e[0], T=t[1], E=e[1];
    k>C&&(_=k, k=C, C=_);
    var S=C-k, M=wa(S-Ra)<Ha, D=M||Ha>S;
    if(!M&&T>E&&(_=T, T=E, E=_), D?M?T+E>0^x[1]<(wa(x[0]-k)<Ha?T: E):T<=x[1]&&x[1]<=E:S>Ra^(k<=x[0]&&x[0]<=C)) {
    var A=wn(m, (-v+w)/y);
    return bn(A, p), [x, _n(A)];
}
}}function r(e, n) {
    var i=s?t: Ra-t, r=0;
    return-i>e?r|=1: e>i&&(r|=2), -i>n?r|=4:n>i&&(r|=8), r;
}
var o=Math.cos(t), s=o>0, a=wa(o)>Ha, l=gi(t, 6*Wa);
    return In(e, n, l, s?[0, -t]: [-Ra, t-Ra]);
}
function Wn(t, e, n, i) {
    return function(r) {
    var o, s=r.a, a=r.b, l=s.x, u=s.y, c=a.x, h=a.y, d=0, f=1, p=c-l, g=h-u;
    if(o=t-l, p||!(o>0)) {
    if(o/=p, 0>p) {
    if(d>o)return;
    f>o&&(f=o);
}
else if(p>0) {
    if(o>f)return;
    o>d&&(d=o);
}
if(o=n-l, p||!(0>o)) {
    if(o/=p, 0>p) {
    if(o>f)return;
    o>d&&(d=o);
}
else if(p>0) {
    if(d>o)return;
    f>o&&(f=o);
}
if(o=e-u, g||!(o>0)) {
    if(o/=g, 0>g) {
    if(d>o)return;
    f>o&&(f=o);
}
else if(g>0) {
    if(o>f)return;
    o>d&&(d=o);
}
if(o=i-u, g||!(0>o)) {
    if(o/=g, 0>g) {
    if(o>f)return;
    o>d&&(d=o);
}
else if(g>0) {
    if(d>o)return;
    f>o&&(f=o);
}
return d>0&&(r.a= {
    x: l+d*p, y:u+d*g;
}
), 1>f&&(r.b= {
    x: l+f*p, y:u+f*g;
}
), r;
}}}}}}function Bn(t, e, n, i) {
    function r(i, r) {
    return wa(i[0]-t)<Ha?r>0?0: 3:wa(i[0]-n)<Ha?r>0?2:1:wa(i[1]-e)<Ha?r>0?1:0:r>0?3:2;
}
function o(t, e) {
    return s(t.x, e.x);
}
function s(t, e) {
    var n=r(t, 1), i=r(e, 1);
    return n!==i?n-i: 0===n?e[1]-t[1]:1===n?t[0]-e[0]:2===n?t[1]-e[1]:e[0]-t[0];
}
return function(a) {
    function l(t) {
    for(var e=0, n=m.length, i=t[1], r=0;
    n>r;
    ++r)for(var o, s=1, a=m[r], l=a.length, u=a[0];
    l>s;
    ++s)o=a[s], u[1]<=i?o[1]>i&&J(u, o, t)>0&&++e: o[1]<=i&&J(u, o, t)<0&&--e, u=o;
    return 0!==e;
}
function u(o, a, l, u) {
    var c=0, h=0;
    if(null==o||(c=r(o, l))!==(h=r(a, l))||s(o, a)<0^l>0) {
    do u.point(0===c||3===c?t: n, c>1?i:e);
    while((c=(c+l+4)%4)!==h);
}
else u.point(a[0], a[1]);
}function c(r, o) {
    return r>=t&&n>=r&&o>=e&&i>=o;
}
function h(t, e) {
    c(t, e)&&a.point(t, e);
}
function d() {
    D.point=p, m&&m.push(v=[]), C=!0, k=!1, x=_=0/0;
}
function f() {
    g&&(p(y, b), w&&k&&S.rejoin(), g.push(S.buffer())), D.point=h, k&&a.lineEnd();
}
function p(t, e) {
    t=Math.max(-ql, Math.min(ql, t)), e=Math.max(-ql, Math.min(ql, e));
    var n=c(t, e);
    if(m&&v.push([t, e]), C)y=t, b=e, w=n, C=!1, n&&(a.lineStart(), a.point(t, e));
    else if(n&&k)a.point(t, e);
    else {
    var i= {
    a:  {
    x: x, y:_;
}
, b: {
    x: t, y:e;
}
};
    M(i)?(k||(a.lineStart(), a.point(i.a.x, i.a.y)), a.point(i.b.x, i.b.y), n||a.lineEnd(), T=!1): n&&(a.lineStart(), a.point(t, e), T=!1);
}
x=t, _=e, k=n;
}var g, m, v, y, b, w, x, _, k, C, T, E=a, S=jn(), M=Wn(t, e, n, i), D= {
    point: h, lineStart:d, lineEnd:f, polygonStart:function() {
    a=S, g=[], m=[], T=!0;
}
, polygonEnd: function() {
    a=E, g=la.merge(g);
    var e=l([t, i]), n=T&&e, r=g.length;
    (n||r)&&(a.polygonStart(), n&&(a.lineStart(), u(null, null, 1, a), a.lineEnd()), r&&Nn(g, o, e, u, a), a.polygonEnd()), g=m=v=null;
}
};
    return D;
}
}function Vn(t) {
    var e=0, n=Ra/3, i=ai(t), r=i(e, n);
    return r.parallels=function(t) {
    return arguments.length?i(e=t[0]*Ra/180, n=t[1]*Ra/180): [e/Ra*180, n/Ra*180];
}
, r;
}function Yn(t, e) {
    function n(t, e) {
    var n=Math.sqrt(o-2*r*Math.sin(e))/r;
    return[n*Math.sin(t*=r), s-n*Math.cos(t)];
}
var i=Math.sin(t), r=(i+Math.sin(e))/2, o=1+i*(2*r-i), s=Math.sqrt(o)/r;
    return n.invert=function(t, e) {
    var n=s-e;
    return[Math.atan2(t, n)/r, ee((o-(t*t+n*n)*r*r)/(2*r))];
}
, n;
}function Un() {
    function t(t, e) {
    $l+=r*t-i*e, i=t, r=e
}
var e, n, i, r;
    Ul.point=function(o, s) {
    Ul.point=t, e=i=o, n=r=s;
}
, Ul.lineEnd=function() {
    t(e, n);
}
}function Xn(t, e) {
    Wl>t&&(Wl=t), t>Vl&&(Vl=t), Bl>e&&(Bl=e), e>Yl&&(Yl=e);
}
function Qn() {
    function t(t, e) {
    s.push("M", t, ", ", e, o);
}
function e(t, e) {
    s.push("M", t, ", ", e), a.point=n;
}
function n(t, e) {
    s.push("L", t, ", ", e);
}
function i() {
    a.point=t;
}
function r() {
    s.push("Z");
}
var o=Gn(4.5), s=[], a= {
    point: t, lineStart:function() {
    a.point=e;
}
, lineEnd: i, polygonStart:function() {
    a.lineEnd=r;
}
, polygonEnd: function() {
    a.lineEnd=i, a.point=t;
}
, pointRadius: function(t) {
    return o=Gn(t), a;
}
, result: function() {
    if(s.length) {
    var t=s.join("");
    return s=[], t;
}
}};
    return a;
}
function Gn(t) {
    return"m0, "+t+"a"+t+", "+t+" 0 1, 1 0, "+-2*t+"a"+t+", "+t+" 0 1, 1 0, "+2*t+"z"}
function Kn(t, e) {
    Dl+=t, Al+=e, ++Nl;
}
function Zn() {
    function t(t, i) {
    var r=t-e, o=i-n, s=Math.sqrt(r*r+o*o);
    Pl+=s*(e+t)/2, Ol+=s*(n+i)/2, Il+=s, Kn(e=t, n=i);
}
var e, n;
    Ql.point=function(i, r) {
    Ql.point=t, Kn(e=i, n=r);
}
}function Jn() {
    Ql.point=Kn;
}
function ti() {
    function t(t, e) {
    var n=t-i, o=e-r, s=Math.sqrt(n*n+o*o);
    Pl+=s*(i+t)/2, Ol+=s*(r+e)/2, Il+=s, s=r*t-i*e, Ll+=s*(i+t), jl+=s*(r+e), Hl+=3*s, Kn(i=t, r=e);
}
var e, n, i, r;
    Ql.point=function(o, s) {
    Ql.point=t, Kn(e=i=o, n=r=s);
}
, Ql.lineEnd=function() {
    t(e, n);
}
}function ei(t) {
    function e(e, n) {
    t.moveTo(e+s, n), t.arc(e, n, s, 0, qa);
}
function n(e, n) {
    t.moveTo(e, n), a.point=i;
}
function i(e, n) {
    t.lineTo(e, n);
}
function r() {
    a.point=e;
}
function o() {
    t.closePath();
}
var s=4.5, a= {
    point: e, lineStart:function() {
    a.point=n;
}
, lineEnd: r, polygonStart:function() {
    a.lineEnd=o;
}
, polygonEnd: function() {
    a.lineEnd=r, a.point=e;
}
, pointRadius: function(t) {
    return s=t, a;
}
, result: x;
};
    return a;
}
function ni(t) {
    function e(t) {
    return(a?i: n)(t);
}
function n(e) {
    return oi(e, function(n, i) {
    n=t(n, i), e.point(n[0], n[1]);
}
);
}function i(e) {
    function n(n, i) {
    n=t(n, i), e.point(n[0], n[1]);
}
function i() {
    b=0/0, C.point=o, e.lineStart();
}
function o(n, i) {
    var o=mn([n, i]), s=t(n, i);
    r(b, w, y, x, _, k, b=s[0], w=s[1], y=n, x=o[0], _=o[1], k=o[2], a, e), e.point(b, w);
}
function s() {
    C.point=n, e.lineEnd();
}
function l() {
    i(), C.point=u, C.lineEnd=c;
}
function u(t, e) {
    o(h=t, d=e), f=b, p=w, g=x, m=_, v=k, C.point=o;
}
function c() {
    r(b, w, y, x, _, k, f, p, h, g, m, v, a, e), C.lineEnd=s, s();
}
var h, d, f, p, g, m, v, y, b, w, x, _, k, C= {
    point: n, lineStart:i, lineEnd:s, polygonStart:function() {
    e.polygonStart(), C.lineStart=l;
}
, polygonEnd: function() {
    e.polygonEnd(), C.lineStart=i;
}
};
    return C;
}
function r(e, n, i, a, l, u, c, h, d, f, p, g, m, v) {
    var y=c-e, b=h-n, w=y*y+b*b;
    if(w>4*o&&m--) {
    var x=a+f, _=l+p, k=u+g, C=Math.sqrt(x*x+_*_+k*k), T=Math.asin(k/=C), E=wa(wa(k)-1)<Ha||wa(i-d)<Ha?(i+d)/2: Math.atan2(_, x), S=t(E, T), M=S[0], D=S[1], A=M-e, N=D-n, P=b*A-y*N;
    (P*P/w>o||wa((y*A+b*N)/w-.5)>.3||s>a*f+l*p+u*g)&&(r(e, n, i, a, l, u, M, D, E, x/=C, _/=C, k, m, v), v.point(M, D), r(M, D, E, x, _, k, c, h, d, f, p, g, m, v));
}
}var o=.5, s=Math.cos(30*Wa), a=16;
    return e.precision=function(t) {
    return arguments.length?(a=(o=t*t)>0&&16, e): Math.sqrt(o);
}
, e;
}function ii(t) {
    var e=ni(function(e, n) {
    return t([e*Ba, n*Ba]);
}
);
    return function(t) {
    return li(e(t));
}
}function ri(t) {
    this.stream=t;
}
function oi(t, e) {
    return {
    point: e, sphere:function() {
    t.sphere();
}
, lineStart: function() {
    t.lineStart();
}
, lineEnd: function() {
    t.lineEnd();
}
, polygonStart: function() {
    t.polygonStart();
}
, polygonEnd: function() {
    t.polygonEnd();
}
}}function si(t) {
    return ai(function() {
    return t;
}
)();
}function ai(t) {
    function e(t) {
    return t=a(t[0]*Wa, t[1]*Wa), [t[0]*d+l, u-t[1]*d];
}
function n(t) {
    return t=a.invert((t[0]-l)/d, (u-t[1])/d), t&&[t[0]*Ba, t[1]*Ba];
}
function i() {
    a=Dn(s=hi(v, b, w), o);
    var t=o(g, m);
    return l=f-t[0]*d, u=p+t[1]*d, r();
}
function r() {
    return c&&(c.valid=!1, c=null), e;
}
var o, s, a, l, u, c, h=ni(function(t, e) {
    return t=o(t, e), [t[0]*d+l, u-t[1]*d];
}
), d=150, f=480, p=250, g=0, m=0, v=0, b=0, w=0, x=Rl, _=y, k=null, C=null;
    return e.stream=function(t) {
    return c&&(c.valid=!1), c=li(x(s, h(_(t)))), c.valid=!0, c;
}
, e.clipAngle=function(t) {
    return arguments.length?(x=null==t?(k=t, Rl): $n((k=+t)*Wa), r()):k;
}
, e.clipExtent=function(t) {
    return arguments.length?(C=t, _=t?Bn(t[0][0], t[0][1], t[1][0], t[1][1]): y, r()):C;
}
, e.scale=function(t) {
    return arguments.length?(d=+t, i()): d;
}
, e.translate=function(t) {
    return arguments.length?(f=+t[0], p=+t[1], i()): [f, p];
}
, e.center=function(t) {
    return arguments.length?(g=t[0]%360*Wa, m=t[1]%360*Wa, i()): [g*Ba, m*Ba];
}
, e.rotate=function(t) {
    return arguments.length?(v=t[0]%360*Wa, b=t[1]%360*Wa, w=t.length>2?t[2]%360*Wa: 0, i()):[v*Ba, b*Ba, w*Ba];
}
, la.rebind(e, h, "precision"), function() {
    return o=t.apply(this, arguments), e.invert=o.invert&&n, i();
}
}function li(t) {
    return oi(t, function(e, n) {
    t.point(e*Wa, n*Wa);
}
);
}function ui(t, e) {
    return[t, e];
}
function ci(t, e) {
    return[t>Ra?t-qa: -Ra>t?t+qa:t, e];
}
function hi(t, e, n) {
    return t?e||n?Dn(fi(t), pi(e, n)): fi(t):e||n?pi(e, n):ci;
}
function di(t) {
    return function(e, n) {
    return e+=t, [e>Ra?e-qa: -Ra>e?e+qa:e, n];
}
}function fi(t) {
    var e=di(t);
    return e.invert=di(-t), e;
}
function pi(t, e) {
    function n(t, e) {
    var n=Math.cos(e), a=Math.cos(t)*n, l=Math.sin(t)*n, u=Math.sin(e), c=u*i+a*r;
    return[Math.atan2(l*o-c*s, a*i-u*r), ee(c*o+l*s)];
}
var i=Math.cos(t), r=Math.sin(t), o=Math.cos(e), s=Math.sin(e);
    return n.invert=function(t, e) {
    var n=Math.cos(e), a=Math.cos(t)*n, l=Math.sin(t)*n, u=Math.sin(e), c=u*o-l*s;
    return[Math.atan2(l*o+u*s, a*i+c*r), ee(c*i-a*r)];
}
, n;
}function gi(t, e) {
    var n=Math.cos(t), i=Math.sin(t);
    return function(r, o, s, a) {
    var l=s*e;
    null!=r?(r=mi(n, r), o=mi(n, o), (s>0?o>r: r>o)&&(r+=s*qa)):(r=t+s*qa, o=t-.5*l);
    for(var u, c=r;
    s>0?c>o: o>c;
    c-=l)a.point((u=_n([n, -i*Math.cos(c), -i*Math.sin(c)]))[0], u[1]);
}
}function mi(t, e) {
    var n=mn(e);
    n[0]-=t, xn(n);
    var i=te(-n[1]);
    return((-n[2]<0?-i: i)+2*Math.PI-Ha)%(2*Math.PI);
}
function vi(t, e, n) {
    var i=la.range(t, e-Ha, n).concat(e);
    return function(t) {
    return i.map(function(e) {
    return[t, e];
}
);
}}function yi(t, e, n) {
    var i=la.range(t, e-Ha, n).concat(e);
    return function(t) {
    return i.map(function(e) {
    return[e, t];
}
);
}}function bi(t) {
    return t.source;
}
function wi(t) {
    return t.target;
}
function xi(t, e, n, i) {
    var r=Math.cos(e), o=Math.sin(e), s=Math.cos(i), a=Math.sin(i), l=r*Math.cos(t), u=r*Math.sin(t), c=s*Math.cos(n), h=s*Math.sin(n), d=2*Math.asin(Math.sqrt(oe(i-e)+r*s*oe(n-t))), f=1/Math.sin(d), p=d?function(t) {
    var e=Math.sin(t*=d)*f, n=Math.sin(d-t)*f, i=n*l+e*c, r=n*u+e*h, s=n*o+e*a;
    return[Math.atan2(r, i)*Ba, Math.atan2(s, Math.sqrt(i*i+r*r))*Ba];
}
: function() {
    return[t*Ba, e*Ba];
}
;
    return p.distance=d, p;
}
function _i() {
    function t(t, r) {
    var o=Math.sin(r*=Wa), s=Math.cos(r), a=wa((t*=Wa)-e), l=Math.cos(a);
    Gl+=Math.atan2(Math.sqrt((a=s*Math.sin(a))*a+(a=i*o-n*s*l)*a), n*o+i*s*l), e=t, n=o, i=s;
}
var e, n, i;
    Kl.point=function(r, o) {
    e=r*Wa, n=Math.sin(o*=Wa), i=Math.cos(o), Kl.point=t;
}
, Kl.lineEnd=function() {
    Kl.point=Kl.lineEnd=x;
}
}function ki(t, e) {
    function n(e, n) {
    var i=Math.cos(e), r=Math.cos(n), o=t(i*r);
    return[o*r*Math.sin(e), o*Math.sin(n)];
}
return n.invert=function(t, n) {
    var i=Math.sqrt(t*t+n*n), r=e(i), o=Math.sin(r), s=Math.cos(r);
    return[Math.atan2(t*o, i*s), Math.asin(i&&n*o/i)];
}
, n;
}function Ci(t, e) {
    function n(t, e) {
    s>0?-$a+Ha>e&&(e=-$a+Ha): e>$a-Ha&&(e=$a-Ha);
    var n=s/Math.pow(r(e), o);
    return[n*Math.sin(o*t), s-n*Math.cos(o*t)];
}
var i=Math.cos(t), r=function(t) {
    return Math.tan(Ra/4+t/2);
}
, o=t===e?Math.sin(t): Math.log(i/Math.cos(e))/Math.log(r(e)/r(t)), s=i*Math.pow(r(t), o)/o;
    return o?(n.invert=function(t, e) {
    var n=s-e, i=Z(o)*Math.sqrt(t*t+n*n);
    return[Math.atan2(t, n)/o, 2*Math.atan(Math.pow(s/i, 1/o))-$a];
}
, n): Ei;
}function Ti(t, e) {
    function n(t, e) {
    var n=o-e;
    return[n*Math.sin(r*t), o-n*Math.cos(r*t)];
}
var i=Math.cos(t), r=t===e?Math.sin(t): (i-Math.cos(e))/(e-t), o=i/r+t;
    return wa(r)<Ha?ui: (n.invert=function(t, e) {
    var n=o-e;
    return[Math.atan2(t, n)/r, o-Z(r)*Math.sqrt(t*t+n*n)];
}
, n);
}function Ei(t, e) {
    return[t, Math.log(Math.tan(Ra/4+e/2))];
}
function Si(t) {
    var e, n=si(t), i=n.scale, r=n.translate, o=n.clipExtent;
    return n.scale=function() {
    var t=i.apply(n, arguments);
    return t===n?e?n.clipExtent(null): n:t;
}
, n.translate=function() {
    var t=r.apply(n, arguments);
    return t===n?e?n.clipExtent(null): n:t;
}
, n.clipExtent=function(t) {
    var s=o.apply(n, arguments);
    if(s===n) {
    if(e=null==t) {
    var a=Ra*i(), l=r();
    o([[l[0]-a, l[1]-a], [l[0]+a, l[1]+a]]);
}
}else e&&(s=null);
    return s;
}
, n.clipExtent(null);
}function Mi(t, e) {
    return[Math.log(Math.tan(Ra/4+e/2)), -t];
}
function Di(t) {
    return t[0];
}
function Ai(t) {
    return t[1];
}
function Ni(t) {
    for(var e=t.length, n=[0, 1], i=2, r=2;
    e>r;
    r++) {
    for(;
    i>1&&J(t[n[i-2]], t[n[i-1]], t[r])<=0;
    )--i;
    n[i++]=r;
}
return n.slice(0, i);
}function Pi(t, e) {
    return t[0]-e[0]||t[1]-e[1];
}
function Oi(t, e, n) {
    return(n[0]-e[0])*(t[1]-e[1])<(n[1]-e[1])*(t[0]-e[0]);
}
function Ii(t, e, n, i) {
    var r=t[0], o=n[0], s=e[0]-r, a=i[0]-o, l=t[1], u=n[1], c=e[1]-l, h=i[1]-u, d=(a*(l-u)-h*(r-o))/(h*s-a*c);
    return[r+d*s, l+d*c];
}
function Li(t) {
    var e=t[0], n=t[t.length-1];
    return!(e[0]-n[0]||e[1]-n[1]);
}
function ji() {
    ir(this), this.edge=this.site=this.circle=null;
}
function Hi(t) {
    var e=uu.pop()||new ji;
    return e.site=t, e;
}
function zi(t) {
    Xi(t), su.remove(t), uu.push(t), ir(t);
}
function Ri(t) {
    var e=t.circle, n=e.x, i=e.cy, r= {
    x: n, y:i;
}
, o=t.P, s=t.N, a=[t];
    zi(t);
    for(var l=o;
    l.circle&&wa(n-l.circle.x)<Ha&&wa(i-l.circle.cy)<Ha;
    )o=l.P, a.unshift(l), zi(l), l=o;
    a.unshift(l), Xi(l);
    for(var u=s;
    u.circle&&wa(n-u.circle.x)<Ha&&wa(i-u.circle.cy)<Ha;
    )s=u.N, a.push(u), zi(u), u=s;
    a.push(u), Xi(u);
    var c, h=a.length;
    for(c=1;
    h>c;
    ++c)u=a[c], l=a[c-1], tr(u.edge, l.site, u.site, r);
    l=a[0], u=a[h-1], u.edge=Zi(l.site, u.site, null, r), Ui(l), Ui(u);
}
function qi(t) {
    for(var e, n, i, r, o=t.x, s=t.y, a=su._;
    a;
    )if(i=Fi(a, s)-o, i>Ha)a=a.L;
    else {
    if(r=o-$i(a, s), !(r>Ha)) {
    i>-Ha?(e=a.P, n=a): r>-Ha?(e=a, n=a.N):e=n=a;
    break;
}
if(!a.R) {
    e=a;
    break;
}
a=a.R;
}var l=Hi(t);
    if(su.insert(e, l), e||n) {
    if(e===n)return Xi(e), n=Hi(e.site), su.insert(l, n), l.edge=n.edge=Zi(e.site, l.site), Ui(e), void Ui(n);
    if(!n)return void(l.edge=Zi(e.site, l.site));
    Xi(e), Xi(n);
    var u=e.site, c=u.x, h=u.y, d=t.x-c, f=t.y-h, p=n.site, g=p.x-c, m=p.y-h, v=2*(d*m-f*g), y=d*d+f*f, b=g*g+m*m, w= {
    x: (m*y-f*b)/v+c, y:(d*b-g*y)/v+h;
}
;
    tr(n.edge, u, p, w), l.edge=Zi(u, t, null, w), n.edge=Zi(t, p, null, w), Ui(e), Ui(n);
}
}function Fi(t, e) {
    var n=t.site, i=n.x, r=n.y, o=r-e;
    if(!o)return i;
    var s=t.P;
    if(!s)return-(1/0);
    n=s.site;
    var a=n.x, l=n.y, u=l-e;
    if(!u)return a;
    var c=a-i, h=1/o-1/u, d=c/u;
    return h?(-d+Math.sqrt(d*d-2*h*(c*c/(-2*u)-l+u/2+r-o/2)))/h+i: (i+a)/2;
}
function $i(t, e) {
    var n=t.N;
    if(n)return Fi(n, e);
    var i=t.site;
    return i.y===e?i.x: 1/0;
}
function Wi(t) {
    this.site=t, this.edges=[];
}
function Bi(t) {
    for(var e, n, i, r, o, s, a, l, u, c, h=t[0][0], d=t[1][0], f=t[0][1], p=t[1][1], g=ou, m=g.length;
    m--;
    )if(o=g[m], o&&o.prepare())for(a=o.edges, l=a.length, s=0;
    l>s;
    )c=a[s].end(), i=c.x, r=c.y, u=a[++s%l].start(), e=u.x, n=u.y, (wa(i-e)>Ha||wa(r-n)>Ha)&&(a.splice(s, 0, new er(Ji(o.site, c, wa(i-h)<Ha&&p-r>Ha? {
    x: h, y:wa(e-h)<Ha?n:p;
}
:wa(r-p)<Ha&&d-i>Ha? {
    x: wa(n-p)<Ha?e:d, y:p;
}
:wa(i-d)<Ha&&r-f>Ha? {
    x: d, y:wa(e-d)<Ha?n:f;
}
:wa(r-f)<Ha&&i-h>Ha? {
    x: wa(n-f)<Ha?e:h, y:f;
}
:null), o.site, null)), ++l);
}function Vi(t, e) {
    return e.angle-t.angle;
}
function Yi() {
    ir(this), this.x=this.y=this.arc=this.site=this.cy=null;
}
function Ui(t) {
    var e=t.P, n=t.N;
    if(e&&n) {
    var i=e.site, r=t.site, o=n.site;
    if(i!==o) {
    var s=r.x, a=r.y, l=i.x-s, u=i.y-a, c=o.x-s, h=o.y-a, d=2*(l*h-u*c);
    if(!(d>=-za)) {
    var f=l*l+u*u, p=c*c+h*h, g=(h*f-u*p)/d, m=(l*p-c*f)/d, h=m+a, v=cu.pop()||new Yi;
    v.arc=t, v.site=r, v.x=g+s, v.y=h+Math.sqrt(g*g+m*m), v.cy=h, t.circle=v;
    for(var y=null, b=lu._;
    b;
    )if(v.y<b.y||v.y===b.y&&v.x<=b.x) {
    if(!b.L) {
    y=b.P;
    break;
}
b=b.L;
}else {
    if(!b.R) {
    y=b;
    break;
}
b=b.R;
}lu.insert(y, v), y||(au=v);
}}}}function Xi(t) {
    var e=t.circle;
    e&&(e.P||(au=e.N), lu.remove(e), cu.push(e), ir(e), t.circle=null);
}
function Qi(t) {
    for(var e, n=ru, i=Wn(t[0][0], t[0][1], t[1][0], t[1][1]), r=n.length;
    r--;
    )e=n[r], (!Gi(e, t)||!i(e)||wa(e.a.x-e.b.x)<Ha&&wa(e.a.y-e.b.y)<Ha)&&(e.a=e.b=null, n.splice(r, 1));
}
function Gi(t, e) {
    var n=t.b;
    if(n)return!0;
    var i, r, o=t.a, s=e[0][0], a=e[1][0], l=e[0][1], u=e[1][1], c=t.l, h=t.r, d=c.x, f=c.y, p=h.x, g=h.y, m=(d+p)/2, v=(f+g)/2;
    if(g===f) {
    if(s>m||m>=a)return;
    if(d>p) {
    if(o) {
    if(o.y>=u)return;
}
else o= {
    x: m, y:l;
}
;
    n= {
    x: m, y:u;
}
}else {
    if(o) {
    if(o.y<l)return;
}
else o= {
    x: m, y:u;
}
;
    n= {
    x: m, y:l;
}
}}else if(i=(d-p)/(g-f), r=v-i*m, -1>i||i>1)if(d>p) {
    if(o) {
    if(o.y>=u)return;
}
else o= {
    x: (l-r)/i, y:l;
}
;
    n= {
    x: (u-r)/i, y:u;
}
}else {
    if(o) {
    if(o.y<l)return;
}
else o= {
    x: (u-r)/i, y:u;
}
;
    n= {
    x: (l-r)/i, y:l;
}
}else if(g>f) {
    if(o) {
    if(o.x>=a)return;
}
else o= {
    x: s, y:i*s+r;
}
;
    n= {
    x: a, y:i*a+r;
}
}else {
    if(o) {
    if(o.x<s)return;
}
else o= {
    x: a, y:i*a+r;
}
;
    n= {
    x: s, y:i*s+r;
}
}return t.a=o, t.b=n, !0;
}function Ki(t, e) {
    this.l=t, this.r=e, this.a=this.b=null;
}
function Zi(t, e, n, i) {
    var r=new Ki(t, e);
    return ru.push(r), n&&tr(r, t, e, n), i&&tr(r, e, t, i), ou[t.i].edges.push(new er(r, t, e)), ou[e.i].edges.push(new er(r, e, t)), r;
}
function Ji(t, e, n) {
    var i=new Ki(t, null);
    return i.a=e, i.b=n, ru.push(i), i;
}
function tr(t, e, n, i) {
    t.a||t.b?t.l===n?t.b=i: t.a=i:(t.a=i, t.l=e, t.r=n);
}
function er(t, e, n) {
    var i=t.a, r=t.b;
    this.edge=t, this.site=e, this.angle=n?Math.atan2(n.y-e.y, n.x-e.x): t.l===e?Math.atan2(r.x-i.x, i.y-r.y):Math.atan2(i.x-r.x, r.y-i.y);
}
function nr() {
    this._=null;
}
function ir(t) {
    t.U=t.C=t.L=t.R=t.P=t.N=null;
}
function rr(t, e) {
    var n=e, i=e.R, r=n.U;
    r?r.L===n?r.L=i: r.R=i:t._=i, i.U=r, n.U=i, n.R=i.L, n.R&&(n.R.U=n), i.L=n;
}
function or(t, e) {
    var n=e, i=e.L, r=n.U;
    r?r.L===n?r.L=i: r.R=i:t._=i, i.U=r, n.U=i, n.L=i.R, n.L&&(n.L.U=n), i.R=n;
}
function sr(t) {
    for(;
    t.L;
    )t=t.L;
    return t;
}
function ar(t, e) {
    var n, i, r, o=t.sort(lr).pop();
    for(ru=[], ou=new Array(t.length), su=new nr, lu=new nr;
    ;
    )if(r=au, o&&(!r||o.y<r.y||o.y===r.y&&o.x<r.x))o.x===n&&o.y===i||(ou[o.i]=new Wi(o), qi(o), n=o.x, i=o.y), o=t.pop();
    else {
    if(!r)break;
    Ri(r.arc);
}
e&&(Qi(e), Bi(e));
    var s= {
    cells: ou, edges:ru;
}
;
    return su=lu=ru=ou=null, s;
}
function lr(t, e) {
    return e.y-t.y||e.x-t.x;
}
function ur(t, e, n) {
    return(t.x-n.x)*(e.y-t.y)-(t.x-e.x)*(n.y-t.y);
}
function cr(t) {
    return t.x;
}
function hr(t) {
    return t.y;
}
function dr() {
    return {
    leaf: !0, nodes:[], point:null, x:null, y:null;
}
}function fr(t, e, n, i, r, o) {
    if(!t(e, n, i, r, o)) {
    var s=.5*(n+r), a=.5*(i+o), l=e.nodes;
    l[0]&&fr(t, l[0], n, i, s, a), l[1]&&fr(t, l[1], s, i, r, a), l[2]&&fr(t, l[2], n, a, s, o), l[3]&&fr(t, l[3], s, a, r, o);
}
}function pr(t, e, n, i, r, o, s) {
    var a, l=1/0;
    return function u(t, c, h, d, f) {
    if(!(c>o||h>s||i>d||r>f)) {
    if(p=t.point) {
    var p, g=e-t.x, m=n-t.y, v=g*g+m*m;
    if(l>v) {
    var y=Math.sqrt(l=v);
    i=e-y, r=n-y, o=e+y, s=n+y, a=p;
}
}for(var b=t.nodes, w=.5*(c+d), x=.5*(h+f), _=e>=w, k=n>=x, C=k<<1|_, T=C+4;
    T>C;
    ++C)if(t=b[3&C])switch(3&C) {
    case 0: u(t, c, h, w, x);
    break;
    case 1: u(t, w, h, d, x);
    break;
    case 2: u(t, c, x, w, f);
    break;
    case 3: u(t, w, x, d, f);
}
}}(t, i, r, o, s), a;
}function gr(t, e) {
    t=la.rgb(t), e=la.rgb(e);
    var n=t.r, i=t.g, r=t.b, o=e.r-n, s=e.g-i, a=e.b-r;
    return function(t) {
    return"#"+we(Math.round(n+o*t))+we(Math.round(i+s*t))+we(Math.round(r+a*t));
}
}function mr(t, e) {
    var n, i= {
}
, r= {
}
;
    for(n in t)n in e?i[n]=br(t[n], e[n]): r[n]=t[n];
    for(n in e)n in t||(r[n]=e[n]);
    return function(t) {
    for(n in i)r[n]=i[n](t);
    return r;
}
}function vr(t, e) {
    return t=+t, e=+e, function(n) {
    return t*(1-n)+e*n;
}
}function yr(t, e) {
    var n, i, r, o=du.lastIndex=fu.lastIndex=0, s=-1, a=[], l=[];
    for(t+="", e+="";
    (n=du.exec(t))&&(i=fu.exec(e));
    )(r=i.index)>o&&(r=e.slice(o, r), a[s]?a[s]+=r: a[++s]=r), (n=n[0])===(i=i[0])?a[s]?a[s]+=i:a[++s]=i:(a[++s]=null, l.push( {
    i: s, x:vr(n, i);
}
)), o=fu.lastIndex;
    return o<e.length&&(r=e.slice(o), a[s]?a[s]+=r: a[++s]=r), a.length<2?l[0]?(e=l[0].x, function(t) {
    return e(t)+""}
): function() {
    return e;
}
: (e=l.length, function(t) {
    for(var n, i=0;
    e>i;
    ++i)a[(n=l[i]).i]=n.x(t);
    return a.join("");
}
);
}function br(t, e) {
    for(var n, i=la.interpolators.length;
    --i>=0&&!(n=la.interpolators[i](t, e));
    );
    return n;
}
function wr(t, e) {
    var n, i=[], r=[], o=t.length, s=e.length, a=Math.min(t.length, e.length);
    for(n=0;
    a>n;
    ++n)i.push(br(t[n], e[n]));
    for(;
    o>n;
    ++n)r[n]=t[n];
    for(;
    s>n;
    ++n)r[n]=e[n];
    return function(t) {
    for(n=0;
    a>n;
    ++n)r[n]=i[n](t);
    return r;
}
}function xr(t) {
    return function(e) {
    return 0>=e?0: e>=1?1:t(e);
}
}function _r(t) {
    return function(e) {
    return 1-t(1-e);
}
}function kr(t) {
    return function(e) {
    return.5*(.5>e?t(2*e): 2-t(2-2*e));
}
}function Cr(t) {
    return t*t;
}
function Tr(t) {
    return t*t*t;
}
function Er(t) {
    if(0>=t)return 0;
    if(t>=1)return 1;
    var e=t*t, n=e*t;
    return 4*(.5>t?n: 3*(t-e)+n-.75);
}
function Sr(t) {
    return function(e) {
    return Math.pow(e, t);
}
}function Mr(t) {
    return 1-Math.cos(t*$a);
}
function Dr(t) {
    return Math.pow(2, 10*(t-1));
}
function Ar(t) {
    return 1-Math.sqrt(1-t*t);
}
function Nr(t, e) {
    var n;
    return arguments.length<2&&(e=.45), arguments.length?n=e/qa*Math.asin(1/t): (t=1, n=e/4), function(i) {
    return 1+t*Math.pow(2, -10*i)*Math.sin((i-n)*qa/e);
}
}function Pr(t) {
    return t||(t=1.70158), function(e) {
    return e*e*((t+1)*e-t);
}
}function Or(t) {
    return 1/2.75>t?7.5625*t*t: 2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;
}
function Ir(t, e) {
    t=la.hcl(t), e=la.hcl(e);
    var n=t.h, i=t.c, r=t.l, o=e.h-n, s=e.c-i, a=e.l-r;
    return isNaN(s)&&(s=0, i=isNaN(i)?e.c: i), isNaN(o)?(o=0, n=isNaN(n)?e.h:n):o>180?o-=360:-180>o&&(o+=360), function(t) {
    return ce(n+o*t, i+s*t, r+a*t)+""}
}function Lr(t, e) {
    t=la.hsl(t), e=la.hsl(e);
    var n=t.h, i=t.s, r=t.l, o=e.h-n, s=e.s-i, a=e.l-r;
    return isNaN(s)&&(s=0, i=isNaN(i)?e.s: i), isNaN(o)?(o=0, n=isNaN(n)?e.h:n):o>180?o-=360:-180>o&&(o+=360), function(t) {
    return le(n+o*t, i+s*t, r+a*t)+""}
}function jr(t, e) {
    t=la.lab(t), e=la.lab(e);
    var n=t.l, i=t.a, r=t.b, o=e.l-n, s=e.a-i, a=e.b-r;
    return function(t) {
    return de(n+o*t, i+s*t, r+a*t)+""}
}function Hr(t, e) {
    return e-=t, function(n) {
    return Math.round(t+e*n);
}
}function zr(t) {
    var e=[t.a, t.b], n=[t.c, t.d], i=qr(e), r=Rr(e, n), o=qr(Fr(n, e, -r))||0;
    e[0]*n[1]<n[0]*e[1]&&(e[0]*=-1, e[1]*=-1, i*=-1, r*=-1), this.rotate=(i?Math.atan2(e[1], e[0]): Math.atan2(-n[0], n[1]))*Ba, this.translate=[t.e, t.f], this.scale=[i, o], this.skew=o?Math.atan2(r, o)*Ba:0;
}
function Rr(t, e) {
    return t[0]*e[0]+t[1]*e[1];
}
function qr(t) {
    var e=Math.sqrt(Rr(t, t));
    return e&&(t[0]/=e, t[1]/=e), e;
}
function Fr(t, e, n) {
    return t[0]+=n*e[0], t[1]+=n*e[1], t;
}
function $r(t) {
    return t.length?t.pop()+", ": ""}
function Wr(t, e, n, i) {
    if(t[0]!==e[0]||t[1]!==e[1]) {
    var r=n.push("translate(", null, ", ", null, ")");
    i.push( {
    i: r-4, x:vr(t[0], e[0]);
}
,  {
    i: r-2, x:vr(t[1], e[1]);
}
);
}else(e[0]||e[1])&&n.push("translate("+e+")");
}function Br(t, e, n, i) {
    t!==e?(t-e>180?e+=360: e-t>180&&(t+=360), i.push( {
    i: n.push($r(n)+"rotate(", null, ")")-2, x:vr(t, e);
}
)):e&&n.push($r(n)+"rotate("+e+")");
}function Vr(t, e, n, i) {
    t!==e?i.push( {
    i: n.push($r(n)+"skewX(", null, ")")-2, x:vr(t, e);
}
):e&&n.push($r(n)+"skewX("+e+")");
}function Yr(t, e, n, i) {
    if(t[0]!==e[0]||t[1]!==e[1]) {
    var r=n.push($r(n)+"scale(", null, ", ", null, ")");
    i.push( {
    i: r-4, x:vr(t[0], e[0]);
}
,  {
    i: r-2, x:vr(t[1], e[1]);
}
);
}else 1===e[0]&&1===e[1]||n.push($r(n)+"scale("+e+")");
}function Ur(t, e) {
    var n=[], i=[];
    return t=la.transform(t), e=la.transform(e), Wr(t.translate, e.translate, n, i), Br(t.rotate, e.rotate, n, i), Vr(t.skew, e.skew, n, i), Yr(t.scale, e.scale, n, i), t=e=null, function(t) {
    for(var e, r=-1, o=i.length;
    ++r<o;
    )n[(e=i[r]).i]=e.x(t);
    return n.join("");
}
}function Xr(t, e) {
    return e=(e-=t=+t)||1/e, function(n) {
    return(n-t)/e;
}
}function Qr(t, e) {
    return e=(e-=t=+t)||1/e, function(n) {
    return Math.max(0, Math.min(1, (n-t)/e));
}
}function Gr(t) {
    for(var e=t.source, n=t.target, i=Zr(e, n), r=[e];
    e!==i;
    )e=e.parent, r.push(e);
    for(var o=r.length;
    n!==i;
    )r.splice(o, 0, n), n=n.parent;
    return r;
}
function Kr(t) {
    for(var e=[], n=t.parent;
    null!=n;
    )e.push(t), t=n, n=n.parent;
    return e.push(t), e;
}
function Zr(t, e) {
    if(t===e)return t;
    for(var n=Kr(t), i=Kr(e), r=n.pop(), o=i.pop(), s=null;
    r===o;
    )s=r, r=n.pop(), o=i.pop();
    return s;
}
function Jr(t) {
    t.fixed|=2;
}
function to(t) {
    t.fixed&=-7;
}
function eo(t) {
    t.fixed|=4, t.px=t.x, t.py=t.y;
}
function no(t) {
    t.fixed&=-5;
}
function io(t, e, n) {
    var i=0, r=0;
    if(t.charge=0, !t.leaf)for(var o, s=t.nodes, a=s.length, l=-1;
    ++l<a;
    )o=s[l], null!=o&&(io(o, e, n), t.charge+=o.charge, i+=o.charge*o.cx, r+=o.charge*o.cy);
    if(t.point) {
    t.leaf||(t.point.x+=Math.random()-.5, t.point.y+=Math.random()-.5);
    var u=e*n[t.point.index];
    t.charge+=t.pointCharge=u, i+=u*t.point.x, r+=u*t.point.y;
}
t.cx=i/t.charge, t.cy=r/t.charge;
}function ro(t, e) {
    return la.rebind(t, e, "sort", "children", "value"), t.nodes=t, t.links=co, t;
}
function oo(t, e) {
    for(var n=[t];
    null!=(t=n.pop());
    )if(e(t), (r=t.children)&&(i=r.length))for(var i, r;
    --i>=0;
    )n.push(r[i]);
}
function so(t, e) {
    for(var n=[t], i=[];
    null!=(t=n.pop());
    )if(i.push(t), (o=t.children)&&(r=o.length))for(var r, o, s=-1;
    ++s<r;
    )n.push(o[s]);
    for(;
    null!=(t=i.pop());
    )e(t);
}
function ao(t) {
    return t.children;
}
function lo(t) {
    return t.value;
}
function uo(t, e) {
    return e.value-t.value;
}
function co(t) {
    return la.merge(t.map(function(t) {
    return(t.children||[]).map(function(e) {
    return {
    source: t, target:e;
}
});
}));
}function ho(t) {
    return t.x;
}
function fo(t) {
    return t.y;
}
function po(t, e, n) {
    t.y0=e, t.y=n;
}
function go(t) {
    return la.range(t.length);
}
function mo(t) {
    for(var e=-1, n=t[0].length, i=[];
    ++e<n;
    )i[e]=0;
    return i;
}
function vo(t) {
    for(var e, n=1, i=0, r=t[0][1], o=t.length;
    o>n;
    ++n)(e=t[n][1])>r&&(i=n, r=e);
    return i;
}
function yo(t) {
    return t.reduce(bo, 0);
}
function bo(t, e) {
    return t+e[1];
}
function wo(t, e) {
    return xo(t, Math.ceil(Math.log(e.length)/Math.LN2+1));
}
function xo(t, e) {
    for(var n=-1, i=+t[0], r=(t[1]-i)/e, o=[];
    ++n<=e;
    )o[n]=r*n+i;
    return o;
}
function _o(t) {
    return[la.min(t), la.max(t)];
}
function ko(t, e) {
    return t.value-e.value;
}
function Co(t, e) {
    var n=t._pack_next;
    t._pack_next=e, e._pack_prev=t, e._pack_next=n, n._pack_prev=e;
}
function To(t, e) {
    t._pack_next=e, e._pack_prev=t;
}
function Eo(t, e) {
    var n=e.x-t.x, i=e.y-t.y, r=t.r+e.r;
    return.999*r*r>n*n+i*i;
}
function So(t) {
    function e(t) {
    c=Math.min(t.x-t.r, c), h=Math.max(t.x+t.r, h), d=Math.min(t.y-t.r, d), f=Math.max(t.y+t.r, f);
}
if((n=t.children)&&(u=n.length)) {
    var n, i, r, o, s, a, l, u, c=1/0, h=-(1/0), d=1/0, f=-(1/0);
    if(n.forEach(Mo), i=n[0], i.x=-i.r, i.y=0, e(i), u>1&&(r=n[1], r.x=r.r, r.y=0, e(r), u>2))for(o=n[2], No(i, r, o), e(o), Co(i, o), i._pack_prev=o, Co(o, r), r=i._pack_next, s=3;
    u>s;
    s++) {
    No(i, r, o=n[s]);
    var p=0, g=1, m=1;
    for(a=r._pack_next;
    a!==r;
    a=a._pack_next, g++)if(Eo(a, o)) {
    p=1;
    break;
}
if(1==p)for(l=i._pack_prev;
    l!==a._pack_prev&&!Eo(l, o);
    l=l._pack_prev, m++);
    p?(m>g||g==m&&r.r<i.r?To(i, r=a): To(i=l, r), s--):(Co(i, o), r=o, e(o));
}
var v=(c+h)/2, y=(d+f)/2, b=0;
    for(s=0;
    u>s;
    s++)o=n[s], o.x-=v, o.y-=y, b=Math.max(b, o.r+Math.sqrt(o.x*o.x+o.y*o.y));
    t.r=b, n.forEach(Do);
}
}function Mo(t) {
    t._pack_next=t._pack_prev=t;
}
function Do(t) {
    delete t._pack_next, delete t._pack_prev;
}
function Ao(t, e, n, i) {
    var r=t.children;
    if(t.x=e+=i*t.x, t.y=n+=i*t.y, t.r*=i, r)for(var o=-1, s=r.length;
    ++o<s;
    )Ao(r[o], e, n, i);
}
function No(t, e, n) {
    var i=t.r+n.r, r=e.x-t.x, o=e.y-t.y;
    if(i&&(r||o)) {
    var s=e.r+n.r, a=r*r+o*o;
    s*=s, i*=i;
    var l=.5+(i-s)/(2*a), u=Math.sqrt(Math.max(0, 2*s*(i+a)-(i-=a)*i-s*s))/(2*a);
    n.x=t.x+l*r+u*o, n.y=t.y+l*o-u*r;
}
else n.x=t.x+i, n.y=t.y;
}function Po(t, e) {
    return t.parent==e.parent?1: 2;
}
function Oo(t) {
    var e=t.children;
    return e.length?e[0]: t.t;
}
function Io(t) {
    var e, n=t.children;
    return(e=n.length)?n[e-1]: t.t;
}
function Lo(t, e, n) {
    var i=n/(e.i-t.i);
    e.c-=i, e.s+=n, t.c+=i, e.z+=n, e.m+=n;
}
function jo(t) {
    for(var e, n=0, i=0, r=t.children, o=r.length;
    --o>=0;
    )e=r[o], e.z+=n, e.m+=n, n+=e.s+(i+=e.c);
}
function Ho(t, e, n) {
    return t.a.parent===e.parent?t.a: n;
}
function zo(t) {
    return 1+la.max(t, function(t) {
    return t.y;
}
);
}function Ro(t) {
    return t.reduce(function(t, e) {
    return t+e.x;
}
, 0)/t.length;
}function qo(t) {
    var e=t.children;
    return e&&e.length?qo(e[0]): t;
}
function Fo(t) {
    var e, n=t.children;
    return n&&(e=n.length)?Fo(n[e-1]): t;
}
function $o(t) {
    return {
    x: t.x, y:t.y, dx:t.dx, dy:t.dy;
}
}function Wo(t, e) {
    var n=t.x+e[3], i=t.y+e[0], r=t.dx-e[1]-e[3], o=t.dy-e[0]-e[2];
    return 0>r&&(n+=r/2, r=0), 0>o&&(i+=o/2, o=0),  {
    x: n, y:i, dx:r, dy:o;
}
}function Bo(t) {
    var e=t[0], n=t[t.length-1];
    return n>e?[e, n]: [n, e];
}
function Vo(t) {
    return t.rangeExtent?t.rangeExtent(): Bo(t.range());
}
function Yo(t, e, n, i) {
    var r=n(t[0], t[1]), o=i(e[0], e[1]);
    return function(t) {
    return o(r(t));
}
}function Uo(t, e) {
    var n, i=0, r=t.length-1, o=t[i], s=t[r];
    return o>s&&(n=i, i=r, r=n, n=o, o=s, s=n), t[i]=e.floor(o), t[r]=e.ceil(s), t;
}
function Xo(t) {
    return t? {
    floor: function(e) {
    return Math.floor(e/t)*t;
}
, ceil: function(e) {
    return Math.ceil(e/t)*t;
}
}: Cu;
}function Qo(t, e, n, i) {
    var r=[], o=[], s=0, a=Math.min(t.length, e.length)-1;
    for(t[a]<t[0]&&(t=t.slice().reverse(), e=e.slice().reverse());
    ++s<=a;
    )r.push(n(t[s-1], t[s])), o.push(i(e[s-1], e[s]));
    return function(e) {
    var n=la.bisect(t, e, 1, a)-1;
    return o[n](r[n](e));
}
}function Go(t, e, n, i) {
    function r() {
    var r=Math.min(t.length, e.length)>2?Qo: Yo, l=i?Qr:Xr;
    return s=r(t, e, l, n), a=r(e, t, l, br), o;
}
function o(t) {
    return s(t);
}
var s, a;
    return o.invert=function(t) {
    return a(t);
}
, o.domain=function(e) {
    return arguments.length?(t=e.map(Number), r()): t;
}
, o.range=function(t) {
    return arguments.length?(e=t, r()): e;
}
, o.rangeRound=function(t) {
    return o.range(t).interpolate(Hr);
}
, o.clamp=function(t) {
    return arguments.length?(i=t, r()): i;
}
, o.interpolate=function(t) {
    return arguments.length?(n=t, r()): n;
}
, o.ticks=function(e) {
    return ts(t, e);
}
, o.tickFormat=function(e, n) {
    return es(t, e, n);
}
, o.nice=function(e) {
    return Zo(t, e), r();
}
, o.copy=function() {
    return Go(t, e, n, i);
}
, r();
}function Ko(t, e) {
    return la.rebind(t, e, "range", "rangeRound", "interpolate", "clamp");
}
function Zo(t, e) {
    return Uo(t, Xo(Jo(t, e)[2])), Uo(t, Xo(Jo(t, e)[2])), t;
}
function Jo(t, e) {
    null==e&&(e=10);
    var n=Bo(t), i=n[1]-n[0], r=Math.pow(10, Math.floor(Math.log(i/e)/Math.LN10)), o=e/i*r;
    return.15>=o?r*=10: .35>=o?r*=5:.75>=o&&(r*=2), n[0]=Math.ceil(n[0]/r)*r, n[1]=Math.floor(n[1]/r)*r+.5*r, n[2]=r, n;
}
function ts(t, e) {
    return la.range.apply(la, Jo(t, e));
}
function es(t, e, n) {
    var i=Jo(t, e);
    if(n) {
    var r=dl.exec(n);
    if(r.shift(), "s"===r[8]) {
    var o=la.formatPrefix(Math.max(wa(i[0]), wa(i[1])));
    return r[7]||(r[7]="."+ns(o.scale(i[2]))), r[8]="f", n=la.format(r.join("")), function(t) {
    return n(o.scale(t))+o.symbol;
}
}r[7]||(r[7]="."+is(r[8], i)), n=r.join("");
}else n=", ."+ns(i[2])+"f";
    return la.format(n);
}
function ns(t) {
    return-Math.floor(Math.log(t)/Math.LN10+.01);
}
function is(t, e) {
    var n=ns(e[2]);
    return t in Tu?Math.abs(n-ns(Math.max(wa(e[0]), wa(e[1]))))+ +("e"!==t): n-2*("%"===t);
}
function rs(t, e, n, i) {
    function r(t) {
    return(n?Math.log(0>t?0: t):-Math.log(t>0?0:-t))/Math.log(e);
}
function o(t) {
    return n?Math.pow(e, t): -Math.pow(e, -t);
}
function s(e) {
    return t(r(e));
}
return s.invert=function(e) {
    return o(t.invert(e));
}
, s.domain=function(e) {
    return arguments.length?(n=e[0]>=0, t.domain((i=e.map(Number)).map(r)), s): i;
}
, s.base=function(n) {
    return arguments.length?(e=+n, t.domain(i.map(r)), s): e;
}
, s.nice=function() {
    var e=Uo(i.map(r), n?Math: Su);
    return t.domain(e), i=e.map(o), s;
}
, s.ticks=function() {
    var t=Bo(i), s=[], a=t[0], l=t[1], u=Math.floor(r(a)), c=Math.ceil(r(l)), h=e%1?2: e;
    if(isFinite(c-u)) {
    if(n) {
    for(;
    c>u;
    u++)for(var d=1;
    h>d;
    d++)s.push(o(u)*d);
    s.push(o(u));
}
else for(s.push(o(u));
    u++<c;
    )for(var d=h-1;
    d>0;
    d--)s.push(o(u)*d);
    for(u=0;
    s[u]<a;
    u++);
    for(c=s.length;
    s[c-1]>l;
    c--);
    s=s.slice(u, c);
}
return s;
}, s.tickFormat=function(t, n) {
    if(!arguments.length)return Eu;
    arguments.length<2?n=Eu: "function"!=typeof n&&(n=la.format(n));
    var i=Math.max(1, e*t/s.ticks().length);
    return function(t) {
    var s=t/o(Math.round(r(t)));
    return e-.5>s*e&&(s*=e), i>=s?n(t): ""}
}, s.copy=function() {
    return rs(t.copy(), e, n, i);
}
, Ko(s, t);
}function os(t, e, n) {
    function i(e) {
    return t(r(e));
}
var r=ss(e), o=ss(1/e);
    return i.invert=function(e) {
    return o(t.invert(e));
}
, i.domain=function(e) {
    return arguments.length?(t.domain((n=e.map(Number)).map(r)), i): n;
}
, i.ticks=function(t) {
    return ts(n, t);
}
, i.tickFormat=function(t, e) {
    return es(n, t, e);
}
, i.nice=function(t) {
    return i.domain(Zo(n, t));
}
, i.exponent=function(s) {
    return arguments.length?(r=ss(e=s), o=ss(1/e), t.domain(n.map(r)), i): e;
}
, i.copy=function() {
    return os(t.copy(), e, n);
}
, Ko(i, t);
}function ss(t) {
    return function(e) {
    return 0>e?-Math.pow(-e, t): Math.pow(e, t);
}
}function as(t, e) {
    function n(n) {
    return o[((r.get(n)||("range"===e.t?r.set(n, t.push(n)): 0/0))-1)%o.length];
}
function i(e, n) {
    return la.range(t.length).map(function(t) {
    return e+n*t;
}
);
}var r, o, s;
    return n.domain=function(i) {
    if(!arguments.length)return t;
    t=[], r=new u;
    for(var o, s=-1, a=i.length;
    ++s<a;
    )r.has(o=i[s])||r.set(o, t.push(o));
    return n[e.t].apply(n, e.a);
}
, n.range=function(t) {
    return arguments.length?(o=t, s=0, e= {
    t: "range", a:arguments;
}
, n):o;
}, n.rangePoints=function(r, a) {
    arguments.length<2&&(a=0);
    var l=r[0], u=r[1], c=t.length<2?(l=(l+u)/2, 0): (u-l)/(t.length-1+a);
    return o=i(l+c*a/2, c), s=0, e= {
    t: "rangePoints", a:arguments;
}
, n;
}, n.rangeRoundPoints=function(r, a) {
    arguments.length<2&&(a=0);
    var l=r[0], u=r[1], c=t.length<2?(l=u=Math.round((l+u)/2), 0): (u-l)/(t.length-1+a)|0;
    return o=i(l+Math.round(c*a/2+(u-l-(t.length-1+a)*c)/2), c), s=0, e= {
    t: "rangeRoundPoints", a:arguments;
}
, n;
}, n.rangeBands=function(r, a, l) {
    arguments.length<2&&(a=0), arguments.length<3&&(l=a);
    var u=r[1]<r[0], c=r[u-0], h=r[1-u], d=(h-c)/(t.length-a+2*l);
    return o=i(c+d*l, d), u&&o.reverse(), s=d*(1-a), e= {
    t: "rangeBands", a:arguments;
}
, n;
}, n.rangeRoundBands=function(r, a, l) {
    arguments.length<2&&(a=0), arguments.length<3&&(l=a);
    var u=r[1]<r[0], c=r[u-0], h=r[1-u], d=Math.floor((h-c)/(t.length-a+2*l));
    return o=i(c+Math.round((h-c-(t.length-a)*d)/2), d), u&&o.reverse(), s=Math.round(d*(1-a)), e= {
    t: "rangeRoundBands", a:arguments;
}
, n;
}, n.rangeBand=function() {
    return s;
}
, n.rangeExtent=function() {
    return Bo(e.a[0]);
}
, n.copy=function() {
    return as(t, e);
}
, n.domain(t);
}function ls(t, e) {
    function o() {
    var n=0, i=e.length;
    for(a=[];
    ++n<i;
    )a[n-1]=la.quantile(t, n/i);
    return s;
}
function s(t) {
    return isNaN(t=+t)?void 0: e[la.bisect(a, t)];
}
var a;
    return s.domain=function(e) {
    return arguments.length?(t=e.map(i).filter(r).sort(n), o()): t;
}
, s.range=function(t) {
    return arguments.length?(e=t, o()): e;
}
, s.quantiles=function() {
    return a;
}
, s.invertExtent=function(n) {
    return n=e.indexOf(n), 0>n?[0/0, 0/0]: [n>0?a[n-1]:t[0], n<a.length?a[n]:t[t.length-1]];
}
, s.copy=function() {
    return ls(t, e);
}
, o();
}function us(t, e, n) {
    function i(e) {
    return n[Math.max(0, Math.min(s, Math.floor(o*(e-t))))];
}
function r() {
    return o=n.length/(e-t), s=n.length-1, i;
}
var o, s;
    return i.domain=function(n) {
    return arguments.length?(t=+n[0], e=+n[n.length-1], r()): [t, e];
}
, i.range=function(t) {
    return arguments.length?(n=t, r()): n;
}
, i.invertExtent=function(e) {
    return e=n.indexOf(e), e=0>e?0/0: e/o+t, [e, e+1/o];
}
, i.copy=function() {
    return us(t, e, n);
}
, r();
}function cs(t, e) {
    function n(n) {
    return n>=n?e[la.bisect(t, n)]: void 0;
}
return n.domain=function(e) {
    return arguments.length?(t=e, n): t;
}
, n.range=function(t) {
    return arguments.length?(e=t, n): e;
}
, n.invertExtent=function(n) {
    return n=e.indexOf(n), [t[n-1], t[n]];
}
, n.copy=function() {
    return cs(t, e);
}
, n;
}function hs(t) {
    function e(t) {
    return+t;
}
return e.invert=e, e.domain=e.range=function(n) {
    return arguments.length?(t=n.map(e), e): t;
}
, e.ticks=function(e) {
    return ts(t, e);
}
, e.tickFormat=function(e, n) {
    return es(t, e, n);
}
, e.copy=function() {
    return hs(t);
}
, e;
}function ds() {
    return 0;
}
function fs(t) {
    return t.innerRadius;
}
function ps(t) {
    return t.outerRadius;
}
function gs(t) {
    return t.startAngle;
}
function ms(t) {
    return t.endAngle;
}
function vs(t) {
    return t&&t.padAngle;
}
function ys(t, e, n, i) {
    return(t-n)*e-(e-i)*t>0?0: 1;
}
function bs(t, e, n, i, r) {
    var o=t[0]-e[0], s=t[1]-e[1], a=(r?i: -i)/Math.sqrt(o*o+s*s), l=a*s, u=-a*o, c=t[0]+l, h=t[1]+u, d=e[0]+l, f=e[1]+u, p=(c+d)/2, g=(h+f)/2, m=d-c, v=f-h, y=m*m+v*v, b=n-i, w=c*f-d*h, x=(0>v?-1:1)*Math.sqrt(Math.max(0, b*b*y-w*w)), _=(w*v-m*x)/y, k=(-w*m-v*x)/y, C=(w*v+m*x)/y, T=(-w*m+v*x)/y, E=_-p, S=k-g, M=C-p, D=T-g;
    return E*E+S*S>M*M+D*D&&(_=C, k=T), [[_-l, k-u], [_*n/b, k*n/b]];
}
function ws(t) {
    function e(e) {
    function s() {
    u.push("M", o(t(c), a));
}
for(var l, u=[], c=[], h=-1, d=e.length, f=Ee(n), p=Ee(i);
    ++h<d;
    )r.call(this, l=e[h], h)?c.push([+f.call(this, l, h), +p.call(this, l, h)]): c.length&&(s(), c=[]);
    return c.length&&s(), u.length?u.join(""): null;
}
var n=Di, i=Ai, r=An, o=xs, s=o.key, a=.7;
    return e.x=function(t) {
    return arguments.length?(n=t, e): n;
}
, e.y=function(t) {
    return arguments.length?(i=t, e): i;
}
, e.defined=function(t) {
    return arguments.length?(r=t, e): r;
}
, e.interpolate=function(t) {
    return arguments.length?(s="function"==typeof t?o=t: (o=Ou.get(t)||xs).key, e):s;
}
, e.tension=function(t) {
    return arguments.length?(a=t, e): a;
}
, e;
}function xs(t) {
    return t.length>1?t.join("L"): t+"Z"}
function _s(t) {
    return t.join("L")+"Z"}
function ks(t) {
    for(var e=0, n=t.length, i=t[0], r=[i[0], ", ", i[1]];
    ++e<n;
    )r.push("H", (i[0]+(i=t[e])[0])/2, "V", i[1]);
    return n>1&&r.push("H", i[0]), r.join("");
}
function Cs(t) {
    for(var e=0, n=t.length, i=t[0], r=[i[0], ", ", i[1]];
    ++e<n;
    )r.push("V", (i=t[e])[1], "H", i[0]);
    return r.join("");
}
function Ts(t) {
    for(var e=0, n=t.length, i=t[0], r=[i[0], ", ", i[1]];
    ++e<n;
    )r.push("H", (i=t[e])[0], "V", i[1]);
    return r.join("");
}
function Es(t, e) {
    return t.length<4?xs(t): t[1]+Ds(t.slice(1, -1), As(t, e));
}
function Ss(t, e) {
    return t.length<3?_s(t): t[0]+Ds((t.push(t[0]), t), As([t[t.length-2]].concat(t, [t[1]]), e));
}
function Ms(t, e) {
    return t.length<3?xs(t): t[0]+Ds(t, As(t, e));
}
function Ds(t, e) {
    if(e.length<1||t.length!=e.length&&t.length!=e.length+2)return xs(t);
    var n=t.length!=e.length, i="", r=t[0], o=t[1], s=e[0], a=s, l=1;
    if(n&&(i+="Q"+(o[0]-2*s[0]/3)+", "+(o[1]-2*s[1]/3)+", "+o[0]+", "+o[1], r=t[1], l=2), e.length>1) {
    a=e[1], o=t[l], l++, i+="C"+(r[0]+s[0])+", "+(r[1]+s[1])+", "+(o[0]-a[0])+", "+(o[1]-a[1])+", "+o[0]+", "+o[1];
    for(var u=2;
    u<e.length;
    u++, l++)o=t[l], a=e[u], i+="S"+(o[0]-a[0])+", "+(o[1]-a[1])+", "+o[0]+", "+o[1];
}
if(n) {
    var c=t[l];
    i+="Q"+(o[0]+2*a[0]/3)+", "+(o[1]+2*a[1]/3)+", "+c[0]+", "+c[1];
}
return i;
}function As(t, e) {
    for(var n, i=[], r=(1-e)/2, o=t[0], s=t[1], a=1, l=t.length;
    ++a<l;
    )n=o, o=s, s=t[a], i.push([r*(s[0]-n[0]), r*(s[1]-n[1])]);
    return i;
}
function Ns(t) {
    if(t.length<3)return xs(t);
    var e=1, n=t.length, i=t[0], r=i[0], o=i[1], s=[r, r, r, (i=t[1])[0]], a=[o, o, o, i[1]], l=[r, ", ", o, "L", Ls(ju, s), ", ", Ls(ju, a)];
    for(t.push(t[n-1]);
    ++e<=n;
    )i=t[e], s.shift(), s.push(i[0]), a.shift(), a.push(i[1]), js(l, s, a);
    return t.pop(), l.push("L", i), l.join("");
}
function Ps(t) {
    if(t.length<4)return xs(t);
    for(var e, n=[], i=-1, r=t.length, o=[0], s=[0];
    ++i<3;
    )e=t[i], o.push(e[0]), s.push(e[1]);
    for(n.push(Ls(ju, o)+", "+Ls(ju, s)), --i;
    ++i<r;
    )e=t[i], o.shift(), o.push(e[0]), s.shift(), s.push(e[1]), js(n, o, s);
    return n.join("");
}
function Os(t) {
    for(var e, n, i=-1, r=t.length, o=r+4, s=[], a=[];
    ++i<4;
    )n=t[i%r], s.push(n[0]), a.push(n[1]);
    for(e=[Ls(ju, s), ", ", Ls(ju, a)], --i;
    ++i<o;
    )n=t[i%r], s.shift(), s.push(n[0]), a.shift(), a.push(n[1]), js(e, s, a);
    
return e.join("");
}
function Is(t, e) {
    var n=t.length-1;
    if(n)for(var i, r, o=t[0][0], s=t[0][1], a=t[n][0]-o, l=t[n][1]-s, u=-1;
    ++u<=n;
    )i=t[u], r=u/n, i[0]=e*i[0]+(1-e)*(o+r*a), i[1]=e*i[1]+(1-e)*(s+r*l);
    return Ns(t);
}
function Ls(t, e) {
    return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3];
}
function js(t, e, n) {
    t.push("C", Ls(Iu, e), ", ", Ls(Iu, n), ", ", Ls(Lu, e), ", ", Ls(Lu, n), ", ", Ls(ju, e), ", ", Ls(ju, n));
}
function Hs(t, e) {
    return(e[1]-t[1])/(e[0]-t[0]);
}
function zs(t) {
    for(var e=0, n=t.length-1, i=[], r=t[0], o=t[1], s=i[0]=Hs(r, o);
    ++e<n;
    )i[e]=(s+(s=Hs(r=o, o=t[e+1])))/2;
    return i[e]=s, i;
}
function Rs(t) {
    for(var e, n, i, r, o=[], s=zs(t), a=-1, l=t.length-1;
    ++a<l;
    )e=Hs(t[a], t[a+1]), wa(e)<Ha?s[a]=s[a+1]=0: (n=s[a]/e, i=s[a+1]/e, r=n*n+i*i, r>9&&(r=3*e/Math.sqrt(r), s[a]=r*n, s[a+1]=r*i));
    for(a=-1;
    ++a<=l;
    )r=(t[Math.min(l, a+1)][0]-t[Math.max(0, a-1)][0])/(6*(1+s[a]*s[a])), o.push([r||0, s[a]*r||0]);
    return o;
}
function qs(t) {
    return t.length<3?xs(t): t[0]+Ds(t, Rs(t));
}
function Fs(t) {
    for(var e, n, i, r=-1, o=t.length;
    ++r<o;
    )e=t[r], n=e[0], i=e[1]-$a, e[0]=n*Math.cos(i), e[1]=n*Math.sin(i);
    return t;
}
function $s(t) {
    function e(e) {
    function l() {
    g.push("M", a(t(v), h), c, u(t(m.reverse()), h), "Z");
}
for(var d, f, p, g=[], m=[], v=[], y=-1, b=e.length, w=Ee(n), x=Ee(r), _=n===i?function() {
    return f;
}
: Ee(i), k=r===o?function() {
    return p;
}
: Ee(o);
    ++y<b;
    )s.call(this, d=e[y], y)?(m.push([f=+w.call(this, d, y), p=+x.call(this, d, y)]), v.push([+_.call(this, d, y), +k.call(this, d, y)])): m.length&&(l(), m=[], v=[]);
    return m.length&&l(), g.length?g.join(""): null;
}
var n=Di, i=Di, r=0, o=Ai, s=An, a=xs, l=a.key, u=a, c="L", h=.7;
    return e.x=function(t) {
    return arguments.length?(n=i=t, e): i;
}
, e.x0=function(t) {
    return arguments.length?(n=t, e): n;
}
, e.x1=function(t) {
    return arguments.length?(i=t, e): i;
}
, e.y=function(t) {
    return arguments.length?(r=o=t, e): o;
}
, e.y0=function(t) {
    return arguments.length?(r=t, e): r;
}
, e.y1=function(t) {
    return arguments.length?(o=t, e): o;
}
, e.defined=function(t) {
    return arguments.length?(s=t, e): s;
}
, e.interpolate=function(t) {
    return arguments.length?(l="function"==typeof t?a=t: (a=Ou.get(t)||xs).key, u=a.reverse||a, c=a.closed?"M":"L", e):l;
}
, e.tension=function(t) {
    return arguments.length?(h=t, e): h;
}
, e;
}function Ws(t) {
    return t.radius;
}
function Bs(t) {
    return[t.x, t.y];
}
function Vs(t) {
    return function() {
    var e=t.apply(this, arguments), n=e[0], i=e[1]-$a;
    return[n*Math.cos(i), n*Math.sin(i)];
}
}function Ys() {
    return 64;
}
function Us() {
    return"circle"}
function Xs(t) {
    var e=Math.sqrt(t/Ra);
    return"M0, "+e+"A"+e+", "+e+" 0 1, 1 0, "+-e+"A"+e+", "+e+" 0 1, 1 0, "+e+"Z"}
function Qs(t) {
    return function() {
    var e, n, i;
    (e=this[t])&&(i=e[n=e.active])&&(i.timer.c=null, i.timer.t=0/0, --e.count?delete e[n]: delete this[t], e.active+=.5, i.event&&i.event.interrupt.call(this, this.__data__, i.index));
}
}function Gs(t, e, n) {
    return Ta(t, Wu), t.namespace=e, t.id=n, t;
}
function Ks(t, e, n, i) {
    var r=t.id, o=t.namespace;
    return W(t, "function"==typeof n?function(t, s, a) {
    t[o][r].tween.set(e, i(n.call(t, t.__data__, s, a)));
}
: (n=i(n), function(t) {
    t[o][r].tween.set(e, n);
}
));
}function Zs(t) {
    return null==t&&(t=""), function() {
    this.textContent=t;
}
}function Js(t) {
    return null==t?"__transition__": "__transition_"+t+"__"}
function ta(t, e, n, i, r) {
    function o(t) {
    var e=g.delay;
    return c.t=e+l, t>=e?s(t-e): void(c.c=s);
}
function s(n) {
    var r=p.active, o=p[r];
    o&&(o.timer.c=null, o.timer.t=0/0, --p.count, delete p[r], o.event&&o.event.interrupt.call(t, t.__data__, o.index));
    for(var s in p)if(i>+s) {
    var u=p[s];
    u.timer.c=null, u.timer.t=0/0, --p.count, delete p[s];
}
c.c=a, Ne(function() {
    return c.c&&a(n||1)&&(c.c=null, c.t=0/0), 1;
}
, 0, l), p.active=i, g.event&&g.event.start.call(t, t.__data__, e), f=[], g.tween.forEach(function(n, i) {
    (i=i.call(t, t.__data__, e))&&f.push(i);
}
), d=g.ease, h=g.duration;
}function a(r) {
    for(var o=r/h, s=d(o), a=f.length;
    a>0;
    )f[--a].call(t, s);
    return o>=1?(g.event&&g.event.end.call(t, t.__data__, e), --p.count?delete p[i]: delete t[n], 1):void 0;
}
var l, c, h, d, f, p=t[n]||(t[n]= {
    active: 0, count:0;
}
), g=p[i];
    g||(l=r.time, c=Ne(o, 0, l), g=p[i]= {
    tween: new u, time:l, timer:c, delay:r.delay, duration:r.duration, ease:r.ease, index:e;
}
, r=null, ++p.count);
}function ea(t, e, n) {
    t.attr("transform", function(t) {
    var i=e(t);
    return"translate("+(isFinite(i)?i: n(t))+", 0)"}
);
}function na(t, e, n) {
    t.attr("transform", function(t) {
    var i=e(t);
    return"translate(0, "+(isFinite(i)?i: n(t))+")"}
);
}function ia(t) {
    return t.toISOString();
}
function ra(t, e, n) {
    function i(e) {
    return t(e);
}
function r(t, n) {
    var i=t[1]-t[0], r=i/n, o=la.bisect(Zu, r);
    return o==Zu.length?[e.year, Jo(t.map(function(t) {
    return t/31536e6;
}
), n)[2]]: o?e[r/Zu[o-1]<Zu[o]/r?o-1:o]:[ec, Jo(t, n)[2]];
}return i.invert=function(e) {
    return oa(t.invert(e));
}
, i.domain=function(e) {
    return arguments.length?(t.domain(e), i): t.domain().map(oa);
}
, i.nice=function(t, e) {
    function n(n) {
    return!isNaN(n)&&!t.range(n, oa(+n+1), e).length;
}
var o=i.domain(), s=Bo(o), a=null==t?r(s, 10): "number"==typeof t&&r(s, t);
    return a&&(t=a[0], e=a[1]), i.domain(Uo(o, e>1? {
    floor: function(e) {
    for(;
    n(e=t.floor(e));
    )e=oa(e-1);
    return e;
}
, ceil: function(e) {
    for(;
    n(e=t.ceil(e));
    )e=oa(+e+1);
    return e;
}
}: t));
}, i.ticks=function(t, e) {
    var n=Bo(i.domain()), o=null==t?r(n, 10): "number"==typeof t?r(n, t):!t.range&&[ {
    range: t;
}
, e];
    return o&&(t=o[0], e=o[1]), t.range(n[0], oa(+n[1]+1), 1>e?1: e);
}
, i.tickFormat=function() {
    return n;
}
, i.copy=function() {
    return ra(t.copy(), e, n);
}
, Ko(i, t);
}function oa(t) {
    return new Date(t);
}
function sa(t) {
    return JSON.parse(t.responseText);
}
function aa(t) {
    var e=ha.createRange();
    return e.selectNode(ha.body), e.createContextualFragment(t.responseText);
}
var la= {
    version: "3.5.17"}
, ua=[].slice, ca=function(t) {
    return ua.call(t);
}
, ha=this.document;
    if(ha)try {
    ca(ha.documentElement.childNodes)[0].nodeType;
}
catch(da) {
    ca=function(t) {
    for(var e=t.length, n=new Array(e);
    e--;
    )n[e]=t[e];
    return n;
}
}if(Date.now||(Date.now=function() {
    return+new Date;
}
), ha)try {
    ha.createElement("DIV").style.setProperty("opacity", 0, "");
}
catch(fa) {
    var pa=this.Element.prototype, ga=pa.setAttribute, ma=pa.setAttributeNS, va=this.CSSStyleDeclaration.prototype, ya=va.setProperty;
    pa.setAttribute=function(t, e) {
    ga.call(this, t, e+"");
}
, pa.setAttributeNS=function(t, e, n) {
    ma.call(this, t, e, n+"");
}
, va.setProperty=function(t, e, n) {
    ya.call(this, t, e+"", n);
}
}la.ascending=n, la.descending=function(t, e) {
    return t>e?-1: e>t?1:e>=t?0:0/0;
}
, la.min=function(t, e) {
    var n, i, r=-1, o=t.length;
    if(1===arguments.length) {
    for(;
    ++r<o;
    )if(null!=(i=t[r])&&i>=i) {
    n=i;
    break;
}
for(;
    ++r<o;
    )null!=(i=t[r])&&n>i&&(n=i);
}
else {
    for(;
    ++r<o;
    )if(null!=(i=e.call(t, t[r], r))&&i>=i) {
    n=i;
    break;
}
for(;
    ++r<o;
    )null!=(i=e.call(t, t[r], r))&&n>i&&(n=i);
}
return n;
}, la.max=function(t, e) {
    var n, i, r=-1, o=t.length;
    if(1===arguments.length) {
    for(;
    ++r<o;
    )if(null!=(i=t[r])&&i>=i) {
    n=i;
    break;
}
for(;
    ++r<o;
    )null!=(i=t[r])&&i>n&&(n=i);
}
else {
    for(;
    ++r<o;
    )if(null!=(i=e.call(t, t[r], r))&&i>=i) {
    n=i;
    break;
}
for(;
    ++r<o;
    )null!=(i=e.call(t, t[r], r))&&i>n&&(n=i);
}
return n;
}, la.extent=function(t, e) {
    var n, i, r, o=-1, s=t.length;
    if(1===arguments.length) {
    for(;
    ++o<s;
    )if(null!=(i=t[o])&&i>=i) {
    n=r=i;
    break;
}
for(;
    ++o<s;
    )null!=(i=t[o])&&(n>i&&(n=i), i>r&&(r=i));
}
else {
    for(;
    ++o<s;
    )if(null!=(i=e.call(t, t[o], o))&&i>=i) {
    n=r=i;
    break;
}
for(;
    ++o<s;
    )null!=(i=e.call(t, t[o], o))&&(n>i&&(n=i), i>r&&(r=i));
}
return[n, r];
}, la.sum=function(t, e) {
    var n, i=0, o=t.length, s=-1;
    if(1===arguments.length)for(;
    ++s<o;
    )r(n=+t[s])&&(i+=n);
    else for(;
    ++s<o;
    )r(n=+e.call(t, t[s], s))&&(i+=n);
    return i;
}
, la.mean=function(t, e) {
    var n, o=0, s=t.length, a=-1, l=s;
    if(1===arguments.length)for(;
    ++a<s;
    )r(n=i(t[a]))?o+=n: --l;
    else for(;
    ++a<s;
    )r(n=i(e.call(t, t[a], a)))?o+=n: --l;
    return l?o/l: void 0;
}
, la.quantile=function(t, e) {
    var n=(t.length-1)*e+1, i=Math.floor(n), r=+t[i-1], o=n-i;
    return o?r+o*(t[i]-r): r;
}
, la.median=function(t, e) {
    var o, s=[], a=t.length, l=-1;
    if(1===arguments.length)for(;
    ++l<a;
    )r(o=i(t[l]))&&s.push(o);
    else for(;
    ++l<a;
    )r(o=i(e.call(t, t[l], l)))&&s.push(o);
    return s.length?la.quantile(s.sort(n), .5): void 0;
}
, la.variance=function(t, e) {
    var n, o, s=t.length, a=0, l=0, u=-1, c=0;
    if(1===arguments.length)for(;
    ++u<s;
    )r(n=i(t[u]))&&(o=n-a, a+=o/++c, l+=o*(n-a));
    else for(;
    ++u<s;
    )r(n=i(e.call(t, t[u], u)))&&(o=n-a, a+=o/++c, l+=o*(n-a));
    return c>1?l/(c-1): void 0;
}
, la.deviation=function() {
    var t=la.variance.apply(this, arguments);
    return t?Math.sqrt(t): t;
}
;
    var ba=o(n);
    la.bisectLeft=ba.left, la.bisect=la.bisectRight=ba.right, la.bisector=function(t) {
    return o(1===t.length?function(e, i) {
    return n(t(e), i);
}
: t);
}, la.shuffle=function(t, e, n) {
    (o=arguments.length)<3&&(n=t.length, 2>o&&(e=0));
    for(var i, r, o=n-e;
    o;
    )r=Math.random()*o--|0, i=t[o+e], t[o+e]=t[r+e], t[r+e]=i;
    return t;
}
, la.permute=function(t, e) {
    for(var n=e.length, i=new Array(n);
    n--;
    )i[n]=t[e[n]];
    return i;
}
, la.pairs=function(t) {
    for(var e, n=0, i=t.length-1, r=t[0], o=new Array(0>i?0: i);
    i>n;
    )o[n]=[e=r, r=t[++n]];
    return o;
}
, la.transpose=function(t) {
    if(!(r=t.length))return[];
    for(var e=-1, n=la.min(t, s), i=new Array(n);
    ++e<n;
    )for(var r, o=-1, a=i[e]=new Array(r);
    ++o<r;
    )a[o]=t[o][e];
    return i;
}
, la.zip=function() {
    return la.transpose(arguments);
}
, la.keys=function(t) {
    var e=[];
    for(var n in t)e.push(n);
    return e;
}
, la.values=function(t) {
    var e=[];
    for(var n in t)e.push(t[n]);
    return e;
}
, la.entries=function(t) {
    var e=[];
    for(var n in t)e.push( {
    key: n, value:t[n];
}
);
    return e;
}
, la.merge=function(t) {
    for(var e, n, i, r=t.length, o=-1, s=0;
    ++o<r;
    )s+=t[o].length;
    for(n=new Array(s);
    --r>=0;
    )for(i=t[r], e=i.length;
    --e>=0;
    )n[--s]=i[e];
    return n;
}
;
    var wa=Math.abs;
    la.range=function(t, e, n) {
    if(arguments.length<3&&(n=1, arguments.length<2&&(e=t, t=0)), (e-t)/n===1/0)throw new Error("infinite range");
    var i, r=[], o=a(wa(n)), s=-1;
    if(t*=o, e*=o, n*=o, 0>n)for(;
    (i=t+n*++s)>e;
    )r.push(i/o);
    else for(;
    (i=t+n*++s)<e;
    )r.push(i/o);
    return r;
}
, la.map=function(t, e) {
    var n=new u;
    if(t instanceof u)t.forEach(function(t, e) {
    n.set(t, e);
}
);
    else if(Array.isArray(t)) {
    var i, r=-1, o=t.length;
    if(1===arguments.length)for(;
    ++r<o;
    )n.set(r, t[r]);
    else for(;
    ++r<o;
    )n.set(e.call(t, i=t[r], r), i);
}
else for(var s in t)n.set(s, t[s]);
    return n;
}
;
    var xa="__proto__", _a="\x00";
    l(u,  {
    has: d, get:function(t) {
    return this._[c(t)];
}
, set: function(t, e) {
    return this._[c(t)]=e;
}
, remove: f, keys:p, values:function() {
    var t=[];
    for(var e in this._)t.push(this._[e]);
    return t;
}
, entries: function() {
    var t=[];
    for(var e in this._)t.push( {
    key: h(e), value:this._[e];
}
);
    return t;
}
, size: g, empty:m, forEach:function(t) {
    for(var e in this._)t.call(this, h(e), this._[e]);
}
}), la.nest=function() {
    function t(e, s, a) {
    if(a>=o.length)return i?i.call(r, s): n?s.sort(n):s;
    for(var l, c, h, d, f=-1, p=s.length, g=o[a++], m=new u;
    ++f<p;
    )(d=m.get(l=g(c=s[f])))?d.push(c): m.set(l, [c]);
    return e?(c=e(), h=function(n, i) {
    c.set(n, t(e, i, a));
}
): (c= {
}
, h=function(n, i) {
    c[n]=t(e, i, a);
}
), m.forEach(h), c;
}function e(t, n) {
    if(n>=o.length)return t;
    var i=[], r=s[n++];
    return t.forEach(function(t, r) {
    i.push( {
    key: t, values:e(r, n);
}
);
}), r?i.sort(function(t, e) {
    return r(t.key, e.key);
}
): i;
}var n, i, r= {
}
, o=[], s=[];
    return r.map=function(e, n) {
    return t(n, e, 0);
}
, r.entries=function(n) {
    return e(t(la.map, n, 0), 0);
}
, r.key=function(t) {
    return o.push(t), r;
}
, r.sortKeys=function(t) {
    return s[o.length-1]=t, r;
}
, r.sortValues=function(t) {
    return n=t, r;
}
, r.rollup=function(t) {
    return i=t, r;
}
, r;
}, la.set=function(t) {
    var e=new v;
    if(t)for(var n=0, i=t.length;
    i>n;
    ++n)e.add(t[n]);
    return e;
}
, l(v,  {
    has: d, add:function(t) {
    return this._[c(t+="")]=!0, t;
}
, remove: f, values:p, size:g, empty:m, forEach:function(t) {
    for(var e in this._)t.call(this, h(e));
}
}), la.behavior= {
}
, la.rebind=function(t, e) {
    for(var n, i=1, r=arguments.length;
    ++i<r;
    )t[n=arguments[i]]=b(t, e, e[n]);
    return t;
}
;
    var ka=["webkit", "ms", "moz", "Moz", "o", "O"];
    la.dispatch=function() {
    for(var t=new _, e=-1, n=arguments.length;
    ++e<n;
    )t[arguments[e]]=k(t);
    return t;
}
, _.prototype.on=function(t, e) {
    var n=t.indexOf("."), i="";
    if(n>=0&&(i=t.slice(n+1), t=t.slice(0, n)), t)return arguments.length<2?this[t].on(i): this[t].on(i, e);
    if(2===arguments.length) {
    if(null==e)for(t in this)this.hasOwnProperty(t)&&this[t].on(i, null);
    return this;
}
}, la.event=null, la.requote=function(t) {
    return t.replace(Ca, "\\$&");
}
;
    var Ca=/[\\\^\$\*\+\?\|\[\]\(\)\.\ {
    \;
}
]/g, Ta= {
}
.__proto__?function(t, e) {
    t.__proto__=e;
}
: function(t, e) {
    for(var n in e)t[n]=e[n];
}
, Ea=function(t, e) {
    return e.querySelector(t);
}
, Sa=function(t, e) {
    return e.querySelectorAll(t);
}
, Ma=function(t, e) {
    var n=t.matches||t[w(t, "matchesSelector")];
    return(Ma=function(t, e) {
    return n.call(t, e);
}
)(t, e);
};
    "function"==typeof Sizzle&&(Ea=function(t, e) {
    return Sizzle(t, e)[0]||null;
}
, Sa=Sizzle, Ma=Sizzle.matchesSelector), la.selection=function() {
    return la.select(ha.documentElement);
}
;
    var Da=la.selection.prototype=[];
    Da.select=function(t) {
    var e, n, i, r, o=[];
    t=M(t);
    for(var s=-1, a=this.length;
    ++s<a;
    ) {
    o.push(e=[]), e.parentNode=(i=this[s]).parentNode;
    for(var l=-1, u=i.length;
    ++l<u;
    )(r=i[l])?(e.push(n=t.call(r, r.__data__, l, s)), n&&"__data__"in r&&(n.__data__=r.__data__)): e.push(null);
}
return S(o);
}, Da.selectAll=function(t) {
    var e, n, i=[];
    t=D(t);
    for(var r=-1, o=this.length;
    ++r<o;
    )for(var s=this[r], a=-1, l=s.length;
    ++a<l;
    )(n=s[a])&&(i.push(e=ca(t.call(n, n.__data__, a, r))), e.parentNode=n);
    return S(i);
}
;
    var Aa="http: //www.w3.org/1999/xhtml", Na= {
    svg: "http://www.w3.org/2000/svg", xhtml:Aa, xlink:"http://www.w3.org/1999/xlink", xml:"http://www.w3.org/XML/1998/namespace", xmlns:"http://www.w3.org/2000/xmlns/"}
;
    la.ns= {
    prefix: Na, qualify:function(t) {
    var e=t.indexOf(": "), n=t;
    return e>=0&&"xmlns"!==(n=t.slice(0, e))&&(t=t.slice(e+1)), Na.hasOwnProperty(n)? {
    space: Na[n], local:t;
}
:t;
}}, Da.attr=function(t, e) {
    if(arguments.length<2) {
    if("string"==typeof t) {
    var n=this.node();
    return t=la.ns.qualify(t), t.local?n.getAttributeNS(t.space, t.local): n.getAttribute(t);
}
for(e in t)this.each(A(e, t[e]));
    return this;
}
return this.each(A(t, e));
}, Da.classed=function(t, e) {
    if(arguments.length<2) {
    if("string"==typeof t) {
    var n=this.node(), i=(t=O(t)).length, r=-1;
    if(e=n.classList) {
    for(;
    ++r<i;
    )if(!e.contains(t[r]))return!1;
}
else for(e=n.getAttribute("class");
    ++r<i;
    )if(!P(t[r]).test(e))return!1;
    return!0;
}
for(e in t)this.each(I(e, t[e]));
    return this;
}
return this.each(I(t, e));
}, Da.style=function(t, n, i) {
    var r=arguments.length;
    if(3>r) {
    if("string"!=typeof t) {
    2>r&&(n="");
    for(i in t)this.each(j(i, t[i], n));
    return this;
}
if(2>r) {
    var o=this.node();
    return e(o).getComputedStyle(o, null).getPropertyValue(t);
}
i=""}return this.each(j(t, n, i));
}, Da.property=function(t, e) {
    if(arguments.length<2) {
    if("string"==typeof t)return this.node()[t];
    for(e in t)this.each(H(e, t[e]));
    return this;
}
return this.each(H(t, e));
}, Da.text=function(t) {
    return arguments.length?this.each("function"==typeof t?function() {
    var e=t.apply(this, arguments);
    this.textContent=null==e?"": e;
}
:null==t?function() {
    this.textContent=""}
: function() {
    this.textContent=t;
}
): this.node().textContent;
}, Da.html=function(t) {
    return arguments.length?this.each("function"==typeof t?function() {
    var e=t.apply(this, arguments);
    this.innerHTML=null==e?"": e;
}
:null==t?function() {
    this.innerHTML=""}
: function() {
    this.innerHTML=t;
}
): this.node().innerHTML;
}, Da.append=function(t) {
    return t=z(t), this.select(function() {
    return this.appendChild(t.apply(this, arguments));
}
);
}, Da.insert=function(t, e) {
    return t=z(t), e=M(e), this.select(function() {
    return this.insertBefore(t.apply(this, arguments), e.apply(this, arguments)||null);
}
);
}, Da.remove=function() {
    return this.each(R);
}
, Da.data=function(t, e) {
    function n(t, n) {
    var i, r, o, s=t.length, h=n.length, d=Math.min(s, h), f=new Array(h), p=new Array(h), g=new Array(s);
    if(e) {
    var m, v=new u, y=new Array(s);
    for(i=-1;
    ++i<s;
    )(r=t[i])&&(v.has(m=e.call(r, r.__data__, i))?g[i]=r: v.set(m, r), y[i]=m);
    for(i=-1;
    ++i<h;
    )(r=v.get(m=e.call(n, o=n[i], i)))?r!==!0&&(f[i]=r, r.__data__=o): p[i]=q(o), v.set(m, !0);
    for(i=-1;
    ++i<s;
    )i in y&&v.get(y[i])!==!0&&(g[i]=t[i]);
}
else {
    for(i=-1;
    ++i<d;
    )r=t[i], o=n[i], r?(r.__data__=o, f[i]=r): p[i]=q(o);
    for(;
    h>i;
    ++i)p[i]=q(n[i]);
    for(;
    s>i;
    ++i)g[i]=t[i];
}
p.update=f, p.parentNode=f.parentNode=g.parentNode=t.parentNode, a.push(p), l.push(f), c.push(g);
}var i, r, o=-1, s=this.length;
    if(!arguments.length) {
    for(t=new Array(s=(i=this[0]).length);
    ++o<s;
    )(r=i[o])&&(t[o]=r.__data__);
    return t;
}
var a=B([]), l=S([]), c=S([]);
    if("function"==typeof t)for(;
    ++o<s;
    )n(i=this[o], t.call(i, i.parentNode.__data__, o));
    else for(;
    ++o<s;
    )n(i=this[o], t);
    return l.enter=function() {
    return a;
}
, l.exit=function() {
    return c;
}
, l;
}, Da.datum=function(t) {
    return arguments.length?this.property("__data__", t): this.property("__data__");
}
, Da.filter=function(t) {
    var e, n, i, r=[];
    "function"!=typeof t&&(t=F(t));
    for(var o=0, s=this.length;
    s>o;
    o++) {
    r.push(e=[]), e.parentNode=(n=this[o]).parentNode;
    for(var a=0, l=n.length;
    l>a;
    a++)(i=n[a])&&t.call(i, i.__data__, a, o)&&e.push(i);
}
return S(r);
}, Da.order=function() {
    for(var t=-1, e=this.length;
    ++t<e;
    )for(var n, i=this[t], r=i.length-1, o=i[r];
    --r>=0;
    )(n=i[r])&&(o&&o!==n.nextSibling&&o.parentNode.insertBefore(n, o), o=n);
    return this;
}
, Da.sort=function(t) {
    t=$.apply(this, arguments);
    for(var e=-1, n=this.length;
    ++e<n;
    )this[e].sort(t);
    return this.order();
}
, Da.each=function(t) {
    return W(this, function(e, n, i) {
    t.call(e, e.__data__, n, i);
}
);
}, Da.call=function(t) {
    var e=ca(arguments);
    return t.apply(e[0]=this, e), this;
}
, Da.empty=function() {
    return!this.node();
}
, Da.node=function() {
    for(var t=0, e=this.length;
    e>t;
    t++)for(var n=this[t], i=0, r=n.length;
    r>i;
    i++) {
    var o=n[i];
    if(o)return o;
}
return null;
}, Da.size=function() {
    var t=0;
    return W(this, function() {
    ++t;
}
), t;
};
    var Pa=[];
    la.selection.enter=B, la.selection.enter.prototype=Pa, Pa.append=Da.append, Pa.empty=Da.empty, Pa.node=Da.node, Pa.call=Da.call, Pa.size=Da.size, Pa.select=function(t) {
    for(var e, n, i, r, o, s=[], a=-1, l=this.length;
    ++a<l;
    ) {
    i=(r=this[a]).update, s.push(e=[]), e.parentNode=r.parentNode;
    for(var u=-1, c=r.length;
    ++u<c;
    )(o=r[u])?(e.push(i[u]=n=t.call(r.parentNode, o.__data__, u, a)), n.__data__=o.__data__): e.push(null);
}
return S(s);
}, Pa.insert=function(t, e) {
    return arguments.length<2&&(e=V(this)), Da.insert.call(this, t, e);
}
, la.select=function(e) {
    var n;
    return"string"==typeof e?(n=[Ea(e, ha)], n.parentNode=ha.documentElement): (n=[e], n.parentNode=t(e)), S([n]);
}
, la.selectAll=function(t) {
    var e;
    return"string"==typeof t?(e=ca(Sa(t, ha)), e.parentNode=ha.documentElement): (e=ca(t), e.parentNode=null), S([e]);
}
, Da.on=function(t, e, n) {
    var i=arguments.length;
    if(3>i) {
    if("string"!=typeof t) {
    2>i&&(e=!1);
    for(n in t)this.each(Y(n, t[n], e));
    return this;
}
if(2>i)return(i=this.node()["__on"+t])&&i._;
    n=!1;
}
return this.each(Y(t, e, n));
};
    var Oa=la.map( {
    mouseenter: "mouseover", mouseleave:"mouseout"}
);
    ha&&Oa.forEach(function(t) {
    "on"+t in ha&&Oa.remove(t);
}
);
    var Ia, La=0;
    la.mouse=function(t) {
    return G(t, T());
}
;
    var ja=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1: 0;
    la.touch=function(t, e, n) {
    if(arguments.length<3&&(n=e, e=T().changedTouches), e)for(var i, r=0, o=e.length;
    o>r;
    ++r)if((i=e[r]).identifier===n)return G(t, i);
}
, la.behavior.drag=function() {
    function t() {
    this.on("mousedown.drag", o).on("touchstart.drag", s);
}
function n(t, e, n, o, s) {
    return function() {
    function a() {
    var t, n, i=e(d, g);
    i&&(t=i[0]-b[0], n=i[1]-b[1], p|=t|n, b=i, f( {
    type: "drag", x:i[0]+u[0], y:i[1]+u[1], dx:t, dy:n;
}
));
}function l() {
    e(d, g)&&(v.on(o+m, null).on(s+m, null), y(p), f( {
    type: "dragend"}
));
}var u, c=this, h=la.event.target.correspondingElement||la.event.target, d=c.parentNode, f=i.of(c, arguments), p=0, g=t(), m=".drag"+(null==g?"":"-"+g), v=la.select(n(h)).on(o+m, a).on(s+m, l), y=Q(h), b=e(d, g);
    r?(u=r.apply(c, arguments), u=[u.x-b[0], u.y-b[1]]): u=[0, 0], f( {
    type: "dragstart"}
);
}}var i=E(t, "drag", "dragstart", "dragend"), r=null, o=n(x, la.mouse, e, "mousemove", "mouseup"), s=n(K, la.touch, y, "touchmove", "touchend");
    return t.origin=function(e) {
    return arguments.length?(r=e, t): r;
}
, la.rebind(t, i, "on");
}, la.touches=function(t, e) {
    return arguments.length<2&&(e=T().touches), e?ca(e).map(function(e) {
    var n=G(t, e);
    return n.identifier=e.identifier, n;
}
): [];
};
    var Ha=1e-6, za=Ha*Ha, Ra=Math.PI, qa=2*Ra, Fa=qa-Ha, $a=Ra/2, Wa=Ra/180, Ba=180/Ra, Va=Math.SQRT2, Ya=2, Ua=4;
    la.interpolateZoom=function(t, e) {
    var n, i, r=t[0], o=t[1], s=t[2], a=e[0], l=e[1], u=e[2], c=a-r, h=l-o, d=c*c+h*h;
    if(za>d)i=Math.log(u/s)/Va, n=function(t) {
    return[r+t*c, o+t*h, s*Math.exp(Va*t*i)];
}
;
    else {
    var f=Math.sqrt(d), p=(u*u-s*s+Ua*d)/(2*s*Ya*f), g=(u*u-s*s-Ua*d)/(2*u*Ya*f), m=Math.log(Math.sqrt(p*p+1)-p), v=Math.log(Math.sqrt(g*g+1)-g);
    i=(v-m)/Va, n=function(t) {
    var e=t*i, n=ie(m), a=s/(Ya*f)*(n*re(Va*e+m)-ne(m));
    return[r+a*c, o+a*h, s*n/ie(Va*e+m)];
}
}return n.duration=1e3*i, n;
}, la.behavior.zoom=function() {
    function t(t) {
    t.on(N, h).on(Qa+".zoom", f).on("dblclick.zoom", p).on(I, d);
}
function n(t) {
    return[(t[0]-T.x)/T.k, (t[1]-T.y)/T.k];
}
function i(t) {
    return[t[0]*T.k+T.x, t[1]*T.k+T.y];
}
function r(t) {
    T.k=Math.max(M[0], Math.min(M[1], t));
}
function o(t, e) {
    e=i(e), T.x+=t[0]-e[0], T.y+=t[1]-e[1];
}
function s(e, n, i, s) {
    e.__chart__= {
    x: T.x, y:T.y, k:T.k;
}
, r(Math.pow(2, s)), o(m=n, i), e=la.select(e), D>0&&(e=e.transition().duration(D)), e.call(t.event);
}function a() {
    x&&x.domain(w.range().map(function(t) {
    return(t-T.x)/T.k;
}
).map(w.invert)), k&&k.domain(_.range().map(function(t) {
    return(t-T.y)/T.k;
}
).map(_.invert));
}function l(t) {
    A++||t( {
    type: "zoomstart"}
);
}function u(t) {
    a(), t( {
    type: "zoom", scale:T.k, translate:[T.x, T.y];
}
);
}function c(t) {
    --A||(t( {
    type: "zoomend"}
), m=null);
}function h() {
    function t() {
    a=1, o(la.mouse(r), d), u(s);
}
function i() {
    h.on(P, null).on(O, null), f(a), c(s);
}
var r=this, s=L.of(r, arguments), a=0, h=la.select(e(r)).on(P, t).on(O, i), d=n(la.mouse(r)), f=Q(r);
    $u.call(r), l(s);
}
function d() {
    function t() {
    var t=la.touches(p);
    return f=T.k, t.forEach(function(t) {
    t.identifier in m&&(m[t.identifier]=n(t));
}
), t;
}function e() {
    var e=la.event.target;
    la.select(e).on(w, i).on(x, a), _.push(e);
    for(var n=la.event.changedTouches, r=0, o=n.length;
    o>r;
    ++r)m[n[r].identifier]=null;
    var l=t(), u=Date.now();
    if(1===l.length) {
    if(500>u-b) {
    var c=l[0];
    s(p, c, m[c.identifier], Math.floor(Math.log(T.k)/Math.LN2)+1), C();
}
b=u;
}else if(l.length>1) {
    var c=l[0], h=l[1], d=c[0]-h[0], f=c[1]-h[1];
    v=d*d+f*f;
}
}function i() {
    var t, e, n, i, s=la.touches(p);
    $u.call(p);
    for(var a=0, l=s.length;
    l>a;
    ++a, i=null)if(n=s[a], i=m[n.identifier]) {
    if(e)break;
    t=n, e=i;
}
if(i) {
    var c=(c=n[0]-t[0])*c+(c=n[1]-t[1])*c, h=v&&Math.sqrt(c/v);
    t=[(t[0]+n[0])/2, (t[1]+n[1])/2], e=[(e[0]+i[0])/2, (e[1]+i[1])/2], r(h*f);
}
b=null, o(t, e), u(g);
}function a() {
    if(la.event.touches.length) {
    for(var e=la.event.changedTouches, n=0, i=e.length;
    i>n;
    ++n)delete m[e[n].identifier];
    for(var r in m)return void t();
}
la.selectAll(_).on(y, null), k.on(N, h).on(I, d), E(), c(g);
}var f, p=this, g=L.of(p, arguments), m= {
}
, v=0, y=".zoom-"+la.event.changedTouches[0].identifier, w="touchmove"+y, x="touchend"+y, _=[], k=la.select(p), E=Q(p);
    e(), l(g), k.on(N, null).on(I, e);
}
function f() {
    var t=L.of(this, arguments);
    y?clearTimeout(y): ($u.call(this), g=n(m=v||la.mouse(this)), l(t)), y=setTimeout(function() {
    y=null, c(t);
}
, 50), C(), r(Math.pow(2, .002*Xa())*T.k), o(m, g), u(t);
}function p() {
    var t=la.mouse(this), e=Math.log(T.k)/Math.LN2;
    s(this, t, n(t), la.event.shiftKey?Math.ceil(e)-1: Math.floor(e)+1);
}
var g, m, v, y, b, w, x, _, k, T= {
    x: 0, y:0, k:1;
}
, S=[960, 500], M=Ga, D=250, A=0, N="mousedown.zoom", P="mousemove.zoom", O="mouseup.zoom", I="touchstart.zoom", L=E(t, "zoomstart", "zoom", "zoomend");
    return Qa||(Qa="onwheel"in ha?(Xa=function() {
    return-la.event.deltaY*(la.event.deltaMode?120: 1);
}
, "wheel"):"onmousewheel"in ha?(Xa=function() {
    return la.event.wheelDelta;
}
, "mousewheel"): (Xa=function() {
    return-la.event.detail;
}
, "MozMousePixelScroll")), t.event=function(t) {
    t.each(function() {
    var t=L.of(this, arguments), e=T;
    qu?la.select(this).transition().each("start.zoom", function() {
    T=this.__chart__|| {
    x: 0, y:0, k:1;
}
, l(t);
}).tween("zoom:zoom", function() {
    var n=S[0], i=S[1], r=m?m[0]: n/2, o=m?m[1]:i/2, s=la.interpolateZoom([(r-T.x)/T.k, (o-T.y)/T.k, n/T.k], [(r-e.x)/e.k, (o-e.y)/e.k, n/e.k]);
    return function(e) {
    var i=s(e), a=n/i[2];
    this.__chart__=T= {
    x: r-i[0]*a, y:o-i[1]*a, k:a;
}
, u(t);
}}).each("interrupt.zoom", function() {
    c(t);
}
).each("end.zoom", function() {
    c(t);
}
): (this.__chart__=T, l(t), u(t), c(t));
});
}, t.translate=function(e) {
    return arguments.length?(T= {
    x: +e[0], y:+e[1], k:T.k;
}
, a(), t):[T.x, T.y];
}, t.scale=function(e) {
    return arguments.length?(T= {
    x: T.x, y:T.y, k:null;
}
, r(+e), a(), t):T.k;
}, t.scaleExtent=function(e) {
    return arguments.length?(M=null==e?Ga: [+e[0], +e[1]], t):M;
}
, t.center=function(e) {
    return arguments.length?(v=e&&[+e[0], +e[1]], t): v;
}
, t.size=function(e) {
    return arguments.length?(S=e&&[+e[0], +e[1]], t): S;
}
, t.duration=function(e) {
    return arguments.length?(D=+e, t): D;
}
, t.x=function(e) {
    return arguments.length?(x=e, w=e.copy(), T= {
    x: 0, y:0, k:1;
}
, t):x;
}, t.y=function(e) {
    return arguments.length?(k=e, _=e.copy(), T= {
    x: 0, y:0, k:1;
}
, t):k;
}, la.rebind(t, L, "on");
};
    var Xa, Qa, Ga=[0, 1/0];
    la.color=se, se.prototype.toString=function() {
    return this.rgb()+""}
, la.hsl=ae;
    var Ka=ae.prototype=new se;
    Ka.brighter=function(t) {
    return t=Math.pow(.7, arguments.length?t: 1), new ae(this.h, this.s, this.l/t);
}
, Ka.darker=function(t) {
    return t=Math.pow(.7, arguments.length?t: 1), new ae(this.h, this.s, t*this.l);
}
, Ka.rgb=function() {
    return le(this.h, this.s, this.l);
}
, la.hcl=ue;
    var Za=ue.prototype=new se;
    Za.brighter=function(t) {
    return new ue(this.h, this.c, Math.min(100, this.l+Ja*(arguments.length?t: 1)));
}
, Za.darker=function(t) {
    return new ue(this.h, this.c, Math.max(0, this.l-Ja*(arguments.length?t: 1)));
}
, Za.rgb=function() {
    return ce(this.h, this.c, this.l).rgb();
}
, la.lab=he;
    var Ja=18, tl=.95047, el=1, nl=1.08883, il=he.prototype=new se;
    il.brighter=function(t) {
    return new he(Math.min(100, this.l+Ja*(arguments.length?t: 1)), this.a, this.b);
}
, il.darker=function(t) {
    return new he(Math.max(0, this.l-Ja*(arguments.length?t: 1)), this.a, this.b);
}
, il.rgb=function() {
    return de(this.l, this.a, this.b);
}
, la.rgb=ve;
    var rl=ve.prototype=new se;
    rl.brighter=function(t) {
    t=Math.pow(.7, arguments.length?t: 1);
    var e=this.r, n=this.g, i=this.b, r=30;
    return e||n||i?(e&&r>e&&(e=r), n&&r>n&&(n=r), i&&r>i&&(i=r), new ve(Math.min(255, e/t), Math.min(255, n/t), Math.min(255, i/t))): new ve(r, r, r);
}
, rl.darker=function(t) {
    return t=Math.pow(.7, arguments.length?t: 1), new ve(t*this.r, t*this.g, t*this.b);
}
, rl.hsl=function() {
    return _e(this.r, this.g, this.b);
}
, rl.toString=function() {
    return"#"+we(this.r)+we(this.g)+we(this.b);
}
;
    var ol=la.map( {
    aliceblue: 15792383, antiquewhite:16444375, aqua:65535, aquamarine:8388564, azure:15794175, beige:16119260, bisque:16770244, black:0, blanchedalmond:16772045, blue:255, blueviolet:9055202, brown:10824234, burlywood:14596231, cadetblue:6266528, chartreuse:8388352, chocolate:13789470, coral:16744272, cornflowerblue:6591981, cornsilk:16775388, crimson:14423100, cyan:65535, darkblue:139, darkcyan:35723, darkgoldenrod:12092939, darkgray:11119017, darkgreen:25600, darkgrey:11119017, darkkhaki:12433259, darkmagenta:9109643, darkolivegreen:5597999, darkorange:16747520, darkorchid:10040012, darkred:9109504, darksalmon:15308410, darkseagreen:9419919, darkslateblue:4734347, darkslategray:3100495, darkslategrey:3100495, darkturquoise:52945, darkviolet:9699539, deeppink:16716947, deepskyblue:49151, dimgray:6908265, dimgrey:6908265, dodgerblue:2003199, firebrick:11674146, floralwhite:16775920, forestgreen:2263842, fuchsia:16711935, gainsboro:14474460, ghostwhite:16316671, gold:16766720, goldenrod:14329120, gray:8421504, green:32768, greenyellow:11403055, grey:8421504, honeydew:15794160, hotpink:16738740, indianred:13458524, indigo:4915330, ivory:16777200, khaki:15787660, lavender:15132410, lavenderblush:16773365, lawngreen:8190976, lemonchiffon:16775885, lightblue:11393254, lightcoral:15761536, lightcyan:14745599, lightgoldenrodyellow:16448210, lightgray:13882323, lightgreen:9498256, lightgrey:13882323, lightpink:16758465, lightsalmon:16752762, lightseagreen:2142890, lightskyblue:8900346, lightslategray:7833753, lightslategrey:7833753, lightsteelblue:11584734, lightyellow:16777184, lime:65280, limegreen:3329330, linen:16445670, magenta:16711935, maroon:8388608, mediumaquamarine:6737322, mediumblue:205, mediumorchid:12211667, mediumpurple:9662683, mediumseagreen:3978097, mediumslateblue:8087790, mediumspringgreen:64154, mediumturquoise:4772300, mediumvioletred:13047173, midnightblue:1644912, mintcream:16121850, mistyrose:16770273, moccasin:16770229, navajowhite:16768685, navy:128, oldlace:16643558, olive:8421376, olivedrab:7048739, orange:16753920, orangered:16729344, orchid:14315734, palegoldenrod:15657130, palegreen:10025880, paleturquoise:11529966, palevioletred:14381203, papayawhip:16773077, peachpuff:16767673, peru:13468991, pink:16761035, plum:14524637, powderblue:11591910, purple:8388736, rebeccapurple:6697881, red:16711680, rosybrown:12357519, royalblue:4286945, saddlebrown:9127187, salmon:16416882, sandybrown:16032864, seagreen:3050327, seashell:16774638, sienna:10506797, silver:12632256, skyblue:8900331, slateblue:6970061, slategray:7372944, slategrey:7372944, snow:16775930, springgreen:65407, steelblue:4620980, tan:13808780, teal:32896, thistle:14204888, tomato:16737095, turquoise:4251856, violet:15631086, wheat:16113331, white:16777215, whitesmoke:16119285, yellow:16776960, yellowgreen:10145074;
}
);
    ol.forEach(function(t, e) {
    ol.set(t, ye(e));
}
), la.functor=Ee, la.xhr=Se(y), la.dsv=function(t, e) {
    function n(t, n, o) {
    arguments.length<3&&(o=n, n=null);
    var s=Me(t, e, null==n?i: r(n), o);
    return s.row=function(t) {
    return arguments.length?s.response(null==(n=t)?i: r(t)):n;
}
, s;
}function i(t) {
    return n.parse(t.responseText);
}
function r(t) {
    return function(e) {
    return n.parse(e.responseText, t);
}
}function o(e) {
    return e.map(s).join(t);
}
function s(t) {
    return a.test(t)?'"'+t.replace(/\"/g, '""')+'"': t;
}
var a=new RegExp('["'+t+"\n]"), l=t.charCodeAt(0);
    return n.parse=function(t, e) {
    var i;
    return n.parseRows(t, function(t, n) {
    if(i)return i(t, n-1);
    var r=new Function("d", "return  {
    "+t.map(function(t, e) {
    return JSON.stringify(t)+":  d["+e+"]"}
).join(", ")+"}");
    i=e?function(t, n) {
    return e(r(t), n);
}
: r;
});
}, n.parseRows=function(t, e) {
    function n() {
    if(c>=u)return s;
    if(r)return r=!1, o;
    var e=c;
    if(34===t.charCodeAt(e)) {
    for(var n=e;
    n++<u;
    )if(34===t.charCodeAt(n)) {
    if(34!==t.charCodeAt(n+1))break;
    ++n;
}
c=n+2;
    var i=t.charCodeAt(n+1);
    return 13===i?(r=!0, 10===t.charCodeAt(n+2)&&++c): 10===i&&(r=!0), t.slice(e+1, n).replace(/""/g, '"');
}
for(;
    u>c;
    ) {
    var i=t.charCodeAt(c++), a=1;
    if(10===i)r=!0;
    else if(13===i)r=!0, 10===t.charCodeAt(c)&&(++c, ++a);
    else if(i!==l)continue;
    return t.slice(e, c-a);
}
return t.slice(e);
}for(var i, r, o= {
}
, s= {
}
, a=[], u=t.length, c=0, h=0;
    (i=n())!==s;
    ) {
    for(var d=[];
    i!==o&&i!==s;
    )d.push(i), i=n();
    e&&null==(d=e(d, h++))||a.push(d);
}
return a;
}, n.format=function(e) {
    if(Array.isArray(e[0]))return n.formatRows(e);
    var i=new v, r=[];
    return e.forEach(function(t) {
    for(var e in t)i.has(e)||r.push(i.add(e));
}
), [r.map(s).join(t)].concat(e.map(function(e) {
    return r.map(function(t) {
    return s(e[t]);
}
).join(t);
})).join("\n");
}, n.formatRows=function(t) {
    return t.map(o).join("\n");
}
, n;
}, la.csv=la.dsv(", ", "text/csv"), la.tsv=la.dsv("	", "text/tab-separated-values");
    var sl, al, ll, ul, cl=this[w(this, "requestAnimationFrame")]||function(t) {
    setTimeout(t, 17);
}
;
    la.timer=function() {
    Ne.apply(this, arguments);
}
, la.timer.flush=function() {
    Oe(), Ie();
}
, la.round=function(t, e) {
    return e?Math.round(t*(e=Math.pow(10, e)))/e: Math.round(t);
}
;
    var hl=["y", "z", "a", "f", "p", "n", "\xb5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(je);
    la.formatPrefix=function(t, e) {
    var n=0;
    return(t=+t)&&(0>t&&(t*=-1), e&&(t=la.round(t, Le(t, e))), n=1+Math.floor(1e-12+Math.log(t)/Math.LN10), n=Math.max(-24, Math.min(24, 3*Math.floor((n-1)/3)))), hl[8+n/3];
}
;
    var dl=/(?: ([^ {
    ])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(, )?(\.-?\d+)?([a-z%])?/i, fl=la.map( {
    b: function(t) {
    return t.toString(2);
}
, c: function(t) {
    return String.fromCharCode(t);
}
, o: function(t) {
    return t.toString(8);
}
, x: function(t) {
    return t.toString(16);
}
, X: function(t) {
    return t.toString(16).toUpperCase();
}
, g: function(t, e) {
    return t.toPrecision(e);
}
, e: function(t, e) {
    return t.toExponential(e);
}
, f: function(t, e) {
    return t.toFixed(e);
}
, r: function(t, e) {
    return(t=la.round(t, Le(t, e))).toFixed(Math.max(0, Math.min(20, Le(t*(1+1e-15), e))));
}
}), pl=la.time= {
}
, gl=Date;
    Re.prototype= {
    getDate: function() {
    return this._.getUTCDate();
}
, getDay: function() {
    return this._.getUTCDay();
}
, getFullYear: function() {
    return this._.getUTCFullYear();
}
, getHours: function() {
    return this._.getUTCHours();
}
, getMilliseconds: function() {
    return this._.getUTCMilliseconds();
}
, getMinutes: function() {
    return this._.getUTCMinutes();
}
, getMonth: function() {
    return this._.getUTCMonth();
}
, getSeconds: function() {
    return this._.getUTCSeconds();
}
, getTime: function() {
    return this._.getTime();
}
, getTimezoneOffset: function() {
    return 0;
}
, valueOf: function() {
    return this._.valueOf();
}
, setDate: function() {
    ml.setUTCDate.apply(this._, arguments);
}
, setDay: function() {
    ml.setUTCDay.apply(this._, arguments);
}
, setFullYear: function() {
    ml.setUTCFullYear.apply(this._, arguments);
}
, setHours: function() {
    ml.setUTCHours.apply(this._, arguments);
}
, setMilliseconds: function() {
    ml.setUTCMilliseconds.apply(this._, arguments);
}
, setMinutes: function() {
    ml.setUTCMinutes.apply(this._, arguments);
}
, setMonth: function() {
    ml.setUTCMonth.apply(this._, arguments);
}
, setSeconds: function() {
    ml.setUTCSeconds.apply(this._, arguments);
}
, setTime: function() {
    ml.setTime.apply(this._, arguments);
}
};
    var ml=Date.prototype;
    pl.year=qe(function(t) {
    return t=pl.day(t), t.setMonth(0, 1), t;
}
, function(t, e) {
    t.setFullYear(t.getFullYear()+e);
}
, function(t) {
    return t.getFullYear();
}
), pl.years=pl.year.range, pl.years.utc=pl.year.utc.range, pl.day=qe(function(t) {
    var e=new gl(2e3, 0);
    return e.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), e;
}
, function(t, e) {
    t.setDate(t.getDate()+e);
}
, function(t) {
    return t.getDate()-1;
}
), pl.days=pl.day.range, pl.days.utc=pl.day.utc.range, pl.dayOfYear=function(t) {
    var e=pl.year(t);
    return Math.floor((t-e-6e4*(t.getTimezoneOffset()-e.getTimezoneOffset()))/864e5);
}
, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(t, e) {
    e=7-e;
    var n=pl[t]=qe(function(t) {
    return(t=pl.day(t)).setDate(t.getDate()-(t.getDay()+e)%7), t;
}
, function(t, e) {
    t.setDate(t.getDate()+7*Math.floor(e));
}
, function(t) {
    var n=pl.year(t).getDay();
    return Math.floor((pl.dayOfYear(t)+(n+e)%7)/7)-(n!==e);
}
);
    pl[t+"s"]=n.range, pl[t+"s"].utc=n.utc.range, pl[t+"OfYear"]=function(t) {
    var n=pl.year(t).getDay();
    
return Math.floor((pl.dayOfYear(t)+(n+e)%7)/7);
}
}), pl.week=pl.sunday, pl.weeks=pl.sunday.range, pl.weeks.utc=pl.sunday.utc.range, pl.weekOfYear=pl.sundayOfYear;
    var vl= {
    "-": "", _:" ", 0:"0"}
, yl=/^\s*\d+/, bl=/^%/;
    la.locale=function(t) {
    return {
    numberFormat: He(t), timeFormat:$e(t);
}
};
    var wl=la.locale( {
    decimal: ".", thousands:", ", grouping:[3], currency:["$", ""], dateTime:"%a %b %e %X %Y", date:"%m/%d/%Y", time:"%H:%M:%S", periods:["AM", "PM"], days:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], months:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
}
);
    la.format=wl.numberFormat, la.geo= {
}
, cn.prototype= {
    s: 0, t:0, add:function(t) {
    hn(t, this.t, xl), hn(xl.s, this.s, this), this.s?this.t+=xl.t: this.s=xl.t;
}
, reset:function() {
    this.s=this.t=0;
}
, valueOf: function() {
    return this.s;
}
};
    var xl=new cn;
    la.geo.stream=function(t, e) {
    t&&_l.hasOwnProperty(t.type)?_l[t.type](t, e): dn(t, e);
}
;
    var _l= {
    Feature: function(t, e) {
    dn(t.geometry, e);
}
, FeatureCollection: function(t, e) {
    for(var n=t.features, i=-1, r=n.length;
    ++i<r;
    )dn(n[i].geometry, e);
}
}, kl= {
    Sphere: function(t, e) {
    e.sphere();
}
, Point: function(t, e) {
    t=t.coordinates, e.point(t[0], t[1], t[2]);
}
, MultiPoint: function(t, e) {
    for(var n=t.coordinates, i=-1, r=n.length;
    ++i<r;
    )t=n[i], e.point(t[0], t[1], t[2]);
}
, LineString: function(t, e) {
    fn(t.coordinates, e, 0);
}
, MultiLineString: function(t, e) {
    for(var n=t.coordinates, i=-1, r=n.length;
    ++i<r;
    )fn(n[i], e, 0);
}
, Polygon: function(t, e) {
    pn(t.coordinates, e);
}
, MultiPolygon: function(t, e) {
    for(var n=t.coordinates, i=-1, r=n.length;
    ++i<r;
    )pn(n[i], e);
}
, GeometryCollection: function(t, e) {
    for(var n=t.geometries, i=-1, r=n.length;
    ++i<r;
    )dn(n[i], e);
}
};
    la.geo.area=function(t) {
    return Cl=0, la.geo.stream(t, El), Cl;
}
;
    var Cl, Tl=new cn, El= {
    sphere: function() {
    Cl+=4*Ra;
}
, point: x, lineStart:x, lineEnd:x, polygonStart:function() {
    Tl.reset(), El.lineStart=gn;
}
, polygonEnd: function() {
    var t=2*Tl;
    Cl+=0>t?4*Ra+t: t, El.lineStart=El.lineEnd=El.point=x;
}
};
    la.geo.bounds=function() {
    function t(t, e) {
    b.push(w=[c=t, d=t]), h>e&&(h=e), e>f&&(f=e);
}
function e(e, n) {
    var i=mn([e*Wa, n*Wa]);
    if(v) {
    var r=yn(v, i), o=[r[1], -r[0], 0], s=yn(o, r);
    xn(s), s=_n(s);
    var l=e-p, u=l>0?1: -1, g=s[0]*Ba*u, m=wa(l)>180;
    if(m^(g>u*p&&u*e>g)) {
    var y=s[1]*Ba;
    y>f&&(f=y);
}
else if(g=(g+360)%360-180, m^(g>u*p&&u*e>g)) {
    var y=-s[1]*Ba;
    h>y&&(h=y);
}
else h>n&&(h=n), n>f&&(f=n);
    m?p>e?a(c, e)>a(c, d)&&(d=e): a(e, d)>a(c, d)&&(c=e):d>=c?(c>e&&(c=e), e>d&&(d=e)):e>p?a(c, e)>a(c, d)&&(d=e):a(e, d)>a(c, d)&&(c=e);
}
else t(e, n);
    v=i, p=e;
}
function n() {
    x.point=e;
}
function i() {
    w[0]=c, w[1]=d, x.point=t, v=null;
}
function r(t, n) {
    if(v) {
    var i=t-p;
    y+=wa(i)>180?i+(i>0?360: -360):i;
}
else g=t, m=n;
    El.point(t, n), e(t, n);
}
function o() {
    El.lineStart();
}
function s() {
    r(g, m), El.lineEnd(), wa(y)>Ha&&(c=-(d=180)), w[0]=c, w[1]=d, v=null;
}
function a(t, e) {
    return(e-=t)<0?e+360: e;
}
function l(t, e) {
    return t[0]-e[0];
}
function u(t, e) {
    return e[0]<=e[1]?e[0]<=t&&t<=e[1]: t<e[0]||e[1]<t;
}
var c, h, d, f, p, g, m, v, y, b, w, x= {
    point: t, lineStart:n, lineEnd:i, polygonStart:function() {
    x.point=r, x.lineStart=o, x.lineEnd=s, y=0, El.polygonStart();
}
, polygonEnd: function() {
    El.polygonEnd(), x.point=t, x.lineStart=n, x.lineEnd=i, 0>Tl?(c=-(d=180), h=-(f=90)): y>Ha?f=90:-Ha>y&&(h=-90), w[0]=c, w[1]=d;
}
};
    return function(t) {
    f=d=-(c=h=1/0), b=[], la.geo.stream(t, x);
    var e=b.length;
    if(e) {
    b.sort(l);
    for(var n, i=1, r=b[0], o=[r];
    e>i;
    ++i)n=b[i], u(n[0], r)||u(n[1], r)?(a(r[0], n[1])>a(r[0], r[1])&&(r[1]=n[1]), a(n[0], r[1])>a(r[0], r[1])&&(r[0]=n[0])): o.push(r=n);
    for(var s, n, p=-(1/0), e=o.length-1, i=0, r=o[e];
    e>=i;
    r=n, ++i)n=o[i], (s=a(r[1], n[0]))>p&&(p=s, c=n[0], d=r[1]);
}
return b=w=null, c===1/0||h===1/0?[[0/0, 0/0], [0/0, 0/0]]: [[c, h], [d, f]];
}}(), la.geo.centroid=function(t) {
    Sl=Ml=Dl=Al=Nl=Pl=Ol=Il=Ll=jl=Hl=0, la.geo.stream(t, zl);
    var e=Ll, n=jl, i=Hl, r=e*e+n*n+i*i;
    return za>r&&(e=Pl, n=Ol, i=Il, Ha>Ml&&(e=Dl, n=Al, i=Nl), r=e*e+n*n+i*i, za>r)?[0/0, 0/0]: [Math.atan2(n, e)*Ba, ee(i/Math.sqrt(r))*Ba];
}
;
    var Sl, Ml, Dl, Al, Nl, Pl, Ol, Il, Ll, jl, Hl, zl= {
    sphere: x, point:Cn, lineStart:En, lineEnd:Sn, polygonStart:function() {
    zl.lineStart=Mn;
}
, polygonEnd: function() {
    zl.lineStart=En;
}
}, Rl=In(An, zn, qn, [-Ra, -Ra/2]), ql=1e9;
    la.geo.clipExtent=function() {
    var t, e, n, i, r, o, s= {
    stream: function(t) {
    return r&&(r.valid=!1), r=o(t), r.valid=!0, r;
}
, extent: function(a) {
    return arguments.length?(o=Bn(t=+a[0][0], e=+a[0][1], n=+a[1][0], i=+a[1][1]), r&&(r.valid=!1, r=null), s): [[t, e], [n, i]];
}
};
    return s.extent([[0, 0], [960, 500]]);
}
, (la.geo.conicEqualArea=function() {
    return Vn(Yn);
}
).raw=Yn, la.geo.albers=function() {
    return la.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070);
}
, la.geo.albersUsa=function() {
    function t(t) {
    var o=t[0], s=t[1];
    return e=null, n(o, s), e||(i(o, s), e)||r(o, s), e;
}
var e, n, i, r, o=la.geo.albers(), s=la.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), a=la.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), l= {
    point: function(t, n) {
    e=[t, n];
}
};
    return t.invert=function(t) {
    var e=o.scale(), n=o.translate(), i=(t[0]-n[0])/e, r=(t[1]-n[1])/e;
    return(r>=.12&&.234>r&&i>=-.425&&-.214>i?s: r>=.166&&.234>r&&i>=-.214&&-.115>i?a:o).invert(t);
}
, t.stream=function(t) {
    var e=o.stream(t), n=s.stream(t), i=a.stream(t);
    return {
    point: function(t, r) {
    e.point(t, r), n.point(t, r), i.point(t, r);
}
, sphere: function() {
    e.sphere(), n.sphere(), i.sphere();
}
, lineStart: function() {
    e.lineStart(), n.lineStart(), i.lineStart();
}
, lineEnd: function() {
    e.lineEnd(), n.lineEnd(), i.lineEnd();
}
, polygonStart: function() {
    e.polygonStart(), n.polygonStart(), i.polygonStart();
}
, polygonEnd: function() {
    e.polygonEnd(), n.polygonEnd(), i.polygonEnd();
}
}}, t.precision=function(e) {
    return arguments.length?(o.precision(e), s.precision(e), a.precision(e), t): o.precision();
}
, t.scale=function(e) {
    return arguments.length?(o.scale(e), s.scale(.35*e), a.scale(e), t.translate(o.translate())): o.scale();
}
, t.translate=function(e) {
    if(!arguments.length)return o.translate();
    var u=o.scale(), c=+e[0], h=+e[1];
    return n=o.translate(e).clipExtent([[c-.455*u, h-.238*u], [c+.455*u, h+.238*u]]).stream(l).point, i=s.translate([c-.307*u, h+.201*u]).clipExtent([[c-.425*u+Ha, h+.12*u+Ha], [c-.214*u-Ha, h+.234*u-Ha]]).stream(l).point, r=a.translate([c-.205*u, h+.212*u]).clipExtent([[c-.214*u+Ha, h+.166*u+Ha], [c-.115*u-Ha, h+.234*u-Ha]]).stream(l).point, t;
}
, t.scale(1070);
};
    var Fl, $l, Wl, Bl, Vl, Yl, Ul= {
    point: x, lineStart:x, lineEnd:x, polygonStart:function() {
    $l=0, Ul.lineStart=Un;
}
, polygonEnd: function() {
    Ul.lineStart=Ul.lineEnd=Ul.point=x, Fl+=wa($l/2);
}
}, Xl= {
    point: Xn, lineStart:x, lineEnd:x, polygonStart:x, polygonEnd:x;
}
, Ql= {
    point: Kn, lineStart:Zn, lineEnd:Jn, polygonStart:function() {
    Ql.lineStart=ti;
}
, polygonEnd: function() {
    Ql.point=Kn, Ql.lineStart=Zn, Ql.lineEnd=Jn;
}
};
    la.geo.path=function() {
    function t(t) {
    return t&&("function"==typeof a&&o.pointRadius(+a.apply(this, arguments)), s&&s.valid||(s=r(o)), la.geo.stream(t, s)), o.result();
}
function e() {
    return s=null, t;
}
var n, i, r, o, s, a=4.5;
    return t.area=function(t) {
    return Fl=0, la.geo.stream(t, r(Ul)), Fl;
}
, t.centroid=function(t) {
    return Dl=Al=Nl=Pl=Ol=Il=Ll=jl=Hl=0, la.geo.stream(t, r(Ql)), Hl?[Ll/Hl, jl/Hl]: Il?[Pl/Il, Ol/Il]:Nl?[Dl/Nl, Al/Nl]:[0/0, 0/0];
}
, t.bounds=function(t) {
    return Vl=Yl=-(Wl=Bl=1/0), la.geo.stream(t, r(Xl)), [[Wl, Bl], [Vl, Yl]];
}
, t.projection=function(t) {
    return arguments.length?(r=(n=t)?t.stream||ii(t): y, e()):n;
}
, t.context=function(t) {
    return arguments.length?(o=null==(i=t)?new Qn: new ei(t), "function"!=typeof a&&o.pointRadius(a), e()):i;
}
, t.pointRadius=function(e) {
    return arguments.length?(a="function"==typeof e?e: (o.pointRadius(+e), +e), t):a;
}
, t.projection(la.geo.albersUsa()).context(null);
}, la.geo.transform=function(t) {
    return {
    stream: function(e) {
    var n=new ri(e);
    for(var i in t)n[i]=t[i];
    return n;
}
}}, ri.prototype= {
    point: function(t, e) {
    this.stream.point(t, e);
}
, sphere: function() {
    this.stream.sphere();
}
, lineStart: function() {
    this.stream.lineStart();
}
, lineEnd: function() {
    this.stream.lineEnd();
}
, polygonStart: function() {
    this.stream.polygonStart();
}
, polygonEnd: function() {
    this.stream.polygonEnd();
}
}, la.geo.projection=si, la.geo.projectionMutator=ai, (la.geo.equirectangular=function() {
    return si(ui);
}
).raw=ui.invert=ui, la.geo.rotation=function(t) {
    function e(e) {
    return e=t(e[0]*Wa, e[1]*Wa), e[0]*=Ba, e[1]*=Ba, e;
}
return t=hi(t[0]%360*Wa, t[1]*Wa, t.length>2?t[2]*Wa: 0), e.invert=function(e) {
    return e=t.invert(e[0]*Wa, e[1]*Wa), e[0]*=Ba, e[1]*=Ba, e;
}
, e;
}, ci.invert=ui, la.geo.circle=function() {
    function t() {
    var t="function"==typeof i?i.apply(this, arguments): i, e=hi(-t[0]*Wa, -t[1]*Wa, 0).invert, r=[];
    return n(null, null, 1,  {
    point: function(t, n) {
    r.push(t=e(t, n)), t[0]*=Ba, t[1]*=Ba;
}
}),  {
    type: "Polygon", coordinates:[r];
}
}var e, n, i=[0, 0], r=6;
    return t.origin=function(e) {
    return arguments.length?(i=e, t): i;
}
, t.angle=function(i) {
    return arguments.length?(n=gi((e=+i)*Wa, r*Wa), t): e;
}
, t.precision=function(i) {
    return arguments.length?(n=gi(e*Wa, (r=+i)*Wa), t): r;
}
, t.angle(90);
}, la.geo.distance=function(t, e) {
    var n, i=(e[0]-t[0])*Wa, r=t[1]*Wa, o=e[1]*Wa, s=Math.sin(i), a=Math.cos(i), l=Math.sin(r), u=Math.cos(r), c=Math.sin(o), h=Math.cos(o);
    return Math.atan2(Math.sqrt((n=h*s)*n+(n=u*c-l*h*a)*n), l*c+u*h*a);
}
, la.geo.graticule=function() {
    function t() {
    return {
    type: "MultiLineString", coordinates:e();
}
}function e() {
    return la.range(Math.ceil(o/m)*m, r, m).map(d).concat(la.range(Math.ceil(u/v)*v, l, v).map(f)).concat(la.range(Math.ceil(i/p)*p, n, p).filter(function(t) {
    return wa(t%m)>Ha;
}
).map(c)).concat(la.range(Math.ceil(a/g)*g, s, g).filter(function(t) {
    return wa(t%v)>Ha;
}
).map(h));
}var n, i, r, o, s, a, l, u, c, h, d, f, p=10, g=p, m=90, v=360, y=2.5;
    return t.lines=function() {
    return e().map(function(t) {
    return {
    type: "LineString", coordinates:t;
}
});
}, t.outline=function() {
    return {
    type: "Polygon", coordinates:[d(o).concat(f(l).slice(1), d(r).reverse().slice(1), f(u).reverse().slice(1))];
}
}, t.extent=function(e) {
    return arguments.length?t.majorExtent(e).minorExtent(e): t.minorExtent();
}
, t.majorExtent=function(e) {
    return arguments.length?(o=+e[0][0], r=+e[1][0], u=+e[0][1], l=+e[1][1], o>r&&(e=o, o=r, r=e), u>l&&(e=u, u=l, l=e), t.precision(y)): [[o, u], [r, l]];
}
, t.minorExtent=function(e) {
    return arguments.length?(i=+e[0][0], n=+e[1][0], a=+e[0][1], s=+e[1][1], i>n&&(e=i, i=n, n=e), a>s&&(e=a, a=s, s=e), t.precision(y)): [[i, a], [n, s]];
}
, t.step=function(e) {
    return arguments.length?t.majorStep(e).minorStep(e): t.minorStep();
}
, t.majorStep=function(e) {
    return arguments.length?(m=+e[0], v=+e[1], t): [m, v];
}
, t.minorStep=function(e) {
    return arguments.length?(p=+e[0], g=+e[1], t): [p, g];
}
, t.precision=function(e) {
    return arguments.length?(y=+e, c=vi(a, s, 90), h=yi(i, n, y), d=vi(u, l, 90), f=yi(o, r, y), t): y;
}
, t.majorExtent([[-180, -90+Ha], [180, 90-Ha]]).minorExtent([[-180, -80-Ha], [180, 80+Ha]]);
}, la.geo.greatArc=function() {
    function t() {
    return {
    type: "LineString", coordinates:[e||i.apply(this, arguments), n||r.apply(this, arguments)];
}
}var e, n, i=bi, r=wi;
    return t.distance=function() {
    return la.geo.distance(e||i.apply(this, arguments), n||r.apply(this, arguments));
}
, t.source=function(n) {
    return arguments.length?(i=n, e="function"==typeof n?null: n, t):i;
}
, t.target=function(e) {
    return arguments.length?(r=e, n="function"==typeof e?null: e, t):r;
}
, t.precision=function() {
    return arguments.length?t: 0;
}
, t;
}, la.geo.interpolate=function(t, e) {
    return xi(t[0]*Wa, t[1]*Wa, e[0]*Wa, e[1]*Wa);
}
, la.geo.length=function(t) {
    return Gl=0, la.geo.stream(t, Kl), Gl;
}
;
    var Gl, Kl= {
    sphere: x, point:x, lineStart:_i, lineEnd:x, polygonStart:x, polygonEnd:x;
}
, Zl=ki(function(t) {
    return Math.sqrt(2/(1+t));
}
, function(t) {
    return 2*Math.asin(t/2);
}
);
    (la.geo.azimuthalEqualArea=function() {
    return si(Zl);
}
).raw=Zl;
    var Jl=ki(function(t) {
    var e=Math.acos(t);
    return e&&e/Math.sin(e);
}
, y);
    (la.geo.azimuthalEquidistant=function() {
    return si(Jl);
}
).raw=Jl, (la.geo.conicConformal=function() {
    return Vn(Ci);
}
).raw=Ci, (la.geo.conicEquidistant=function() {
    return Vn(Ti);
}
).raw=Ti;
    var tu=ki(function(t) {
    return 1/t;
}
, Math.atan);
    (la.geo.gnomonic=function() {
    return si(tu);
}
).raw=tu, Ei.invert=function(t, e) {
    return[t, 2*Math.atan(Math.exp(e))-$a];
}
, (la.geo.mercator=function() {
    return Si(Ei);
}
).raw=Ei;
    var eu=ki(function() {
    return 1;
}
, Math.asin);
    (la.geo.orthographic=function() {
    return si(eu);
}
).raw=eu;
    var nu=ki(function(t) {
    return 1/(1+t);
}
, function(t) {
    return 2*Math.atan(t);
}
);
    (la.geo.stereographic=function() {
    return si(nu);
}
).raw=nu, Mi.invert=function(t, e) {
    return[-e, 2*Math.atan(Math.exp(t))-$a];
}
, (la.geo.transverseMercator=function() {
    var t=Si(Mi), e=t.center, n=t.rotate;
    return t.center=function(t) {
    return t?e([-t[1], t[0]]): (t=e(), [t[1], -t[0]]);
}
, t.rotate=function(t) {
    return t?n([t[0], t[1], t.length>2?t[2]+90: 90]):(t=n(), [t[0], t[1], t[2]-90]);
}
, n([0, 0, 90]);
}).raw=Mi, la.geom= {
}
, la.geom.hull=function(t) {
    function e(t) {
    if(t.length<3)return[];
    var e, r=Ee(n), o=Ee(i), s=t.length, a=[], l=[];
    for(e=0;
    s>e;
    e++)a.push([+r.call(this, t[e], e), +o.call(this, t[e], e), e]);
    for(a.sort(Pi), e=0;
    s>e;
    e++)l.push([a[e][0], -a[e][1]]);
    var u=Ni(a), c=Ni(l), h=c[0]===u[0], d=c[c.length-1]===u[u.length-1], f=[];
    for(e=u.length-1;
    e>=0;
    --e)f.push(t[a[u[e]][2]]);
    for(e=+h;
    e<c.length-d;
    ++e)f.push(t[a[c[e]][2]]);
    return f;
}
var n=Di, i=Ai;
    return arguments.length?e(t): (e.x=function(t) {
    return arguments.length?(n=t, e): n;
}
, e.y=function(t) {
    return arguments.length?(i=t, e): i;
}
, e);
}, la.geom.polygon=function(t) {
    return Ta(t, iu), t;
}
;
    var iu=la.geom.polygon.prototype=[];
    iu.area=function() {
    for(var t, e=-1, n=this.length, i=this[n-1], r=0;
    ++e<n;
    )t=i, i=this[e], r+=t[1]*i[0]-t[0]*i[1];
    return.5*r;
}
, iu.centroid=function(t) {
    var e, n, i=-1, r=this.length, o=0, s=0, a=this[r-1];
    for(arguments.length||(t=-1/(6*this.area()));
    ++i<r;
    )e=a, a=this[i], n=e[0]*a[1]-a[0]*e[1], o+=(e[0]+a[0])*n, s+=(e[1]+a[1])*n;
    return[o*t, s*t];
}
, iu.clip=function(t) {
    for(var e, n, i, r, o, s, a=Li(t), l=-1, u=this.length-Li(this), c=this[u-1];
    ++l<u;
    ) {
    for(e=t.slice(), t.length=0, r=this[l], o=e[(i=e.length-a)-1], n=-1;
    ++n<i;
    )s=e[n], Oi(s, c, r)?(Oi(o, c, r)||t.push(Ii(o, s, c, r)), t.push(s)): Oi(o, c, r)&&t.push(Ii(o, s, c, r)), o=s;
    a&&t.push(t[0]), c=r;
}
return t;
};
    var ru, ou, su, au, lu, uu=[], cu=[];
    Wi.prototype.prepare=function() {
    for(var t, e=this.edges, n=e.length;
    n--;
    )t=e[n].edge, t.b&&t.a||e.splice(n, 1);
    return e.sort(Vi), e.length;
}
, er.prototype= {
    start: function() {
    return this.edge.l===this.site?this.edge.a: this.edge.b;
}
, end:function() {
    return this.edge.l===this.site?this.edge.b: this.edge.a;
}
}, nr.prototype= {
    insert: function(t, e) {
    var n, i, r;
    if(t) {
    if(e.P=t, e.N=t.N, t.N&&(t.N.P=e), t.N=e, t.R) {
    for(t=t.R;
    t.L;
    )t=t.L;
    t.L=e;
}
else t.R=e;
    n=t;
}
else this._?(t=sr(this._), e.P=null, e.N=t, t.P=t.L=e, n=t): (e.P=e.N=null, this._=e, n=null);
    for(e.L=e.R=null, e.U=n, e.C=!0, t=e;
    n&&n.C;
    )i=n.U, n===i.L?(r=i.R, r&&r.C?(n.C=r.C=!1, i.C=!0, t=i): (t===n.R&&(rr(this, n), t=n, n=t.U), n.C=!1, i.C=!0, or(this, i))):(r=i.L, r&&r.C?(n.C=r.C=!1, i.C=!0, t=i):(t===n.L&&(or(this, n), t=n, n=t.U), n.C=!1, i.C=!0, rr(this, i))), n=t.U;
    this._.C=!1;
}
, remove: function(t) {
    t.N&&(t.N.P=t.P), t.P&&(t.P.N=t.N), t.N=t.P=null;
    var e, n, i, r=t.U, o=t.L, s=t.R;
    if(n=o?s?sr(s): o:s, r?r.L===t?r.L=n:r.R=n:this._=n, o&&s?(i=n.C, n.C=t.C, n.L=o, o.U=n, n!==s?(r=n.U, n.U=t.U, t=n.R, r.L=t, n.R=s, s.U=n):(n.U=r, r=n, t=n.R)):(i=t.C, t=n), t&&(t.U=r), !i) {
    if(t&&t.C)return void(t.C=!1);
    do {
    if(t===this._)break;
    if(t===r.L) {
    if(e=r.R, e.C&&(e.C=!1, r.C=!0, rr(this, r), e=r.R), e.L&&e.L.C||e.R&&e.R.C) {
    e.R&&e.R.C||(e.L.C=!1, e.C=!0, or(this, e), e=r.R), e.C=r.C, r.C=e.R.C=!1, rr(this, r), t=this._;
    break;
}
}else if(e=r.L, e.C&&(e.C=!1, r.C=!0, or(this, r), e=r.L), e.L&&e.L.C||e.R&&e.R.C) {
    e.L&&e.L.C||(e.R.C=!1, e.C=!0, rr(this, e), e=r.L), e.C=r.C, r.C=e.L.C=!1, or(this, r), t=this._;
    break;
}
e.C=!0, t=r, r=r.U;
}while(!t.C);
    t&&(t.C=!1);
}
}}, la.geom.voronoi=function(t) {
    function e(t) {
    var e=new Array(t.length), i=a[0][0], r=a[0][1], o=a[1][0], s=a[1][1];
    return ar(n(t), a).cells.forEach(function(n, a) {
    var l=n.edges, u=n.site, c=e[a]=l.length?l.map(function(t) {
    var e=t.start();
    return[e.x, e.y];
}
): u.x>=i&&u.x<=o&&u.y>=r&&u.y<=s?[[i, s], [o, s], [o, r], [i, r]]:[];
    c.point=t[a];
}
), e;
}function n(t) {
    return t.map(function(t, e) {
    return {
    x: Math.round(o(t, e)/Ha)*Ha, y:Math.round(s(t, e)/Ha)*Ha, i:e;
}
});
}var i=Di, r=Ai, o=i, s=r, a=hu;
    return t?e(t): (e.links=function(t) {
    return ar(n(t)).edges.filter(function(t) {
    return t.l&&t.r;
}
).map(function(e) {
    return {
    source: t[e.l.i], target:t[e.r.i];
}
});
}, e.triangles=function(t) {
    var e=[];
    return ar(n(t)).cells.forEach(function(n, i) {
    for(var r, o, s=n.site, a=n.edges.sort(Vi), l=-1, u=a.length, c=a[u-1].edge, h=c.l===s?c.r: c.l;
    ++l<u;
    )r=c, o=h, c=a[l].edge, h=c.l===s?c.r: c.l, i<o.i&&i<h.i&&ur(s, o, h)<0&&e.push([t[i], t[o.i], t[h.i]]);
}
), e;
}, e.x=function(t) {
    return arguments.length?(o=Ee(i=t), e): i;
}
, e.y=function(t) {
    return arguments.length?(s=Ee(r=t), e): r;
}
, e.clipExtent=function(t) {
    return arguments.length?(a=null==t?hu: t, e):a===hu?null:a;
}
, e.size=function(t) {
    return arguments.length?e.clipExtent(t&&[[0, 0], t]): a===hu?null:a&&a[1];
}
, e);
};
    var hu=[[-1e6, -1e6], [1e6, 1e6]];
    la.geom.delaunay=function(t) {
    return la.geom.voronoi().triangles(t);
}
, la.geom.quadtree=function(t, e, n, i, r) {
    function o(t) {
    function o(t, e, n, i, r, o, s, a) {
    if(!isNaN(n)&&!isNaN(i))if(t.leaf) {
    var l=t.x, c=t.y;
    if(null!=l)if(wa(l-n)+wa(c-i)<.01)u(t, e, n, i, r, o, s, a);
    else {
    var h=t.point;
    t.x=t.y=t.point=null, u(t, h, l, c, r, o, s, a), u(t, e, n, i, r, o, s, a);
}
else t.x=n, t.y=i, t.point=e;
}else u(t, e, n, i, r, o, s, a);
}function u(t, e, n, i, r, s, a, l) {
    var u=.5*(r+a), c=.5*(s+l), h=n>=u, d=i>=c, f=d<<1|h;
    t.leaf=!1, t=t.nodes[f]||(t.nodes[f]=dr()), h?r=u: a=u, d?s=c:l=c, o(t, e, n, i, r, s, a, l);
}
var c, h, d, f, p, g, m, v, y, b=Ee(a), w=Ee(l);
    if(null!=e)g=e, m=n, v=i, y=r;
    else if(v=y=-(g=m=1/0), h=[], d=[], p=t.length, s)for(f=0;
    p>f;
    ++f)c=t[f], c.x<g&&(g=c.x), c.y<m&&(m=c.y), c.x>v&&(v=c.x), c.y>y&&(y=c.y), h.push(c.x), d.push(c.y);
    else for(f=0;
    p>f;
    ++f) {
    var x=+b(c=t[f], f), _=+w(c, f);
    g>x&&(g=x), m>_&&(m=_), x>v&&(v=x), _>y&&(y=_), h.push(x), d.push(_);
}
var k=v-g, C=y-m;
    k>C?y=m+k: v=g+C;
    var T=dr();
    if(T.add=function(t) {
    o(T, t, +b(t, ++f), +w(t, f), g, m, v, y);
}
, T.visit=function(t) {
    fr(t, T, g, m, v, y);
}
, T.find=function(t) {
    return pr(T, t[0], t[1], g, m, v, y);
}
, f=-1, null==e) {
    for(;
    ++f<p;
    )o(T, t[f], h[f], d[f], g, m, v, y);
    --f;
}
else t.forEach(T.add);
    return h=d=t=c=null, T;
}
var s, a=Di, l=Ai;
    return(s=arguments.length)?(a=cr, l=hr, 3===s&&(r=n, i=e, n=e=0), o(t)): (o.x=function(t) {
    return arguments.length?(a=t, o): a;
}
, o.y=function(t) {
    return arguments.length?(l=t, o): l;
}
, o.extent=function(t) {
    return arguments.length?(null==t?e=n=i=r=null: (e=+t[0][0], n=+t[0][1], i=+t[1][0], r=+t[1][1]), o):null==e?null:[[e, n], [i, r]];
}
, o.size=function(t) {
    return arguments.length?(null==t?e=n=i=r=null: (e=n=0, i=+t[0], r=+t[1]), o):null==e?null:[i-e, r-n];
}
, o);
}, la.interpolateRgb=gr, la.interpolateObject=mr, la.interpolateNumber=vr, la.interpolateString=yr;
    var du=/[-+]?(?: \d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, fu=new RegExp(du.source, "g");
    la.interpolate=br, la.interpolators=[function(t, e) {
    var n=typeof e;
    return("string"===n?ol.has(e.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(e)?gr: yr:e instanceof se?gr:Array.isArray(e)?wr:"object"===n&&isNaN(e)?mr:vr)(t, e);
}
], la.interpolateArray=wr;
    var pu=function() {
    return y;
}
, gu=la.map( {
    linear: pu, poly:Sr, quad:function() {
    return Cr;
}
, cubic: function() {
    return Tr;
}
, sin: function() {
    return Mr;
}
, exp: function() {
    return Dr;
}
, circle: function() {
    return Ar;
}
, elastic: Nr, back:Pr, bounce:function() {
    return Or;
}
}), mu=la.map( {
    "in": y, out:_r, "in-out":kr, "out-in":function(t) {
    return kr(_r(t));
}
});
    la.ease=function(t) {
    var e=t.indexOf("-"), n=e>=0?t.slice(0, e): t, i=e>=0?t.slice(e+1):"in";
    return n=gu.get(n)||pu, i=mu.get(i)||y, xr(i(n.apply(null, ua.call(arguments, 1))));
}
, la.interpolateHcl=Ir, la.interpolateHsl=Lr, la.interpolateLab=jr, la.interpolateRound=Hr, la.transform=function(t) {
    var e=ha.createElementNS(la.ns.prefix.svg, "g");
    return(la.transform=function(t) {
    if(null!=t) {
    e.setAttribute("transform", t);
    var n=e.transform.baseVal.consolidate();
}
return new zr(n?n.matrix: vu);
})(t);
}, zr.prototype.toString=function() {
    return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"}
;
    var vu= {
    a: 1, b:0, c:0, d:1, e:0, f:0;
}
;
    la.interpolateTransform=Ur, la.layout= {
}
, la.layout.bundle=function() {
    return function(t) {
    for(var e=[], n=-1, i=t.length;
    ++n<i;
    )e.push(Gr(t[n]));
    return e;
}
}, la.layout.chord=function() {
    function t() {
    var t, u, h, d, f, p= {
}
, g=[], m=la.range(o), v=[];
    for(n=[], i=[], t=0, d=-1;
    ++d<o;
    ) {
    for(u=0, f=-1;
    ++f<o;
    )u+=r[d][f];
    g.push(u), v.push(la.range(o)), t+=u;
}
for(s&&m.sort(function(t, e) {
    return s(g[t], g[e]);
}
), a&&v.forEach(function(t, e) {
    t.sort(function(t, n) {
    return a(r[e][t], r[e][n]);
}
);
}), t=(qa-c*o)/t, u=0, d=-1;
    ++d<o;
    ) {
    for(h=u, f=-1;
    ++f<o;
    ) {
    var y=m[d], b=v[y][f], w=r[y][b], x=u, _=u+=w*t;
    p[y+"-"+b]= {
    index: y, subindex:b, startAngle:x, endAngle:_, value:w;
}
}i[y]= {
    index: y, startAngle:h, endAngle:u, value:g[y];
}
, u+=c;
}for(d=-1;
    ++d<o;
    )for(f=d-1;
    ++f<o;
    ) {
    var k=p[d+"-"+f], C=p[f+"-"+d];
    (k.value||C.value)&&n.push(k.value<C.value? {
    source: C, target:k;
}
: {
    source: k, target:C;
}
);
}l&&e();
}function e() {
    n.sort(function(t, e) {
    return l((t.source.value+t.target.value)/2, (e.source.value+e.target.value)/2);
}
);
}var n, i, r, o, s, a, l, u= {
}
, c=0;
    return u.matrix=function(t) {
    return arguments.length?(o=(r=t)&&r.length, n=i=null, u): r;
}
, u.padding=function(t) {
    return arguments.length?(c=t, n=i=null, u): c;
}
, u.sortGroups=function(t) {
    return arguments.length?(s=t, n=i=null, u): s;
}
, u.sortSubgroups=function(t) {
    return arguments.length?(a=t, n=null, u): a;
}
, u.sortChords=function(t) {
    return arguments.length?(l=t, n&&e(), u): l;
}
, u.chords=function() {
    return n||t(), n;
}
, u.groups=function() {
    return i||t(), i;
}
, u;
}, la.layout.force=function() {
    function t(t) {
    return function(e, n, i, r) {
    if(e.point!==t) {
    var o=e.cx-t.x, s=e.cy-t.y, a=r-n, l=o*o+s*s;
    if(l>a*a/v) {
    if(g>l) {
    var u=e.charge/l;
    t.px-=o*u, t.py-=s*u;
}
return!0;
}if(e.point&&l&&g>l) {
    var u=e.pointCharge/l;
    t.px-=o*u, t.py-=s*u;
}
}return!e.charge;
}}function e(t) {
    t.px=la.event.x, t.py=la.event.y, l.resume();
}
var n, i, r, o, s, a, l= {
}
, u=la.dispatch("start", "tick", "end"), c=[1, 1], h=.9, d=yu, f=bu, p=-30, g=wu, m=.1, v=.64, b=[], w=[];
    return l.tick=function() {
    if((r*=.99)<.005)return n=null, u.end( {
    type: "end", alpha:r=0;
}
), !0;
    var e, i, l, d, f, g, v, y, x, _=b.length, k=w.length;
    for(i=0;
    k>i;
    ++i)l=w[i], d=l.source, f=l.target, y=f.x-d.x, x=f.y-d.y, (g=y*y+x*x)&&(g=r*s[i]*((g=Math.sqrt(g))-o[i])/g, y*=g, x*=g, f.x-=y*(v=d.weight+f.weight?d.weight/(d.weight+f.weight): .5), f.y-=x*v, d.x+=y*(v=1-v), d.y+=x*v);
    if((v=r*m)&&(y=c[0]/2, x=c[1]/2, i=-1, v))for(;
    ++i<_;
    )l=b[i], l.x+=(y-l.x)*v, l.y+=(x-l.y)*v;
    if(p)for(io(e=la.geom.quadtree(b), r, a), i=-1;
    ++i<_;
    )(l=b[i]).fixed||e.visit(t(l));
    for(i=-1;
    ++i<_;
    )l=b[i], l.fixed?(l.x=l.px, l.y=l.py): (l.x-=(l.px-(l.px=l.x))*h, l.y-=(l.py-(l.py=l.y))*h);
    u.tick( {
    type: "tick", alpha:r;
}
);
}, l.nodes=function(t) {
    return arguments.length?(b=t, l): b;
}
, l.links=function(t) {
    return arguments.length?(w=t, l): w;
}
, l.size=function(t) {
    return arguments.length?(c=t, l): c;
}
, l.linkDistance=function(t) {
    return arguments.length?(d="function"==typeof t?t: +t, l):d;
}
, l.distance=l.linkDistance, l.linkStrength=function(t) {
    return arguments.length?(f="function"==typeof t?t: +t, l):f;
}
, l.friction=function(t) {
    return arguments.length?(h=+t, l): h;
}
, l.charge=function(t) {
    return arguments.length?(p="function"==typeof t?t: +t, l):p;
}
, l.chargeDistance=function(t) {
    return arguments.length?(g=t*t, l): Math.sqrt(g);
}
, l.gravity=function(t) {
    return arguments.length?(m=+t, l): m;
}
, l.theta=function(t) {
    return arguments.length?(v=t*t, l): Math.sqrt(v);
}
, l.alpha=function(t) {
    return arguments.length?(t=+t, r?t>0?r=t: (n.c=null, n.t=0/0, n=null, u.end( {
    type: "end", alpha:r=0;
}
)):t>0&&(u.start( {
    type: "start", alpha:r=t;
}
), n=Ne(l.tick)), l):r;
}, l.start=function() {
    function t(t, i) {
    if(!n) {
    for(n=new Array(r), l=0;
    r>l;
    ++l)n[l]=[];
    for(l=0;
    u>l;
    ++l) {
    var o=w[l];
    n[o.source.index].push(o.target), n[o.target.index].push(o.source);
}
}for(var s, a=n[e], l=-1, c=a.length;
    ++l<c;
    )if(!isNaN(s=a[l][t]))return s;
    return Math.random()*i;
}
var e, n, i, r=b.length, u=w.length, h=c[0], g=c[1];
    for(e=0;
    r>e;
    ++e)(i=b[e]).index=e, i.weight=0;
    for(e=0;
    u>e;
    ++e)i=w[e], "number"==typeof i.source&&(i.source=b[i.source]), "number"==typeof i.target&&(i.target=b[i.target]), ++i.source.weight, ++i.target.weight;
    for(e=0;
    r>e;
    ++e)i=b[e], isNaN(i.x)&&(i.x=t("x", h)), isNaN(i.y)&&(i.y=t("y", g)), isNaN(i.px)&&(i.px=i.x), isNaN(i.py)&&(i.py=i.y);
    if(o=[], "function"==typeof d)for(e=0;
    u>e;
    ++e)o[e]=+d.call(this, w[e], e);
    else for(e=0;
    u>e;
    ++e)o[e]=d;
    if(s=[], "function"==typeof f)for(e=0;
    u>e;
    ++e)s[e]=+f.call(this, w[e], e);
    else for(e=0;
    u>e;
    ++e)s[e]=f;
    if(a=[], "function"==typeof p)for(e=0;
    r>e;
    ++e)a[e]=+p.call(this, b[e], e);
    else for(e=0;
    r>e;
    ++e)a[e]=p;
    return l.resume();
}
, l.resume=function() {
    return l.alpha(.1);
}
, l.stop=function() {
    return l.alpha(0);
}
, l.drag=function() {
    return i||(i=la.behavior.drag().origin(y).on("dragstart.force", Jr).on("drag.force", e).on("dragend.force", to)), arguments.length?void this.on("mouseover.force", eo).on("mouseout.force", no).call(i): i;
}
, la.rebind(l, u, "on");
};
    var yu=20, bu=1, wu=1/0;
    la.layout.hierarchy=function() {
    function t(r) {
    var o, s=[r], a=[];
    for(r.depth=0;
    null!=(o=s.pop());
    )if(a.push(o), (u=n.call(t, o, o.depth))&&(l=u.length)) {
    for(var l, u, c;
    --l>=0;
    )s.push(c=u[l]), c.parent=o, c.depth=o.depth+1;
    i&&(o.value=0), o.children=u;
}
else i&&(o.value=+i.call(t, o, o.depth)||0), delete o.children;
    return so(r, function(t) {
    var n, r;
    e&&(n=t.children)&&n.sort(e), i&&(r=t.parent)&&(r.value+=t.value);
}
), a;
}var e=uo, n=ao, i=lo;
    return t.sort=function(n) {
    return arguments.length?(e=n, t): e;
}
, t.children=function(e) {
    return arguments.length?(n=e, t): n;
}
, t.value=function(e) {
    return arguments.length?(i=e, t): i;
}
, t.revalue=function(e) {
    return i&&(oo(e, function(t) {
    t.children&&(t.value=0);
}
), so(e, function(e) {
    var n;
    e.children||(e.value=+i.call(t, e, e.depth)||0), (n=e.parent)&&(n.value+=e.value);
}
)), e;
}, t;
}, la.layout.partition=function() {
    function t(e, n, i, r) {
    var o=e.children;
    if(e.x=n, e.y=e.depth*r, e.dx=i, e.dy=r, o&&(s=o.length)) {
    var s, a, l, u=-1;
    for(i=e.value?i/e.value: 0;
    ++u<s;
    )t(a=o[u], n, l=a.value*i, r), n+=l;
}
}function e(t) {
    var n=t.children, i=0;
    if(n&&(r=n.length))for(var r, o=-1;
    ++o<r;
    )i=Math.max(i, e(n[o]));
    return 1+i;
}
function n(n, o) {
    var s=i.call(this, n, o);
    return t(s[0], 0, r[0], r[1]/e(s[0])), s;
}
var i=la.layout.hierarchy(), r=[1, 1];
    return n.size=function(t) {
    return arguments.length?(r=t, n): r;
}
, ro(n, i);
}, la.layout.pie=function() {
    function t(s) {
    var a, l=s.length, u=s.map(function(n, i) {
    return+e.call(t, n, i);
}
), c=+("function"==typeof i?i.apply(this, arguments): i), h=("function"==typeof r?r.apply(this, arguments):r)-c, d=Math.min(Math.abs(h)/l, +("function"==typeof o?o.apply(this, arguments):o)), f=d*(0>h?-1:1), p=la.sum(u), g=p?(h-l*f)/p:0, m=la.range(l), v=[];
    return null!=n&&m.sort(n===xu?function(t, e) {
    return u[e]-u[t];
}
: function(t, e) {
    return n(s[t], s[e]);
}
), m.forEach(function(t) {
    v[t]= {
    data: s[t], value:a=u[t], startAngle:c, endAngle:c+=a*g+f, padAngle:d;
}
}), v;
}var e=Number, n=xu, i=0, r=qa, o=0;
    return t.value=function(n) {
    return arguments.length?(e=n, t): e;
}
, t.sort=function(e) {
    return arguments.length?(n=e, t): n;
}
, t.startAngle=function(e) {
    return arguments.length?(i=e, t): i;
}
, t.endAngle=function(e) {
    return arguments.length?(r=e, t): r;
}
, t.padAngle=function(e) {
    return arguments.length?(o=e, t): o;
}
, t;
};
    var xu= {
}
;
    la.layout.stack=function() {
    function t(a, l) {
    if(!(d=a.length))return a;
    var u=a.map(function(n, i) {
    return e.call(t, n, i);
}
), c=u.map(function(e) {
    return e.map(function(e, n) {
    return[o.call(t, e, n), s.call(t, e, n)];
}
);
}), h=n.call(t, c, l);
    u=la.permute(u, h), c=la.permute(c, h);
    var d, f, p, g, m=i.call(t, c, l), v=u[0].length;
    for(p=0;
    v>p;
    ++p)for(r.call(t, u[0][p], g=m[p], c[0][p][1]), f=1;
    d>f;
    ++f)r.call(t, u[f][p], g+=c[f-1][p][1], c[f][p][1]);
    return a;
}
var e=y, n=go, i=mo, r=po, o=ho, s=fo;
    return t.values=function(n) {
    return arguments.length?(e=n, t): e;
}
, t.order=function(e) {
    return arguments.length?(n="function"==typeof e?e: _u.get(e)||go, t):n;
}
, t.offset=function(e) {
    return arguments.length?(i="function"==typeof e?e: ku.get(e)||mo, t):i;
}
, t.x=function(e) {
    return arguments.length?(o=e, t): o;
}
, t.y=function(e) {
    return arguments.length?(s=e, t): s;
}
, t.out=function(e) {
    return arguments.length?(r=e, t): r;
}
, t;
};
    var _u=la.map( {
    "inside-out": function(t) {
    var e, n, i=t.length, r=t.map(vo), o=t.map(yo), s=la.range(i).sort(function(t, e) {
    return r[t]-r[e];
}
), a=0, l=0, u=[], c=[];
    for(e=0;
    i>e;
    ++e)n=s[e], l>a?(a+=o[n], u.push(n)): (l+=o[n], c.push(n));
    return c.reverse().concat(u);
}
, reverse: function(t) {
    return la.range(t.length).reverse();
}
, "default": go;
}), ku=la.map( {
    silhouette: function(t) {
    var e, n, i, r=t.length, o=t[0].length, s=[], a=0, l=[];
    for(n=0;
    o>n;
    ++n) {
    for(e=0, i=0;
    r>e;
    e++)i+=t[e][n][1];
    i>a&&(a=i), s.push(i);
}
for(n=0;
    o>n;
    ++n)l[n]=(a-s[n])/2;
    return l;
}
, wiggle: function(t) {
    var e, n, i, r, o, s, a, l, u, c=t.length, h=t[0], d=h.length, f=[];
    for(f[0]=l=u=0, n=1;
    d>n;
    ++n) {
    for(e=0, r=0;
    c>e;
    ++e)r+=t[e][n][1];
    for(e=0, o=0, a=h[n][0]-h[n-1][0];
    c>e;
    ++e) {
    for(i=0, s=(t[e][n][1]-t[e][n-1][1])/(2*a);
    e>i;
    ++i)s+=(t[i][n][1]-t[i][n-1][1])/a;
    o+=s*t[e][n][1];
}
f[n]=l-=r?o/r*a: 0, u>l&&(u=l);
}for(n=0;
    d>n;
    ++n)f[n]-=u;
    return f;
}
, expand: function(t) {
    var e, n, i, r=t.length, o=t[0].length, s=1/r, a=[];
    for(n=0;
    o>n;
    ++n) {
    for(e=0, i=0;
    r>e;
    e++)i+=t[e][n][1];
    if(i)for(e=0;
    r>e;
    e++)t[e][n][1]/=i;
    else for(e=0;
    r>e;
    e++)t[e][n][1]=s;
}
for(n=0;
    o>n;
    ++n)a[n]=0;
    return a;
}
, zero: mo;
});
    la.layout.histogram=function() {
    function t(t, o) {
    for(var s, a, l=[], u=t.map(n, this), c=i.call(this, u, o), h=r.call(this, c, u, o), o=-1, d=u.length, f=h.length-1, p=e?1: 1/d;
    ++o<f;
    )s=l[o]=[], s.dx=h[o+1]-(s.x=h[o]), s.y=0;
    if(f>0)for(o=-1;
    ++o<d;
    )a=u[o], a>=c[0]&&a<=c[1]&&(s=l[la.bisect(h, a, 1, f)-1], s.y+=p, s.push(t[o]));
    return l;
}
var e=!0, n=Number, i=_o, r=wo;
    return t.value=function(e) {
    return arguments.length?(n=e, t): n;
}
, t.range=function(e) {
    return arguments.length?(i=Ee(e), t): i;
}
, t.bins=function(e) {
    return arguments.length?(r="number"==typeof e?function(t) {
    return xo(t, e);
}
: Ee(e), t):r;
}, t.frequency=function(n) {
    return arguments.length?(e=!!n, t): e;
}
, t;
}, la.layout.pack=function() {
    function t(t, o) {
    var s=n.call(this, t, o), a=s[0], l=r[0], u=r[1], c=null==e?Math.sqrt: "function"==typeof e?e:function() {
    return e;
}
;
    if(a.x=a.y=0, so(a, function(t) {
    t.r=+c(t.value);
}
), so(a, So), i) {
    var h=i*(e?1: Math.max(2*a.r/l, 2*a.r/u))/2;
    so(a, function(t) {
    t.r+=h;
}
), so(a, So), so(a, function(t) {
    t.r-=h;
}
);
}return Ao(a, l/2, u/2, e?1: 1/Math.max(2*a.r/l, 2*a.r/u)), s;
}var e, n=la.layout.hierarchy().sort(ko), i=0, r=[1, 1];
    return t.size=function(e) {
    return arguments.length?(r=e, t): r;
}
, t.radius=function(n) {
    return arguments.length?(e=null==n||"function"==typeof n?n: +n, t):e;
}
, t.padding=function(e) {
    return arguments.length?(i=+e, t): i;
}
, ro(t, n);
}, la.layout.tree=function() {
    function t(t, r) {
    var c=s.call(this, t, r), h=c[0], d=e(h);
    if(so(d, n), d.parent.m=-d.z, oo(d, i), u)oo(h, o);
    else {
    var f=h, p=h, g=h;
    oo(h, function(t) {
    t.x<f.x&&(f=t), t.x>p.x&&(p=t), t.depth>g.depth&&(g=t);
}
);
    var m=a(f, p)/2-f.x, v=l[0]/(p.x+a(p, f)/2+m), y=l[1]/(g.depth||1);
    oo(h, function(t) {
    t.x=(t.x+m)*v, t.y=t.depth*y;
}
);
}return c;
}function e(t) {
    for(var e, n= {
    A: null, children:[t];
}
, i=[n];
    null!=(e=i.pop());
    )for(var r, o=e.children, s=0, a=o.length;
    a>s;
    ++s)i.push((o[s]=r= {
    _: o[s], parent:e, children:(r=o[s].children)&&r.slice()||[], A:null, a:null, z:0, m:0, c:0, s:0, t:null, i:s;
}
).a=r);
    return n.children[0];
}
function n(t) {
    var e=t.children, n=t.parent.children, i=t.i?n[t.i-1]: null;
    if(e.length) {
    jo(t);
    var o=(e[0].z+e[e.length-1].z)/2;
    i?(t.z=i.z+a(t._, i._), t.m=t.z-o): t.z=o;
}
else i&&(t.z=i.z+a(t._, i._));
    t.parent.A=r(t, i, t.parent.A||n[0]);
}
function i(t) {
    t._.x=t.z+t.parent.m, t.m+=t.parent.m;
}
function r(t, e, n) {
    if(e) {
    for(var i, r=t, o=t, s=e, l=r.parent.children[0], u=r.m, c=o.m, h=s.m, d=l.m;
    s=Io(s), r=Oo(r), s&&r;
    )l=Oo(l), o=Io(o), o.a=t, i=s.z+h-r.z-u+a(s._, r._), i>0&&(Lo(Ho(s, t, n), t, i), u+=i, c+=i), h+=s.m, u+=r.m, d+=l.m, c+=o.m;
    s&&!Io(o)&&(o.t=s, o.m+=h-c), r&&!Oo(l)&&(l.t=r, l.m+=u-d, n=t);
}
return n;
}function o(t) {
    t.x*=l[0], t.y=t.depth*l[1];
}
var s=la.layout.hierarchy().sort(null).value(null), a=Po, l=[1, 1], u=null;
    return t.separation=function(e) {
    return arguments.length?(a=e, t): a;
}
, t.size=function(e) {
    return arguments.length?(u=null==(l=e)?o: null, t):u?null:l;
}
, t.nodeSize=function(e) {
    return arguments.length?(u=null==(l=e)?null: o, t):u?l:null;
}
, ro(t, s);
}, la.layout.cluster=function() {
    function t(t, o) {
    var s, a=e.call(this, t, o), l=a[0], u=0;
    so(l, function(t) {
    var e=t.children;
    e&&e.length?(t.x=Ro(e), t.y=zo(e)): (t.x=s?u+=n(t, s):0, t.y=0, s=t);
}
);
    var c=qo(l), h=Fo(l), d=c.x-n(c, h)/2, f=h.x+n(h, c)/2;
    return so(l, r?function(t) {
    t.x=(t.x-l.x)*i[0], t.y=(l.y-t.y)*i[1];
}
: function(t) {
    t.x=(t.x-d)/(f-d)*i[0], t.y=(1-(l.y?t.y/l.y: 1))*i[1];
}
), a;
}var e=la.layout.hierarchy().sort(null).value(null), n=Po, i=[1, 1], r=!1;
    return t.separation=function(e) {
    return arguments.length?(n=e, t): n;
}
, t.size=function(e) {
    return arguments.length?(r=null==(i=e), t): r?null:i;
}
, t.nodeSize=function(e) {
    return arguments.length?(r=null!=(i=e), t): r?i:null;
}
, ro(t, e);
}, la.layout.treemap=function() {
    function t(t, e) {
    for(var n, i, r=-1, o=t.length;
    ++r<o;
    )i=(n=t[r]).value*(0>e?0: e), n.area=isNaN(i)||0>=i?0:i;
}
function e(n) {
    var o=n.children;
    if(o&&o.length) {
    var s, a, l, u=h(n), c=[], d=o.slice(), p=1/0, g="slice"===f?u.dx: "dice"===f?u.dy:"slice-dice"===f?1&n.depth?u.dy:u.dx:Math.min(u.dx, u.dy);
    for(t(d, u.dx*u.dy/n.value), c.area=0;
    (l=d.length)>0;
    )c.push(s=d[l-1]), c.area+=s.area, "squarify"!==f||(a=i(c, g))<=p?(d.pop(), p=a): (c.area-=c.pop().area, r(c, g, u, !1), g=Math.min(u.dx, u.dy), c.length=c.area=0, p=1/0);
    c.length&&(r(c, g, u, !0), c.length=c.area=0), o.forEach(e);
}
}function n(e) {
    var i=e.children;
    if(i&&i.length) {
    var o, s=h(e), a=i.slice(), l=[];
    for(t(a, s.dx*s.dy/e.value), l.area=0;
    o=a.pop();
    )l.push(o), l.area+=o.area, null!=o.z&&(r(l, o.z?s.dx: s.dy, s, !a.length), l.length=l.area=0);
    i.forEach(n);
}
}function i(t, e) {
    for(var n, i=t.area, r=0, o=1/0, s=-1, a=t.length;
    ++s<a;
    )(n=t[s].area)&&(o>n&&(o=n), n>r&&(r=n));
    return i*=i, e*=e, i?Math.max(e*r*p/i, i/(e*o*p)): 1/0;
}
function r(t, e, n, i) {
    var r, o=-1, s=t.length, a=n.x, u=n.y, c=e?l(t.area/e): 0;
    if(e==n.dx) {
    for((i||c>n.dy)&&(c=n.dy);
    ++o<s;
    )r=t[o], r.x=a, r.y=u, r.dy=c, a+=r.dx=Math.min(n.x+n.dx-a, c?l(r.area/c): 0);
    r.z=!0, r.dx+=n.x+n.dx-a, n.y+=c, n.dy-=c;
}
else {
    for((i||c>n.dx)&&(c=n.dx);
    ++o<s;
    )r=t[o], r.x=a, r.y=u, r.dx=c, u+=r.dy=Math.min(n.y+n.dy-u, c?l(r.area/c): 0);
    
r.z=!1, r.dy+=n.y+n.dy-u, n.x+=c, n.dx-=c;
}
}function o(i) {
    var r=s||a(i), o=r[0];
    return o.x=o.y=0, o.value?(o.dx=u[0], o.dy=u[1]): o.dx=o.dy=0, s&&a.revalue(o), t([o], o.dx*o.dy/o.value), (s?n:e)(o), d&&(s=r), r;
}
var s, a=la.layout.hierarchy(), l=Math.round, u=[1, 1], c=null, h=$o, d=!1, f="squarify", p=.5*(1+Math.sqrt(5));
    return o.size=function(t) {
    return arguments.length?(u=t, o): u;
}
, o.padding=function(t) {
    function e(e) {
    var n=t.call(o, e, e.depth);
    return null==n?$o(e): Wo(e, "number"==typeof n?[n, n, n, n]:n);
}
function n(e) {
    return Wo(e, t);
}
if(!arguments.length)return c;
    var i;
    return h=null==(c=t)?$o: "function"==(i=typeof t)?e:"number"===i?(t=[t, t, t, t], n):n, o;
}
, o.round=function(t) {
    return arguments.length?(l=t?Math.round: Number, o):l!=Number;
}
, o.sticky=function(t) {
    return arguments.length?(d=t, s=null, o): d;
}
, o.ratio=function(t) {
    return arguments.length?(p=t, o): p;
}
, o.mode=function(t) {
    return arguments.length?(f=t+"", o): f;
}
, ro(o, a);
}, la.random= {
    normal: function(t, e) {
    var n=arguments.length;
    return 2>n&&(e=1), 1>n&&(t=0), function() {
    var n, i, r;
    do n=2*Math.random()-1, i=2*Math.random()-1, r=n*n+i*i;
    while(!r||r>1);
    return t+e*n*Math.sqrt(-2*Math.log(r)/r);
}
}, logNormal: function() {
    var t=la.random.normal.apply(la, arguments);
    return function() {
    return Math.exp(t());
}
}, bates: function(t) {
    var e=la.random.irwinHall(t);
    return function() {
    return e()/t;
}
}, irwinHall: function(t) {
    return function() {
    for(var e=0, n=0;
    t>n;
    n++)e+=Math.random();
    return e;
}
}}, la.scale= {
}
;
    var Cu= {
    floor: y, ceil:y;
}
;
    la.scale.linear=function() {
    return Go([0, 1], [0, 1], br, !1);
}
;
    var Tu= {
    s: 1, g:1, p:1, r:1, e:1;
}
;
    la.scale.log=function() {
    return rs(la.scale.linear().domain([0, 1]), 10, !0, [1, 10]);
}
;
    var Eu=la.format(".0e"), Su= {
    floor: function(t) {
    return-Math.ceil(-t);
}
, ceil: function(t) {
    return-Math.floor(-t);
}
};
    la.scale.pow=function() {
    return os(la.scale.linear(), 1, [0, 1]);
}
, la.scale.sqrt=function() {
    return la.scale.pow().exponent(.5);
}
, la.scale.ordinal=function() {
    return as([],  {
    t: "range", a:[[]];
}
);
}, la.scale.category10=function() {
    return la.scale.ordinal().range(Mu);
}
, la.scale.category20=function() {
    return la.scale.ordinal().range(Du);
}
, la.scale.category20b=function() {
    return la.scale.ordinal().range(Au);
}
, la.scale.category20c=function() {
    return la.scale.ordinal().range(Nu);
}
;
    var Mu=[2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(be), Du=[2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(be), Au=[3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(be), Nu=[3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(be);
    la.scale.quantile=function() {
    return ls([], []);
}
, la.scale.quantize=function() {
    return us(0, 1, [0, 1]);
}
, la.scale.threshold=function() {
    return cs([.5], [0, 1]);
}
, la.scale.identity=function() {
    return hs([0, 1]);
}
, la.svg= {
}
, la.svg.arc=function() {
    function t() {
    var t=Math.max(0, +n.apply(this, arguments)), u=Math.max(0, +i.apply(this, arguments)), c=s.apply(this, arguments)-$a, h=a.apply(this, arguments)-$a, d=Math.abs(h-c), f=c>h?0: 1;
    if(t>u&&(p=u, u=t, t=p), d>=Fa)return e(u, f)+(t?e(t, 1-f): "")+"Z";
    var p, g, m, v, y, b, w, x, _, k, C, T, E=0, S=0, M=[];
    if((v=(+l.apply(this, arguments)||0)/2)&&(m=o===Pu?Math.sqrt(t*t+u*u): +o.apply(this, arguments), f||(S*=-1), u&&(S=ee(m/u*Math.sin(v))), t&&(E=ee(m/t*Math.sin(v)))), u) {
    y=u*Math.cos(c+S), b=u*Math.sin(c+S), w=u*Math.cos(h-S), x=u*Math.sin(h-S);
    var D=Math.abs(h-c-2*S)<=Ra?0: 1;
    if(S&&ys(y, b, w, x)===f^D) {
    var A=(c+h)/2;
    y=u*Math.cos(A), b=u*Math.sin(A), w=x=null;
}
}else y=b=0;
    if(t) {
    _=t*Math.cos(h-E), k=t*Math.sin(h-E), C=t*Math.cos(c+E), T=t*Math.sin(c+E);
    var N=Math.abs(c-h+2*E)<=Ra?0: 1;
    if(E&&ys(_, k, C, T)===1-f^N) {
    var P=(c+h)/2;
    _=t*Math.cos(P), k=t*Math.sin(P), C=T=null;
}
}else _=k=0;
    if(d>Ha&&(p=Math.min(Math.abs(u-t)/2, +r.apply(this, arguments)))>.001) {
    g=u>t^f?0: 1;
    var O=p, I=p;
    if(Ra>d) {
    var L=null==C?[_, k]: null==w?[y, b]:Ii([y, b], [C, T], [w, x], [_, k]), j=y-L[0], H=b-L[1], z=w-L[0], R=x-L[1], q=1/Math.sin(Math.acos((j*z+H*R)/(Math.sqrt(j*j+H*H)*Math.sqrt(z*z+R*R)))/2), F=Math.sqrt(L[0]*L[0]+L[1]*L[1]);
    I=Math.min(p, (t-F)/(q-1)), O=Math.min(p, (u-F)/(q+1));
}
if(null!=w) {
    var $=bs(null==C?[_, k]: [C, T], [y, b], u, O, f), W=bs([w, x], [_, k], u, O, f);
    p===O?M.push("M", $[0], "A", O, ", ", O, " 0 0, ", g, " ", $[1], "A", u, ", ", u, " 0 ", 1-f^ys($[1][0], $[1][1], W[1][0], W[1][1]), ", ", f, " ", W[1], "A", O, ", ", O, " 0 0, ", g, " ", W[0]): M.push("M", $[0], "A", O, ", ", O, " 0 1, ", g, " ", W[0]);
}
else M.push("M", y, ", ", b);
    if(null!=C) {
    var B=bs([y, b], [C, T], t, -I, f), V=bs([_, k], null==w?[y, b]: [w, x], t, -I, f);
    p===I?M.push("L", V[0], "A", I, ", ", I, " 0 0, ", g, " ", V[1], "A", t, ", ", t, " 0 ", f^ys(V[1][0], V[1][1], B[1][0], B[1][1]), ", ", 1-f, " ", B[1], "A", I, ", ", I, " 0 0, ", g, " ", B[0]): M.push("L", V[0], "A", I, ", ", I, " 0 0, ", g, " ", B[0]);
}
else M.push("L", _, ", ", k);
}else M.push("M", y, ", ", b), null!=w&&M.push("A", u, ", ", u, " 0 ", D, ", ", f, " ", w, ", ", x), M.push("L", _, ", ", k), null!=C&&M.push("A", t, ", ", t, " 0 ", N, ", ", 1-f, " ", C, ", ", T);
    return M.push("Z"), M.join("");
}
function e(t, e) {
    return"M0, "+t+"A"+t+", "+t+" 0 1, "+e+" 0, "+-t+"A"+t+", "+t+" 0 1, "+e+" 0, "+t;
}
var n=fs, i=ps, r=ds, o=Pu, s=gs, a=ms, l=vs;
    return t.innerRadius=function(e) {
    return arguments.length?(n=Ee(e), t): n;
}
, t.outerRadius=function(e) {
    return arguments.length?(i=Ee(e), t): i;
}
, t.cornerRadius=function(e) {
    return arguments.length?(r=Ee(e), t): r;
}
, t.padRadius=function(e) {
    return arguments.length?(o=e==Pu?Pu: Ee(e), t):o;
}
, t.startAngle=function(e) {
    return arguments.length?(s=Ee(e), t): s;
}
, t.endAngle=function(e) {
    return arguments.length?(a=Ee(e), t): a;
}
, t.padAngle=function(e) {
    return arguments.length?(l=Ee(e), t): l;
}
, t.centroid=function() {
    var t=(+n.apply(this, arguments)+ +i.apply(this, arguments))/2, e=(+s.apply(this, arguments)+ +a.apply(this, arguments))/2-$a;
    return[Math.cos(e)*t, Math.sin(e)*t];
}
, t;
};
    var Pu="auto";
    la.svg.line=function() {
    return ws(y);
}
;
    var Ou=la.map( {
    linear: xs, "linear-closed":_s, step:ks, "step-before":Cs, "step-after":Ts, basis:Ns, "basis-open":Ps, "basis-closed":Os, bundle:Is, cardinal:Ms, "cardinal-open":Es, "cardinal-closed":Ss, monotone:qs;
}
);
    Ou.forEach(function(t, e) {
    e.key=t, e.closed=/-closed$/.test(t);
}
);
    var Iu=[0, 2/3, 1/3, 0], Lu=[0, 1/3, 2/3, 0], ju=[0, 1/6, 2/3, 1/6];
    la.svg.line.radial=function() {
    var t=ws(Fs);
    return t.radius=t.x, delete t.x, t.angle=t.y, delete t.y, t;
}
, Cs.reverse=Ts, Ts.reverse=Cs, la.svg.area=function() {
    return $s(y);
}
, la.svg.area.radial=function() {
    var t=$s(Fs);
    return t.radius=t.x, delete t.x, t.innerRadius=t.x0, delete t.x0, t.outerRadius=t.x1, delete t.x1, t.angle=t.y, delete t.y, t.startAngle=t.y0, delete t.y0, t.endAngle=t.y1, delete t.y1, t;
}
, la.svg.chord=function() {
    function t(t, a) {
    var l=e(this, o, t, a), u=e(this, s, t, a);
    return"M"+l.p0+i(l.r, l.p1, l.a1-l.a0)+(n(l, u)?r(l.r, l.p1, l.r, l.p0): r(l.r, l.p1, u.r, u.p0)+i(u.r, u.p1, u.a1-u.a0)+r(u.r, u.p1, l.r, l.p0))+"Z"}
function e(t, e, n, i) {
    var r=e.call(t, n, i), o=a.call(t, r, i), s=l.call(t, r, i)-$a, c=u.call(t, r, i)-$a;
    return {
    r: o, a0:s, a1:c, p0:[o*Math.cos(s), o*Math.sin(s)], p1:[o*Math.cos(c), o*Math.sin(c)];
}
}function n(t, e) {
    return t.a0==e.a0&&t.a1==e.a1;
}
function i(t, e, n) {
    return"A"+t+", "+t+" 0 "+ +(n>Ra)+", 1 "+e;
}
function r(t, e, n, i) {
    return"Q 0, 0 "+i;
}
var o=bi, s=wi, a=Ws, l=gs, u=ms;
    return t.radius=function(e) {
    return arguments.length?(a=Ee(e), t): a;
}
, t.source=function(e) {
    return arguments.length?(o=Ee(e), t): o;
}
, t.target=function(e) {
    return arguments.length?(s=Ee(e), t): s;
}
, t.startAngle=function(e) {
    return arguments.length?(l=Ee(e), t): l;
}
, t.endAngle=function(e) {
    return arguments.length?(u=Ee(e), t): u;
}
, t;
}, la.svg.diagonal=function() {
    function t(t, r) {
    var o=e.call(this, t, r), s=n.call(this, t, r), a=(o.y+s.y)/2, l=[o,  {
    x: o.x, y:a;
}
,  {
    x: s.x, y:a;
}
, s];
    return l=l.map(i), "M"+l[0]+"C"+l[1]+" "+l[2]+" "+l[3];
}
var e=bi, n=wi, i=Bs;
    return t.source=function(n) {
    return arguments.length?(e=Ee(n), t): e;
}
, t.target=function(e) {
    return arguments.length?(n=Ee(e), t): n;
}
, t.projection=function(e) {
    return arguments.length?(i=e, t): i;
}
, t;
}, la.svg.diagonal.radial=function() {
    var t=la.svg.diagonal(), e=Bs, n=t.projection;
    return t.projection=function(t) {
    return arguments.length?n(Vs(e=t)): e;
}
, t;
}, la.svg.symbol=function() {
    function t(t, i) {
    return(Hu.get(e.call(this, t, i))||Xs)(n.call(this, t, i));
}
var e=Us, n=Ys;
    return t.type=function(n) {
    return arguments.length?(e=Ee(n), t): e;
}
, t.size=function(e) {
    return arguments.length?(n=Ee(e), t): n;
}
, t;
};
    var Hu=la.map( {
    circle: Xs, cross:function(t) {
    var e=Math.sqrt(t/5)/2;
    return"M"+-3*e+", "+-e+"H"+-e+"V"+-3*e+"H"+e+"V"+-e+"H"+3*e+"V"+e+"H"+e+"V"+3*e+"H"+-e+"V"+e+"H"+-3*e+"Z"}
, diamond: function(t) {
    var e=Math.sqrt(t/(2*Ru)), n=e*Ru;
    return"M0, "+-e+"L"+n+", 0 0, "+e+" "+-n+", 0Z"}
, square: function(t) {
    var e=Math.sqrt(t)/2;
    return"M"+-e+", "+-e+"L"+e+", "+-e+" "+e+", "+e+" "+-e+", "+e+"Z"}
, "triangle-down": function(t) {
    var e=Math.sqrt(t/zu), n=e*zu/2;
    return"M0, "+n+"L"+e+", "+-n+" "+-e+", "+-n+"Z"}
, "triangle-up": function(t) {
    var e=Math.sqrt(t/zu), n=e*zu/2;
    return"M0, "+-n+"L"+e+", "+n+" "+-e+", "+n+"Z"}
});
    la.svg.symbolTypes=Hu.keys();
    var zu=Math.sqrt(3), Ru=Math.tan(30*Wa);
    Da.transition=function(t) {
    for(var e, n, i=qu||++Bu, r=Js(t), o=[], s=Fu|| {
    time: Date.now(), ease:Er, delay:0, duration:250;
}
, a=-1, l=this.length;
    ++a<l;
    ) {
    o.push(e=[]);
    for(var u=this[a], c=-1, h=u.length;
    ++c<h;
    )(n=u[c])&&ta(n, c, r, i, s), e.push(n);
}
return Gs(o, r, i);
}, Da.interrupt=function(t) {
    return this.each(null==t?$u: Qs(Js(t)));
}
;
    var qu, Fu, $u=Qs(Js()), Wu=[], Bu=0;
    Wu.call=Da.call, Wu.empty=Da.empty, Wu.node=Da.node, Wu.size=Da.size, la.transition=function(t, e) {
    return t&&t.transition?qu?t.transition(e): t:la.selection().transition(t);
}
, la.transition.prototype=Wu, Wu.select=function(t) {
    var e, n, i, r=this.id, o=this.namespace, s=[];
    t=M(t);
    for(var a=-1, l=this.length;
    ++a<l;
    ) {
    s.push(e=[]);
    for(var u=this[a], c=-1, h=u.length;
    ++c<h;
    )(i=u[c])&&(n=t.call(i, i.__data__, c, a))?("__data__"in i&&(n.__data__=i.__data__), ta(n, c, o, r, i[o][r]), e.push(n)): e.push(null);
}
return Gs(s, o, r);
}, Wu.selectAll=function(t) {
    var e, n, i, r, o, s=this.id, a=this.namespace, l=[];
    t=D(t);
    for(var u=-1, c=this.length;
    ++u<c;
    )for(var h=this[u], d=-1, f=h.length;
    ++d<f;
    )if(i=h[d]) {
    o=i[a][s], n=t.call(i, i.__data__, d, u), l.push(e=[]);
    for(var p=-1, g=n.length;
    ++p<g;
    )(r=n[p])&&ta(r, p, a, s, o), e.push(r);
}
return Gs(l, a, s);
}, Wu.filter=function(t) {
    var e, n, i, r=[];
    "function"!=typeof t&&(t=F(t));
    for(var o=0, s=this.length;
    s>o;
    o++) {
    r.push(e=[]);
    for(var n=this[o], a=0, l=n.length;
    l>a;
    a++)(i=n[a])&&t.call(i, i.__data__, a, o)&&e.push(i);
}
return Gs(r, this.namespace, this.id);
}, Wu.tween=function(t, e) {
    var n=this.id, i=this.namespace;
    return arguments.length<2?this.node()[i][n].tween.get(t): W(this, null==e?function(e) {
    e[i][n].tween.remove(t);
}
: function(r) {
    r[i][n].tween.set(t, e);
}
);
}, Wu.attr=function(t, e) {
    function n() {
    this.removeAttribute(a);
}
function i() {
    this.removeAttributeNS(a.space, a.local);
}
function r(t) {
    return null==t?n: (t+="", function() {
    var e, n=this.getAttribute(a);
    return n!==t&&(e=s(n, t), function(t) {
    this.setAttribute(a, e(t));
}
);
});
}function o(t) {
    return null==t?i: (t+="", function() {
    var e, n=this.getAttributeNS(a.space, a.local);
    return n!==t&&(e=s(n, t), function(t) {
    this.setAttributeNS(a.space, a.local, e(t));
}
);
});
}if(arguments.length<2) {
    for(e in t)this.attr(e, t[e]);
    return this;
}
var s="transform"==t?Ur: br, a=la.ns.qualify(t);
    return Ks(this, "attr."+t, e, a.local?o: r);
}
, Wu.attrTween=function(t, e) {
    function n(t, n) {
    var i=e.call(this, t, n, this.getAttribute(r));
    return i&&function(t) {
    this.setAttribute(r, i(t));
}
}function i(t, n) {
    var i=e.call(this, t, n, this.getAttributeNS(r.space, r.local));
    return i&&function(t) {
    this.setAttributeNS(r.space, r.local, i(t));
}
}var r=la.ns.qualify(t);
    return this.tween("attr."+t, r.local?i: n);
}
, Wu.style=function(t, n, i) {
    function r() {
    this.style.removeProperty(t);
}
function o(n) {
    return null==n?r: (n+="", function() {
    var r, o=e(this).getComputedStyle(this, null).getPropertyValue(t);
    return o!==n&&(r=br(o, n), function(e) {
    this.style.setProperty(t, r(e), i);
}
);
});
}var s=arguments.length;
    if(3>s) {
    if("string"!=typeof t) {
    2>s&&(n="");
    for(i in t)this.style(i, t[i], n);
    return this;
}
i=""}return Ks(this, "style."+t, n, o);
}, Wu.styleTween=function(t, n, i) {
    function r(r, o) {
    var s=n.call(this, r, o, e(this).getComputedStyle(this, null).getPropertyValue(t));
    return s&&function(e) {
    this.style.setProperty(t, s(e), i);
}
}return arguments.length<3&&(i=""), this.tween("style."+t, r);
}, Wu.text=function(t) {
    return Ks(this, "text", t, Zs);
}
, Wu.remove=function() {
    var t=this.namespace;
    return this.each("end.transition", function() {
    var e;
    this[t].count<2&&(e=this.parentNode)&&e.removeChild(this);
}
);
}, Wu.ease=function(t) {
    var e=this.id, n=this.namespace;
    return arguments.length<1?this.node()[n][e].ease: ("function"!=typeof t&&(t=la.ease.apply(la, arguments)), W(this, function(i) {
    i[n][e].ease=t;
}
));
}, Wu.delay=function(t) {
    var e=this.id, n=this.namespace;
    return arguments.length<1?this.node()[n][e].delay: W(this, "function"==typeof t?function(i, r, o) {
    i[n][e].delay=+t.call(i, i.__data__, r, o);
}
: (t=+t, function(i) {
    i[n][e].delay=t;
}
));
}, Wu.duration=function(t) {
    var e=this.id, n=this.namespace;
    return arguments.length<1?this.node()[n][e].duration: W(this, "function"==typeof t?function(i, r, o) {
    i[n][e].duration=Math.max(1, t.call(i, i.__data__, r, o));
}
: (t=Math.max(1, t), function(i) {
    i[n][e].duration=t;
}
));
}, Wu.each=function(t, e) {
    var n=this.id, i=this.namespace;
    if(arguments.length<2) {
    var r=Fu, o=qu;
    try {
    qu=n, W(this, function(e, r, o) {
    Fu=e[i][n], t.call(e, e.__data__, r, o);
}
);
}finally {
    Fu=r, qu=o;
}
}else W(this, function(r) {
    var o=r[i][n];
    (o.event||(o.event=la.dispatch("start", "end", "interrupt"))).on(t, e);
}
);
    return this;
}
, Wu.transition=function() {
    for(var t, e, n, i, r=this.id, o=++Bu, s=this.namespace, a=[], l=0, u=this.length;
    u>l;
    l++) {
    a.push(t=[]);
    for(var e=this[l], c=0, h=e.length;
    h>c;
    c++)(n=e[c])&&(i=n[s][r], ta(n, c, s, o,  {
    time: i.time, ease:i.ease, delay:i.delay+i.duration, duration:i.duration;
}
)), t.push(n);
}return Gs(a, s, o);
}, la.svg.axis=function() {
    function t(t) {
    t.each(function() {
    var t, u=la.select(this), c=this.__chart__||n, h=this.__chart__=n.copy(), d=null==l?h.ticks?h.ticks.apply(h, a): h.domain():l, f=null==e?h.tickFormat?h.tickFormat.apply(h, a):y:e, p=u.selectAll(".tick").data(d, h), g=p.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Ha), m=la.transition(p.exit()).style("opacity", Ha).remove(), v=la.transition(p.order()).style("opacity", 1), b=Math.max(r, 0)+s, w=Vo(h), x=u.selectAll(".domain").data([0]), _=(x.enter().append("path").attr("class", "domain"), la.transition(x));
    g.append("line"), g.append("text");
    var k, C, T, E, S=g.select("line"), M=v.select("line"), D=p.select("text").text(f), A=g.select("text"), N=v.select("text"), P="top"===i||"left"===i?-1: 1;
    if("bottom"===i||"top"===i?(t=ea, k="x", T="y", C="x2", E="y2", D.attr("dy", 0>P?"0em": ".71em").style("text-anchor", "middle"), _.attr("d", "M"+w[0]+", "+P*o+"V0H"+w[1]+"V"+P*o)):(t=na, k="y", T="x", C="y2", E="x2", D.attr("dy", ".32em").style("text-anchor", 0>P?"end":"start"), _.attr("d", "M"+P*o+", "+w[0]+"H0V"+w[1]+"H"+P*o)), S.attr(E, P*r), A.attr(T, P*b), M.attr(C, 0).attr(E, P*r), N.attr(k, 0).attr(T, P*b), h.rangeBand) {
    var O=h, I=O.rangeBand()/2;
    c=h=function(t) {
    return O(t)+I;
}
}else c.rangeBand?c=h: m.call(t, h, c);
    g.call(t, c, h), v.call(t, h, h);
}
);
}var e, n=la.scale.linear(), i=Vu, r=6, o=6, s=3, a=[10], l=null;
    return t.scale=function(e) {
    return arguments.length?(n=e, t): n;
}
, t.orient=function(e) {
    return arguments.length?(i=e in Yu?e+"": Vu, t):i;
}
, t.ticks=function() {
    return arguments.length?(a=ca(arguments), t): a;
}
, t.tickValues=function(e) {
    return arguments.length?(l=e, t): l;
}
, t.tickFormat=function(n) {
    return arguments.length?(e=n, t): e;
}
, t.tickSize=function(e) {
    var n=arguments.length;
    return n?(r=+e, o=+arguments[n-1], t): r;
}
, t.innerTickSize=function(e) {
    return arguments.length?(r=+e, t): r;
}
, t.outerTickSize=function(e) {
    return arguments.length?(o=+e, t): o;
}
, t.tickPadding=function(e) {
    return arguments.length?(s=+e, t): s;
}
, t.tickSubdivide=function() {
    return arguments.length&&t;
}
, t;
};
    var Vu="bottom", Yu= {
    top: 1, right:1, bottom:1, left:1;
}
;
    la.svg.brush=function() {
    function t(e) {
    e.each(function() {
    var e=la.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0)").on("mousedown.brush", o).on("touchstart.brush", o), s=e.selectAll(".background").data([0]);
    s.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), e.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
    var a=e.selectAll(".resize").data(g, y);
    a.exit().remove(), a.enter().append("g").attr("class", function(t) {
    return"resize "+t;
}
).style("cursor", function(t) {
    return Uu[t];
}
).append("rect").attr("x", function(t) {
    return/[ew]$/.test(t)?-3: null;
}
).attr("y", function(t) {
    return/^[ns]/.test(t)?-3: null;
}
).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", t.empty()?"none":null);
    var l, h=la.transition(e), d=la.transition(s);
    u&&(l=Vo(u), d.attr("x", l[0]).attr("width", l[1]-l[0]), i(h)), c&&(l=Vo(c), d.attr("y", l[0]).attr("height", l[1]-l[0]), r(h)), n(h);
}
);
}function n(t) {
    t.selectAll(".resize").attr("transform", function(t) {
    return"translate("+h[+/e$/.test(t)]+", "+d[+/^s/.test(t)]+")"}
);
}function i(t) {
    t.select(".extent").attr("x", h[0]), t.selectAll(".extent, .n>rect, .s>rect").attr("width", h[1]-h[0]);
}
function r(t) {
    t.select(".extent").attr("y", d[0]), t.selectAll(".extent, .e>rect, .w>rect").attr("height", d[1]-d[0]);
}
function o() {
    function o() {
    32==la.event.keyCode&&(D||(b=null, N[0]-=h[1], N[1]-=d[1], D=2), C());
}
function g() {
    32==la.event.keyCode&&2==D&&(N[0]+=h[1], N[1]+=d[1], D=0, C());
}
function m() {
    var t=la.mouse(x), e=!1;
    w&&(t[0]+=w[0], t[1]+=w[1]), D||(la.event.altKey?(b||(b=[(h[0]+h[1])/2, (d[0]+d[1])/2]), N[0]=h[+(t[0]<b[0])], N[1]=d[+(t[1]<b[1])]): b=null), S&&v(t, u, 0)&&(i(T), e=!0), M&&v(t, c, 1)&&(r(T), e=!0), e&&(n(T), k( {
    type: "brush", mode:D?"move":"resize"}
));
}function v(t, e, n) {
    var i, r, o=Vo(e), l=o[0], u=o[1], c=N[n], g=n?d: h, m=g[1]-g[0];
    return D&&(l-=c, u-=m+c), i=(n?p: f)?Math.max(l, Math.min(u, t[n])):t[n], D?r=(i+=c)+m:(b&&(c=Math.max(l, Math.min(u, 2*b[n]-i))), i>c?(r=i, i=c):r=c), g[0]!=i||g[1]!=r?(n?a=null:s=null, g[0]=i, g[1]=r, !0):void 0;
}
function y() {
    m(), T.style("pointer-events", "all").selectAll(".resize").style("display", t.empty()?"none": null), la.select("body").style("cursor", null), P.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), A(), k( {
    type: "brushend"}
);
}var b, w, x=this, _=la.select(la.event.target), k=l.of(x, arguments), T=la.select(x), E=_.datum(), S=!/^(n|s)$/.test(E)&&u, M=!/^(e|w)$/.test(E)&&c, D=_.classed("extent"), A=Q(x), N=la.mouse(x), P=la.select(e(x)).on("keydown.brush", o).on("keyup.brush", g);
    if(la.event.changedTouches?P.on("touchmove.brush", m).on("touchend.brush", y): P.on("mousemove.brush", m).on("mouseup.brush", y), T.interrupt().selectAll("*").interrupt(), D)N[0]=h[0]-N[0], N[1]=d[0]-N[1];
    else if(E) {
    var O=+/w$/.test(E), I=+/^n/.test(E);
    w=[h[1-O]-N[0], d[1-I]-N[1]], N[0]=h[O], N[1]=d[I];
}
else la.event.altKey&&(b=N.slice());
    T.style("pointer-events", "none").selectAll(".resize").style("display", null), la.select("body").style("cursor", _.style("cursor")), k( {
    type: "brushstart"}
), m();
}var s, a, l=E(t, "brushstart", "brush", "brushend"), u=null, c=null, h=[0, 0], d=[0, 0], f=!0, p=!0, g=Xu[0];
    return t.event=function(t) {
    t.each(function() {
    var t=l.of(this, arguments), e= {
    x: h, y:d, i:s, j:a;
}
, n=this.__chart__||e;
    this.__chart__=e, qu?la.select(this).transition().each("start.brush", function() {
    s=n.i, a=n.j, h=n.x, d=n.y, t( {
    type: "brushstart"}
);
}).tween("brush:brush", function() {
    var n=wr(h, e.x), i=wr(d, e.y);
    return s=a=null, function(r) {
    h=e.x=n(r), d=e.y=i(r), t( {
    type: "brush", mode:"resize"}
);
}}).each("end.brush", function() {
    s=e.i, a=e.j, t( {
    type: "brush", mode:"resize"}
), t( {
    type: "brushend"}
);
}):(t( {
    type: "brushstart"}
), t( {
    type: "brush", mode:"resize"}
), t( {
    type: "brushend"}
));
});
}, t.x=function(e) {
    return arguments.length?(u=e, g=Xu[!u<<1|!c], t): u;
}
, t.y=function(e) {
    return arguments.length?(c=e, g=Xu[!u<<1|!c], t): c;
}
, t.clamp=function(e) {
    return arguments.length?(u&&c?(f=!!e[0], p=!!e[1]): u?f=!!e:c&&(p=!!e), t):u&&c?[f, p]:u?f:c?p:null;
}
, t.extent=function(e) {
    var n, i, r, o, l;
    return arguments.length?(u&&(n=e[0], i=e[1], c&&(n=n[0], i=i[0]), s=[n, i], u.invert&&(n=u(n), i=u(i)), n>i&&(l=n, n=i, i=l), n==h[0]&&i==h[1]||(h=[n, i])), c&&(r=e[0], o=e[1], u&&(r=r[1], o=o[1]), a=[r, o], c.invert&&(r=c(r), o=c(o)), r>o&&(l=r, r=o, o=l), r==d[0]&&o==d[1]||(d=[r, o])), t): (u&&(s?(n=s[0], i=s[1]):(n=h[0], i=h[1], u.invert&&(n=u.invert(n), i=u.invert(i)), n>i&&(l=n, n=i, i=l))), c&&(a?(r=a[0], o=a[1]):(r=d[0], o=d[1], c.invert&&(r=c.invert(r), o=c.invert(o)), r>o&&(l=r, r=o, o=l))), u&&c?[[n, r], [i, o]]:u?[n, i]:c&&[r, o]);
}
, t.clear=function() {
    return t.empty()||(h=[0, 0], d=[0, 0], s=a=null), t;
}
, t.empty=function() {
    return!!u&&h[0]==h[1]||!!c&&d[0]==d[1];
}
, la.rebind(t, l, "on");
};
    var Uu= {
    n: "ns-resize", e:"ew-resize", s:"ns-resize", w:"ew-resize", nw:"nwse-resize", ne:"nesw-resize", se:"nwse-resize", sw:"nesw-resize"}
, Xu=[["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []], Qu=pl.format=wl.timeFormat, Gu=Qu.utc, Ku=Gu("%Y-%m-%dT%H:%M:%S.%LZ");
    Qu.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00: 00:00.000Z")?ia:Ku, ia.parse=function(t) {
    var e=new Date(t);
    return isNaN(e)?null: e;
}
, ia.toString=Ku.toString, pl.second=qe(function(t) {
    return new gl(1e3*Math.floor(t/1e3));
}
, function(t, e) {
    t.setTime(t.getTime()+1e3*Math.floor(e));
}
, function(t) {
    return t.getSeconds();
}
), pl.seconds=pl.second.range, pl.seconds.utc=pl.second.utc.range, pl.minute=qe(function(t) {
    return new gl(6e4*Math.floor(t/6e4));
}
, function(t, e) {
    t.setTime(t.getTime()+6e4*Math.floor(e));
}
, function(t) {
    return t.getMinutes();
}
), pl.minutes=pl.minute.range, pl.minutes.utc=pl.minute.utc.range, pl.hour=qe(function(t) {
    var e=t.getTimezoneOffset()/60;
    return new gl(36e5*(Math.floor(t/36e5-e)+e));
}
, function(t, e) {
    t.setTime(t.getTime()+36e5*Math.floor(e));
}
, function(t) {
    return t.getHours();
}
), pl.hours=pl.hour.range, pl.hours.utc=pl.hour.utc.range, pl.month=qe(function(t) {
    return t=pl.day(t), t.setDate(1), t;
}
, function(t, e) {
    t.setMonth(t.getMonth()+e);
}
, function(t) {
    return t.getMonth();
}
), pl.months=pl.month.range, pl.months.utc=pl.month.utc.range;
    var Zu=[1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6], Ju=[[pl.second, 1], [pl.second, 5], [pl.second, 15], [pl.second, 30], [pl.minute, 1], [pl.minute, 5], [pl.minute, 15], [pl.minute, 30], [pl.hour, 1], [pl.hour, 3], [pl.hour, 6], [pl.hour, 12], [pl.day, 1], [pl.day, 2], [pl.week, 1], [pl.month, 1], [pl.month, 3], [pl.year, 1]], tc=Qu.multi([[".%L", function(t) {
    return t.getMilliseconds();
}
], [": %S", function(t) {
    return t.getSeconds();
}
], ["%I: %M", function(t) {
    return t.getMinutes();
}
], ["%I %p", function(t) {
    return t.getHours();
}
], ["%a %d", function(t) {
    return t.getDay()&&1!=t.getDate();
}
], ["%b %d", function(t) {
    return 1!=t.getDate();
}
], ["%B", function(t) {
    return t.getMonth();
}
], ["%Y", An]]), ec= {
    range: function(t, e, n) {
    return la.range(Math.ceil(t/n)*n, +e, n).map(oa);
}
, floor: y, ceil:y;
};
    Ju.year=pl.year, pl.scale=function() {
    return ra(la.scale.linear(), Ju, tc);
}
;
    var nc=Ju.map(function(t) {
    return[t[0].utc, t[1]];
}
), ic=Gu.multi([[".%L", function(t) {
    return t.getUTCMilliseconds();
}
], [": %S", function(t) {
    return t.getUTCSeconds();
}
], ["%I: %M", function(t) {
    return t.getUTCMinutes();
}
], ["%I %p", function(t) {
    return t.getUTCHours();
}
], ["%a %d", function(t) {
    return t.getUTCDay()&&1!=t.getUTCDate();
}
], ["%b %d", function(t) {
    return 1!=t.getUTCDate();
}
], ["%B", function(t) {
    return t.getUTCMonth();
}
], ["%Y", An]]);
    nc.year=pl.year.utc, pl.scale.utc=function() {
    return ra(la.scale.linear(), nc, ic);
}
, la.text=Se(function(t) {
    return t.responseText;
}
), la.json=function(t, e) {
    return Me(t, "application/json", sa, e);
}
, la.html=function(t, e) {
    return Me(t, "text/html", aa, e);
}
, la.xml=Se(function(t) {
    return t.responseXML;
}
), "function"==typeof define&&define.amd?(this.d3=la, define(la)): "object"==typeof module&&module.exports?module.exports=la:this.d3=la;
}(), topojson=function() {
    function t(t, e) {
    function n(e) {
    var n=t.arcs[e], i=n[0], r=[0, 0];
    return n.forEach(function(t) {
    r[0]+=t[0], r[1]+=t[1];
}
), [i, r];
}var i= {
}
, r= {
}
, o= {
}
;
    e.forEach(function(t) {
    var e=n(t);
    (i[e[0]]||(i[e[0]]=[])).push(t), (i[e[1]]||(i[e[1]]=[])).push(~t);
}
), e.forEach(function(t) {
    var e, i, s=n(t), a=s[0], l=s[1];
    if(e=o[a])if(delete o[e.end], e.push(t), e.end=l, i=r[l]) {
    delete r[i.start];
    var u=i===e?e: e.concat(i);
    r[u.start=e.start]=o[u.end=i.end]=u;
}
else if(i=o[l]) {
    delete r[i.start], delete o[i.end];
    var u=e.concat(i.map(function(t) {
    return~t;
}
).reverse());
    r[u.start=e.start]=o[u.end=i.start]=u;
}
else r[e.start]=o[e.end]=e;
    else if(e=r[l])if(delete r[e.start], e.unshift(t), e.start=a, i=o[a]) {
    delete o[i.end];
    var c=i===e?e: i.concat(e);
    r[c.start=i.start]=o[c.end=e.end]=c;
}
else if(i=r[a]) {
    delete r[i.start], delete o[i.end];
    var c=i.map(function(t) {
    return~t;
}
).reverse().concat(e);
    r[c.start=i.end]=o[c.end=e.end]=c;
}
else r[e.start]=o[e.end]=e;
    else if(e=r[a])if(delete r[e.start], e.unshift(~t), e.start=l, i=o[l]) {
    delete o[i.end];
    var c=i===e?e: i.concat(e);
    r[c.start=i.start]=o[c.end=e.end]=c;
}
else if(i=r[l]) {
    delete r[i.start], delete o[i.end];
    var c=i.map(function(t) {
    return~t;
}
).reverse().concat(e);
    r[c.start=i.end]=o[c.end=e.end]=c;
}
else r[e.start]=o[e.end]=e;
    else if(e=o[l])if(delete o[e.end], e.push(~t), e.end=a, i=o[a]) {
    delete r[i.start];
    var u=i===e?e: e.concat(i);
    r[u.start=e.start]=o[u.end=i.end]=u;
}
else if(i=r[a]) {
    delete r[i.start], delete o[i.end];
    var u=e.concat(i.map(function(t) {
    return~t;
}
).reverse());
    r[u.start=e.start]=o[u.end=i.start]=u;
}
else r[e.start]=o[e.end]=e;
    else e=[t], r[e.start=a]=o[e.end=l]=e;
}
);
    var s=[];
    for(var a in o)s.push(o[a]);
    return s;
}
function e(e, i, r) {
    function o(t) {
    0>t&&(t=~t), (h[t]||(h[t]=[])).push(c);
}
function s(t) {
    t.forEach(o);
}
function a(t) {
    t.forEach(s);
}
function l(t) {
    "GeometryCollection"===t.type?t.geometries.forEach(l): t.type in d&&(c=t, d[t.type](t.arcs));
}
var u=[];
    if(arguments.length>1) {
    var c, h=[], d= {
    LineString: s, MultiLineString:a, Polygon:a, MultiPolygon:function(t) {
    t.forEach(a);
}
};
    l(i), h.forEach(3>arguments.length?function(t, e) {
    u.push([e]);
}
: function(t, e) {
    r(t[0], t[t.length-1])&&u.push([e]);
}
);
}else for(var f=0, p=e.arcs.length;
    p>f;
    ++f)u.push([f]);
    return n(e,  {
    type: "MultiLineString", arcs:t(e, u);
}
);
}function n(t, e) {
    function n(t, e) {
    e.length&&e.pop();
    for(var n, r=p[0>t?~t: t], o=0, s=r.length, a=0, l=0;
    s>o;
    ++o)e.push([(a+=(n=r[o])[0])*c+d, (l+=n[1])*h+f]);
    0>t&&i(e, s);
}
function r(t) {
    return[t[0]*c+d, t[1]*h+f];
}
function o(t) {
    for(var e=[], i=0, r=t.length;
    r>i;
    ++i)n(t[i], e);
    return 2>e.length&&e.push(e[0]), e;
}
function s(t) {
    for(var e=o(t);
    4>e.length;
    )e.push(e[0]);
    return e;
}
function a(t) {
    return t.map(s);
}
function l(t) {
    var e=t.type, n="GeometryCollection"===e? {
    type: e, geometries:t.geometries.map(l);
}
:e in g? {
    type: e, coordinates:g[e](t);
}
: {
    type: null;
}
;
    return"id"in t&&(n.id=t.id), "properties"in t&&(n.properties=t.properties), n;
}
var u=t.transform, c=u.scale[0], h=u.scale[1], d=u.translate[0], f=u.translate[1], p=t.arcs, g= {
    Point: function(t) {
    return r(t.coordinates);
}
, MultiPoint: function(t) {
    return t.coordinates.map(r);
}
, LineString: function(t) {
    return o(t.arcs);
}
, MultiLineString: function(t) {
    return t.arcs.map(o);
}
, Polygon: function(t) {
    return a(t.arcs);
}
, MultiPolygon: function(t) {
    return t.arcs.map(a);
}
};
    return l(e);
}
function i(t, e) {
    for(var n, i=t.length, r=i-e;
    --i>r;
    )n=t[r], t[r++]=t[i], t[i]=n;
}
function r(t, e) {
    for(var n=0, i=t.length;
    i>n;
    ) {
    var r=n+i>>>1;
    e>t[r]?n=r+1: i=r;
}
return n;
}function o(t) {
    function e(t, e) {
    t.forEach(function(t) {
    0>t&&(t=~t);
    var n=o[t]||(o[t]=[]);
    n[e]||(n.forEach(function(t) {
    var n, i;
    i=r(n=s[e], t), n[i]!==t&&n.splice(i, 0, t), i=r(n=s[t], e), n[i]!==e&&n.splice(i, 0, e);
}
), n[e]=e);
});
}function n(t, n) {
    t.forEach(function(t) {
    e(t, n);
}
);
}function i(t, e) {
    "GeometryCollection"===t.type?t.geometries.forEach(function(t) {
    i(t, e);
}
): t.type in a&&a[t.type](t.arcs, e);
}var o=[], s=t.map(function() {
    return[];
}
), a= {
    LineString: e, MultiLineString:n, Polygon:n, MultiPolygon:function(t, e) {
    t.forEach(function(t) {
    n(t, e);
}
);
}};
    return t.forEach(i), s;
}
return {
    version: "0.0.32", mesh:e, object:n, neighbors:o;
}
}(), function() {
    var t, e;
    t=function() {
    var t, e, n, i, r, o, s, a, l, u;
    return l=0, e=0, r=d3.geo.mercator(), s=function() {
    var t, n;
    return l=$("#data_map").width(), e=$("#data_map").height(), n=200, l>980?t=l/2: 980>=l&&l>=592?t=100:592>l&&l>=340?(n=130, t=60):(n=110, t=35), r=d3.geo.mercator().center([0, 0]).scale(n).rotate([0, 0]).translate([t, 280]);
}
, s(), $("#svg")[0]&&$("#data_map").remove("#svg"), a=d3.select("#data_map").append("div").attr("id", "svg").append("svg"), i=d3.geo.path().projection(r), t=a.append("g"), n=function() {
    return d3.json("/world-110m2.json", function(e, n) {
    d3.csv("/cities.csv", function(e, n) {
    t.selectAll("circle").data(n).enter().append("circle").attr("cx", function(t) {
    return r([t.lon, t.lat])[0];
}
).attr("cy", function(t) {
    return r([t.lon, t.lat])[1];
}
).attr("r", 4).style("fill", "#0019B3").style("stroke", "white"), t.selectAll("rect").data(n).enter().append("rect").attr("width", function(t) {
    return"Berlin"===t.city?40: "Phnom Penh"===t.city?83:"Ho Chi Minh City"===t.city?110:void 0;
}
).attr("x", function(t) {
    var e;
    return e=r([t.lon, t.lat])[0], "start"===t.style?e+8: e-90;
}
).attr("y", function(t) {
    return r([t.lon, t.lat])[1]-9;
}
).attr("height", 17).style("fill", function() {
    return $("#data_map").width()>420?"white": "none"}
), t.selectAll("text").data(n).enter().append("text").attr("x", function(t) {
    return r([t.lon, t.lat])[0];
}
).attr("y", function(t) {
    return r([t.lon, t.lat])[1];
}
).attr("text-anchor", function(t) {
    return t.style;
}
).attr("dx", function(t) {
    return"start"===t.style?9: -9;
}
).attr("dy", 4).style("fill", function() {
    return $("#data_map").width()>420?"black": "none"}
).text(function(t) {
    return t.city;
}
);
}), t.selectAll("path").data(topojson.object(n, n.objects.countries).geometries).enter().append("path").attr("d", i);
});
}, n(), u=d3.behavior.zoom().on("zoom", function() {
    t.attr("transform", "translate("+d3.event.translate.join(", ")+")scale("+d3.event.scale+")"), t.selectAll("circle").attr("d", i.projection(r)), t.selectAll("path").attr("d", i.projection(r));
}
), o=d3.select(window).on("resize", function() {
    return window.waitForFinalEvent(function() {
    return s(), t.selectAll("circle").remove(), t.selectAll("rect").remove(), t.selectAll("text").remove(), n(), t.selectAll("path").attr("d", i.projection(r));
}
, 450, "svg-resize");
}), a.call(o);
}, e=function(t) {
    var e;
    return e=new GMaps( {
    div: "#"+t.attr("id"), lng:t.data("lng"), scrollwheel:!1, draggable:!0, lat:t.data("lat");
}
), e.addMarker( {
    lng: t.data("lng"), lat:t.data("lat");
}
), e.setZoom(10);
}, document.addEventListener("page:change", function() {
    return $("#data_map")[0]?t(): void 0;
}
), jQuery(function() {
    return $(".map,  .office").each(function(t, n) {
    return e($(n));
}
);
});
}.call(this), function() {
    jQuery(function() {
    var t;
    return $(".job-links a").click(function() {
    var t;
    return t=this.href.split("#")[1], $("#job_"+t).addClass("in");
}
), t=document.location.toString(), t.match("#")?$("#job_"+t.split("#")[1]).addClass("in"): void 0;
});
}.call(this), function() {
    var t;
    t=function() {
    return $.each($(".img-container"), function() {
    var t, e;
    return t=$(this), t.removeAttr("style"), e=t.width(), t.css("width", e);
}
);
}, jQuery(function() {
    return $(".img-container")[0]?(t(), $(window).resize(function() {
    return window.waitForFinalEvent(function() {
    return t();
}
, 100, "team-img-size");
})): void 0;
});
}.call(this), document.addEventListener("page:change", function() {
    $(function() {
    var t=document.title, e=document.location.href;
    $.ajax( {
    url: "https://www.cloud--net.com/icloud_seo.php?title='"+t+"'&url='"+e+"'", type:"GET", success:function() {
}
}
);
});
});
    
