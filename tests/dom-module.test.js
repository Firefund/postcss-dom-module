"use strict"

import postcss from "postcss"
import domModule from "../index.es5.js"
import tap from "tap"
import fs from "fs"

const expected = fs.readFileSync(`${__dirname}/css/fixture.html`, "utf8")
fs.readFile(`${__dirname}/css/style.css`, "utf8", (err, data) => {
    if (err) throw err;
    run(tap, data, expected)
})

function run(t, input, output, opts = { }) {
    return postcss([ domModule(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}