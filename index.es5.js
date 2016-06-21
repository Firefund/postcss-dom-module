"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = stringify;

var _postcss = require("postcss");

var postcss = _interopRequireWildcard(_postcss);

var _stringifier = require("postcss/lib/stringifier");

var _stringifier2 = _interopRequireDefault(_stringifier);

var _handlebars = require("handlebars");

var handlebars = _interopRequireWildcard(_handlebars);

var _readFile = require("./lib/readFile.es5");

var _readFile2 = _interopRequireDefault(_readFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

class DomModule extends _stringifier2.default {
    constructor(builder) {
        super(builder);
        this.fileReader = [`${ __dirname }/template.header.html`, `${ __dirname }/template.footer.html`].map(_readFile2.default);
    }
    root(node) {
        return new Promise((resolve, reject) => {

            this.fileReader.all(content => {
                let template = handlebars.compile(content[0]);

                this.builder(template.compile(options));
                super.root(node);
                this.builder(content[1]);

                this.resolve();
            }, err => {
                throw err;
            }), err => {
                reject(err);
            };
        });
    }
}
function stringify(node, builder) {
    // return domModule.root(node)
    // domModule.builder = builder

    let createDomModule = (() => {
        var ref = _asyncToGenerator(function* () {
            let domModule = new DomModule(builder);
            yield domModule.root(node);
        });

        return function createDomModule() {
            return ref.apply(this, arguments);
        };
    })();
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
