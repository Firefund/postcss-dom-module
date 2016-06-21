"use strict"

import * as postcss from "postcss"
import Stringifier from "postcss/lib/stringifier"
import fs from "fs"

export default stringify

class DomModule extends Stringifier {

    root(node, options = {}) {
        const template = fs.readFileSync(`${__dirname}/template.html`, "utf8")

        const webcomponentHeader = template.match(/^(.|\n)+<style>/)[0]
        const webcomponentFooter = template.match(/<\/style>(.|\n)+$/)[0]        

        this.builder(webcomponentHeader.replace(/{{id}}/, options.id))
        super.root(node)
        this.builder(webcomponentFooter)           
    }
}

function stringify(node, builder) {    
    const domModule = new DomModule(builder)
    domModule.root(node, { id: "test1" })
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