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
        const template = _fs2.default.readFileSync(`${ __dirname }/template.html`, "utf8");

        const webcomponentHeader = template.match(/^(.|\n)+<style>/)[0];
        const webcomponentFooter = template.match(/<\/style>(.|\n)+$/)[0];

        this.builder(webcomponentHeader.replace(/{{id}}/, options.id));
        super.root(node);
        this.builder(webcomponentFooter);
    }
}

function stringify(node, builder) {
    const domModule = new DomModule(builder);
    domModule.root(node, { id: "test1" });
}

// export default postcss.plugin("dom-module", function domModule(options = {}) {

//     let fileReader = [`${__dirname}/template.header.html`, `${__dirname}/template.footer.html`].map(readFile)

//     return function (css, result) {

//         return new Promise( (resolve, reject) => {
//             fileReader.all(content => {
//                 let template = handlebars.compile(content[0])

//                 options.styles = css.source.input.css
//                 // console.log(template(options))
//                 // css.toResult({ to: "test.html" })

//                 result.root.nodes = [template(options)]
//                 // result.content = template(options)
//                 // result.root = { template(options) }
//                 // result.css = template(options)
//                 // result.map = false
//                 // result.mapOpts.annotation = false

//                 result.warn("The css is now a Web Component and can not be processed any further")

//                 resolve()
//             }, err => {
//                 throw err
//             })
//         })

//     }

// })
