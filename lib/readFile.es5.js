"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = readFile;


function readFile(path) {
    return new Promise((resolve, reject) => _fs2.default.readFile(path, "utf8", (err, data) => {
        if (err) throw err;
        resolve(data);
    }));
}
