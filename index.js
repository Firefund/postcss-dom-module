"use strict"

import * as postcss from "postcss"
import Stringifier from "postcss/lib/stringifier"
import fs from "fs"

export default stringify

class DomModule extends Stringifier {

    root(node, options = {}) {
        let template, webcomponentHeader, webcomponentFooter
        try {
            template = fs.readFileSync(`${__dirname}/template.html`, "utf8")

            webcomponentHeader = template.match(/^(.|\n)+<style>/)[0]
            webcomponentFooter = template.match(/<\/style>(.|\n)+$/)[0]
            
            this.builder(webcomponentHeader.replace(/{{id}}/, node.nodes[0].selector.replace(/\./,"")))
        } catch(error) {
            console.error(error)
        }
        super.root(node)
        this.builder(webcomponentFooter)
    }
}

function stringify(options = {}) {
    return (node, builder) => {
        const domModule = new DomModule(builder)
        domModule.root(node, options)
    }
}