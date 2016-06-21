"use strict"

import * as postcss from "postcss"
import Stringifier from "postcss/lib/stringifier"
import * as handlebars from "handlebars"
import readFile from "./lib/readFile.es5"

export default stringify

class DomModule extends Stringifier {

    constructor(builder) {
        super(builder)
        this.fileReader = Promise.all([
            `${__dirname}/template.header.html`,
            `${__dirname}/template.footer.html`
        ].map(readFile))
    }
    root(node, options = {}) {
        // const self = this
        return new Promise( (resolve, reject) => {
            this.fileReader.then( content => {
                const template = handlebars.compile(content[0])

                this.builder(template.compile(options))
                super.root(node)
                this.builder(content[1])

                resolve()
            }),
            err => {
                reject(err)
            }
        })
    }
}
async function stringify(node, builder) {
    const domModule = new DomModule(builder)

    try {
        await domModule.root(node, { id: "test1" })
        console.dir(domModule)
    } catch (err) {
        console.error(err)
    }
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