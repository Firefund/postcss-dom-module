"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var postcss = _interopRequireWildcard(_postcss);

var _stringifier = require("postcss/lib/stringifier");

var _stringifier2 = _interopRequireDefault(_stringifier);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = stringify;


class DomModule extends _stringifier2.default {

    root(node, options = {}) {
        let template, webcomponentHeader, webcomponentFooter;
        try {
            template = _fs2.default.readFileSync(`${ __dirname }/template.html`, "utf8");

            webcomponentHeader = template.match(/^(.|\n)+<style>/)[0];
            webcomponentFooter = template.match(/<\/style>(.|\n)+$/)[0];

            this.builder(webcomponentHeader.replace(/{{id}}/, node.nodes[0].selector.replace(/\./, "")));
        } catch (error) {
            console.error(error);
        }
        super.root(node);
        this.builder(webcomponentFooter);
    }
}

function stringify(options = {}) {
    return (node, builder) => {
        const domModule = new DomModule(builder);
        domModule.root(node, options);
    };
}
