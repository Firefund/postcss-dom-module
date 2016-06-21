"use strict";

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _indexEs = require("../index.es5.js");

var _indexEs2 = _interopRequireDefault(_indexEs);

var _tap = require("tap");

var _tap2 = _interopRequireDefault(_tap);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const expected = _fs2.default.readFileSync(`${ __dirname }/css/fixture.html`, "utf8");
_fs2.default.readFile(`${ __dirname }/css/style.css`, "utf8", (err, data) => {
    if (err) throw err;
    run(_tap2.default, data, expected);
});

function run(t, input, output, opts = {}) {
    return (0, _postcss2.default)([(0, _indexEs2.default)(opts)]).process(input).then(result => {
        t.deepEqual(result.css, output);
        t.deepEqual(result.warnings().length, 0);
    });
}
