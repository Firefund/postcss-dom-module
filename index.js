"use strict"

import * as postcss from "postcss"
import Stringifier from "postcss/lib/stringifier"
import * as handlebars from "handlebars"
import readFile from "./lib/readFile.es5"


class DomModule extends Stringifier {
    root(node) {
        this.builder("<body>")
        super.root(node)
        this.builder("</body>")
    }
}
export default function stringify(node, builder) {
    let domModule = new DomModule
    domModule.builder = builder
    domModule.root(node)
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