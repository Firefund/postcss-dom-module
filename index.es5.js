"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

let stringify = (() => {
    var ref = _asyncToGenerator(function* (node, builder) {
        const domModule = new DomModule(builder);

        try {
            yield domModule.root(node, { id: "test1" });
            console.dir(domModule);
        } catch (err) {
            console.error(err);
        }
    });

    return function stringify(_x, _x2) {
        return ref.apply(this, arguments);
    };
})();

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

exports.default = stringify;


class DomModule extends _stringifier2.default {

    constructor(builder) {
        super(builder);
        this.fileReader = Promise.all([`${ __dirname }/template.header.html`, `${ __dirname }/template.footer.html`].map(_readFile2.default));
    }
    root(node, options = {}) {
        var _this = this;

        return _asyncToGenerator(function* () {
            // const self = this
            return new Promise(function (resolve, reject) {
                _this.fileReader.then(function (content) {
                    const template = handlebars.compile(content[0]);

                    _this.builder(template.compile(options));
                    super.root(node);
                    _this.builder(content[1]);

                    resolve();
                }), function (err) {
                    reject(err);
                };
            });
        })();
    }
}
