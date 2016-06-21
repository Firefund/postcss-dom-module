"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin("dom-module", function domModule(options = {}) {
    return (css, result) => {
        css.walkRules(rule => {
            rule.walkDecls((decl, i) => {
                ;
            });
        });
    };
});
