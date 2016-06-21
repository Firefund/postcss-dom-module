"use strict";

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _index = require("../index.es5");

var _index2 = _interopRequireDefault(_index);

var _tap = require("tap");

var _tap2 = _interopRequireDefault(_tap);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _readFile = require("../lib/readFile.es5");

var _readFile2 = _interopRequireDefault(_readFile);

var _eol = require("eol");

var _eol2 = _interopRequireDefault(_eol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const test1 = [`${ __dirname }/css/fixture.html`, `${ __dirname }/css/style.css`].map(_readFile2.default);

Promise.all(test1).then(files => {
    const expected = files[0];
    const input = files[1];
    _tap2.default.plan(2);
    run(_tap2.default, input, expected, { id: "test1" });
}, err => {
    throw err;
});

function run(t, input, output, opts = {}) {
    return (0, _postcss2.default)().process(input, { stringifier: _index2.default }).then(result => {
        t.deepEqual(_eol2.default.auto(result.content), _eol2.default.auto(output));
        t.deepEqual(result.warnings().length, 0);
    });
}

// const expected = fs.readFileSync(`${__dirname}/css/fixture.html`, "utf8")
// fs.readFile(`${__dirname}/css/style.css`, "utf8", (err, data) => {
//     if (err) throw err;
//     run(tap, data, expected)
// })
