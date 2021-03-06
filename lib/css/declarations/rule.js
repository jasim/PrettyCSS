"use strict";

var base = require('./base');
var util = require('../../util');

// Mapping properties to value types
var propertyMapping = {
	'animation': 'animation',
	'-moz-animation': 'animation',
	'-ms-animation': 'animation',
	'-o-animation': 'animation',
	'-webkit-animation': 'animation',
	'animation-delay': 'animation-delay',
	'-moz-animation-delay': 'animation-delay',
	'-ms-animation-delay': 'animation-delay',
	'-o-animation-delay': 'animation-delay',
	'-webkit-animation-delay': 'animation-delay',
	'animation-direction': 'animation-direction',
	'-moz-animation-direction': 'animation-direction',
	'-ms-animation-direction': 'animation-direction',
	'-o-animation-direction': 'animation-direction',
	'-webkit-animation-direction': 'animation-direction',
	'animation-duration': 'animation-duration',
	'-moz-animation-duration': 'animation-duration',
	'-ms-animation-duration': 'animation-duration',
	'-o-animation-duration': 'animation-duration',
	'-webkit-animation-duration': 'animation-duration',
	'animation-fill-mode': 'animation-fill-mode',
	'-moz-animation-fill-mode': 'animation-fill-mode',
	'-ms-animation-fill-mode': 'animation-fill-mode',
	'-o-animation-fill-mode': 'animation-fill-mode',
	'-webkit-animation-fill-mode': 'animation-fill-mode',
	'animation-iteration-count': 'animation-iteration-count',
	'-moz-animation-iteration-count': 'animation-iteration-count',
	'-ms-animation-iteration-count': 'animation-iteration-count',
	'-o-animation-iteration-count': 'animation-iteration-count',
	'-webkit-animation-iteration-count': 'animation-iteration-count',
	'animation-name': 'animation-name',
	'-moz-animation-name': 'animation-name',
	'-ms-animation-name': 'animation-name',
	'-o-animation-name': 'animation-name',
	'-webkit-animation-name': 'animation-name',
	'animation-play-state': 'animation-play-state',
	'-moz-animation-play-state': 'animation-play-state',
	'-ms-animation-play-state': 'animation-play-state',
	'-o-animation-play-state': 'animation-play-state',
	'-webkit-animation-play-state': 'animation-play-state',
	'animation-timing-function': 'animation-timing-function',
	'-moz-animation-timing-function': 'animation-timing-function',
	'-ms-animation-timing-function': 'animation-timing-function',
	'-o-animation-timing-function': 'animation-timing-function',
	'-webkit-animation-timing-function': 'animation-timing-function',
	'appearance': 'appearance',
	'-moz-appearance': 'appearance',
	'-webkit-appearance': 'webkit-appearance',
	'background': 'background',
	'background-attachment': 'background-attachment',
	'background-clip': 'background-clip',
	'-khtml-background-clip': 'background-clip',
	'-moz-background-clip': 'background-clip',
	'-webkit-background-clip': 'background-clip',
	'background-color': 'background-color',
	'background-image': 'background-image',
	'background-origin': 'background-origin',
	'-moz-background-origin': 'background-origin',
	'-webkit-background-origin': 'background-origin',
	'background-position': 'background-position',
	'background-repeat': 'background-repeat',
	'background-size': 'background-size',
	'behavior': 'behavior',
	'border': 'border-single',
	'border-bottom': 'border-single',
	'border-bottom-color': 'border-color-single',
	'border-bottom-left-radius': 'border-radius-single',
	'-khtml-border-bottom-left-radius': base.deprecated('border-radius-single', 'border-bottom-left-radius'),
	'-moz-border-radius-bottomleft': base.deprecated('border-radius-single', 'border-bottom-left-radius'),
	'-webkit-border-bottom-left-radius': base.deprecated('border-radius-single', 'border-bottom-left-radius'),
	'border-bottom-right-radius': 'border-radius-single',
	'-khtml-border-bottom-right-radius': base.deprecated('border-radius-single', 'border-bottom-right-radius'),
	'-moz-border-radius-bottomright': base.deprecated('border-radius-single', 'border-bottom-right-radius'),
	'-webkit-border-bottom-right-radius': base.deprecated('border-radius-single', 'border-bottom-right-radius'),
	'border-bottom-style': 'border-style',
	'border-bottom-width': 'border-width-single',
	'border-collapse': 'border-collapse',
	'border-color': 'border-color',
	'border-image': 'border-image',
	'border-image-outset': 'border-image-outset',
	'border-image-repeat': 'border-image-repeat',
	'border-image-slice': 'border-image-slice',
	'border-image-source': 'border-image-source',
	'border-image-width': 'border-image-width',
	'border-left': 'border-single',
	'border-left-color': 'border-color-single',
	'border-left-style': 'border-style',
	'border-left-width': 'border-width-single',
	'border-radius': 'border-radius',
	'-khtml-border-radius': base.deprecated('border-radius', 'border-radius'),
	'-moz-border-radius': base.deprecated('border-radius', 'border-radius'),
	'-o-border-radius': base.wrongProperty('border-radius', 'border-radius'), // This was never supported in Opera
	'-webkit-border-radius': base.deprecated('border-radius', 'border-radius'),
	'border-right': 'border-single',
	'border-right-color': 'border-color-single',
	'border-right-style': 'border-style',
	'border-right-width': 'border-width-single',
	'border-spacing': 'border-spacing',
	'border-style': 'border-style',
	'border-top': 'border-single',
	'border-top-color': 'border-color-single',
	'border-top-left-radius': 'border-radius-single',
	'-khtml-border-top-left-radius': base.deprecated('border-radius-single', 'border-top-left-radius'),
	'-moz-border-radius-topleft': base.deprecated('border-radius-single', 'border-top-left-radius'),
	'-webkit-border-top-left-radius': base.deprecated('border-radius-single', 'border-top-left-radius'),
	'border-top-right-radius': 'border-radius-single',
	'-khtml-border-top-right-radius': base.deprecated('border-radius-single', 'border-top-right-radius'),
	'-moz-border-radius-topright': base.deprecated('border-radius-single', 'border-top-right-radius'),
	'-webkit-border-top-right-radius': base.deprecated('border-radius-single', 'border-top-right-radius'),
	'border-top-style': 'border-style',
	'border-top-width': 'border-width-single',
	'border-width': 'border-width',
	'bottom': 'offset',
	'box-shadow': 'box-shadow',
	'-moz-box-shadow': 'box-shadow',
	'-webkit-box-shadow': 'box-shadow',
	'box-sizing': 'box-sizing',
	'-moz-box-sizing': 'box-sizing',
	'-webkit-box-sizing': 'box-sizing',
	'clear': 'clear',
	'clip': 'clip',
	'color': 'color',
	'content': 'content',
	'cursor': 'cursor',
	'direction': 'direction',
	'display': 'display',
	'empty-cells': 'empty-cells',
	'filter': base.browserOnly('filter', 'ie'),
	'-ms-filter': base.wrongProperty('filter', 'filter'),  // IE supports filter better than -ms-filter
	'float': 'float',
	'font': 'font',
	'font-family': 'font-family',
	'font-size': 'font-size',
	'font-smoothing': base.wrongProperty('webkit-font-smoothing', '-webkit-font-smoothing'),
	'-webkit-font-smoothing': 'webkit-font-smoothing',
	'font-style': 'font-style',
	'font-variant': 'font-variant',
	'font-weight': 'font-weight',
	'force-broken-image-icon': base.wrongProperty('moz-force-broken-image-icon', '-moz-force-broken-image-icon'),
	'-moz-force-broken-image-icon': 'moz-force-broken-image-icon',
	'height': 'height',
	'interpolation-mode': base.wrongProperty('ms-interpolation-mode', '-ms-interpolation-mode'),
	'-ms-interpolation-mode': 'ms-interpolation-mode',
	'left': 'offset',
	'letter-spacing': 'letter-spacing',
	'line-height': 'line-height',
	'list-style': 'list-style',
	'list-style-image': 'list-style-image',
	'list-style-position': 'list-style-position',
	'list-style-type': 'list-style-type',
	'margin': 'margin',
	'margin-bottom': 'margin-width',
	'margin-left': 'margin-width',
	'margin-right': 'margin-width',
	'margin-top': 'margin-width',
	'max-height': 'max-length',
	'max-width': 'max-length',
	'min-height': 'min-length',
	'min-width': 'min-length',
	'opacity': 'opacity',
	'-khtml-opacity': base.wrongProperty('opacity', 'opacity'),
	'-moz-opacity': base.wrongProperty('opacity', 'opacity'),
	'orphans': 'widows-orphans',
	'outline': 'outline',
	'outline-color': 'outline-color',
	'outline-style': 'outline-style',
	'outline-width': 'min-length',
	'overflow': 'overflow',
	'overflow-wrap': 'overflow-wrap',
	'overflow-x': 'overflow-dimension',
	'overflow-y': 'overflow-dimension',
	'padding': 'padding',
	'padding-bottom': 'padding-width',
	'padding-left': 'padding-width',
	'padding-right': 'padding-width',
	'padding-top': 'padding-width',
	'page-break-after': 'page-break-edge',
	'page-break-before': 'page-break-edge',
	'page-break-inside': 'page-break-inside',
	'position': 'position',
	'progress-appearance': base.wrongProperty('ms-progress-appearance', '-ms-progress-appearance'),
	'-ms-progress-appearance': 'ms-progress-appearance',
	'quotes': 'quotes',
	'resize': 'resize',
	'right': 'offset',
	'scrollbar-3dlight-color': 'color',
	'-ms-scrollbar-3dlight-color': base.wrongProperty('color', 'scrollbar-3dlight-color'), // Only in IE8 standards mode
	'scrollbar-arrow-color': 'color',
	'-ms-scrollbar-arrow-color': base.wrongProperty('color', 'scrollbar-arrow-color'), // Only in IE8 standards mode
	'scrollbar-base-color': 'color',
	'-ms-scrollbar-base-color': base.wrongProperty('color', 'scrollbar-base-color'), // Only in IE8 standards mode
	'scrollbar-darkshadow-color': 'color',
	'-ms-scrollbar-darkshadow-color': base.wrongProperty('color', 'scrollbar-darkshadow-color'), // Only in IE8 standards mode
	'scrollbar-face-color': 'color',
	'-ms-scrollbar-face-color': base.wrongProperty('color', 'scrollbar-face-color'), // Only in IE8 standards mode
	'scrollbar-highlight-color': 'color',
	'-ms-scrollbar-highlight-color': base.wrongProperty('color', 'scrollbar-highlight-color'), // Only in IE8 standards mode
	'scrollbar-shadow-color': 'color',
	'-ms-scrollbar-shadow-color': base.wrongProperty('color', 'scrollbar-shadow-color'), // Only in IE8 standards mode
	'scrollbar-track-color': 'color',
	'-ms-scrollbar-track-color': base.wrongProperty('color', 'scrollbar-track-color'), // Only in IE8 standards mode
	'table-layout': 'table-layout',
	'text-align': 'text-align',
	'text-decoration': 'text-decoration',
	'text-decoration-color': 'text-decoration-color',
	'text-decoration-line': 'text-decoration-line',
	'text-decoration-style': 'text-decoration-style',
	'-webkit-text-fill-color': 'webkit-text-fill-color',
	'-webkit-text-stroke': 'webkit-text-stroke',
	'-webkit-text-stroke-color': 'webkit-text-stroke-color',
	'-webkit-text-stroke-width': 'webkit-text-stroke-width',
	'text-indent': 'text-indent',
	'text-overflow': 'text-overflow',
	'text-shadow': 'text-shadow',
	'-moz-text-size-adjust': 'text-size-adjust',
	'-ms-text-size-adjust': 'text-size-adjust',
	'-webkit-text-size-adjust': 'text-size-adjust',
	'-o-text-overflow': 'text-overflow',
	'text-transform': 'text-transform',
	'top': 'offset',
	'transform': 'transform',
	'-moz-transform': 'transform',
	'-ms-transform': 'transform',
	'-o-transform': 'transform',
	'-webkit-transform': 'transform',
	'transition': 'transition',
	'-moz-transition': base.wrongProperty('transition', 'transition'),
	'-webkit-transition': base.wrongProperty('transition', 'transition'),
	'transition-delay': 'transition-delay',
	'-moz-transition-delay': base.wrongProperty('transition-delay', 'transition-delay'),
	'-webkit-transition-delay': base.wrongProperty('transition-delay', 'transition-delay'),
	'transition-duration': 'transition-duration',
	'-moz-transition-duration': base.wrongProperty('transition-duration', 'transition-duration'),
	'-webkit-transition-duration': base.wrongProperty('transition-duration', 'transition-duration'),
	'transition-property': 'transition-property',
	'-moz-transition-property': base.wrongProperty('transition-property', 'transition-property'),
	'-webkit-transition-property': base.wrongProperty('transition-property', 'transition-property'),
	'transition-timing-function': 'transition-timing-function',
	'-moz-transition-timing-function': base.wrongProperty('transition-timing-function', 'transition-timing-function'),
	'-webkit-transition-timing-function': base.wrongProperty('transition-timing-function', 'transition-timing-function'),
	'-moz-user-select': 'moz-user-select',
	'-ms-user-select': 'ms-user-select',
	'-webkit-user-select': 'webkit-user-select',
	'vertical-align': 'vertical-align',
	'visibility': 'visibility',
	'white-space': 'white-space',
	'widows': 'widows-orphans',
	'width': 'width',
	'word-wrap': base.wrongProperty('overflow-wrap', 'overflow-wrap'),
	'z-index': 'z-index',
	'zoom': base.browserOnly('zoom', 'ie'),
	'-ms-zoom': base.wrongProperty('zoom', 'ie') // Only in IE8 standards mode
};

var Declaration = base.baseConstructor();

util.extend(Declaration.prototype, base.base, {
	name: "declaration-rule"
});


exports.canStartWith = base.canStartWith;
exports.parse = base.declarationParser(Declaration, propertyMapping);
