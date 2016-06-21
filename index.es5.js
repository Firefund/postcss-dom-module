"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var postcss = _interopRequireWildcard(_postcss);

var _handlebars = require("handlebars");

var handlebars = _interopRequireWildcard(_handlebars);

var _readFile = require("./lib/readFile.es5");

var _readFile2 = _interopRequireDefault(_readFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = postcss.plugin("dom-module", function domModule(options = {}) {

    let fileReader = (0, _readFile2.default)("template.html");

    return function (css, result) {

        return new Promise((resolve, reject) => {
            fileReader.then(content => {
                let template = handlebars.compile(content);

                result.warn("The css is now a Web Component and can not be processed any further");
                options.styles = css.source.input.css;

                result.nodes.remove()
                result.nodes.

                // result.root = postcss.root()


                // result.replaceWith(template(options))

                // console.log(template(options))
                // css.toResult({ to: "test.html" })

                // result.root.nodes = [template(options)];


                // result.content = template(options)
                // result.root = { template(options) }
                // result.css = template(options);
                // result.map = false;
                // result.mapOpts.annotation = false


                resolve();
            }, err => {
                throw err;
            });
        });
    };
});
