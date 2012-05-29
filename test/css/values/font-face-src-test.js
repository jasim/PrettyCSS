"use strict";
var util = require('./util');

exports.batch = util.makeVows('font-face-src', {
	'local(x)': {
		'tokens': ['FUNCTION', 'IDENT', 'PAREN_CLOSE'],
		'toString': 'local(x)',
		'unparsed': [],
		'warnings': ['css-minimum:2', 'css-unsupported:2.1']
	},
	'url(x), local(x)': {
		'tokens': ['URL', 'OPERATOR', 'S', 'FUNCTION', 'IDENT', 'PAREN_CLOSE'],
		'toString': 'url(x), local(x)',
		'unparsed': [],
		'warnings': ['css-minimum:2', 'css-unsupported:2.1']
	},
	'url(x) local(x)': {
		'tokens': ['URL', 'S', 'FUNCTION', 'IDENT', 'PAREN_CLOSE'],
		'toString': 'url(x)',
		'unparsed': ['FUNCTION', 'IDENT', 'PAREN_CLOSE'],
		'warnings': ['css-minimum:2', 'css-unsupported:2.1']
	},
	'inherit': {
		'tokens': ['IDENT'],
		'toString': null,
		'unparsed': ['IDENT'],
		'warnings': null
	}
});
