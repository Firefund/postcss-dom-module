"use strict"

import postcss from "postcss"
import domModule from "../index.es5"
import tap from "tap"
import fs from "fs"
import path from "path"
import readFile from "../lib/readFile.es5"
import eol from "eol"

const test1 = [`${__dirname}/css/fixture.html`, `${__dirname}/css/style.css`].map(readFile)

Promise
    .all(test1)
    .then( files => {
        const expected = files[0]
        const input = files[1]
        tap.plan(2)
        run(tap, input, expected, { id: "test1" })
    }, err => {
        throw err
    })

function run(t, input, output, opts = { }) {
    return postcss().process(input, { stringifier: domModule(opts) })
        .then( result => {
            t.deepEqual( eol.auto(result.content) , eol.auto(output))
            t.deepEqual(result.warnings().length, 0)
        })
}