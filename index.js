"use strict"

import * as postcss from "postcss"
import Stringifier from "postcss/lib/stringifier"
import fs from "fs"

export default stringify

class DomModule extends Stringifier {

    root(node, options = {}) {
        let template, webcomponentHeader, webcomponentFooter
        //TODO: node.source.input.from is <input css1> if no file name is given
        //FIXME: the first selector in the css - hopefully it is a class selector
        const id = node.nodes[0].selector.replace(/\./,"")

        try {
            template = fs.readFileSync(`${__dirname}/template.html`, "utf8")

            webcomponentHeader = template.match(/^(.|\n)+<style>/)[0]
            webcomponentFooter = template.match(/<\/style>(.|\n)+$/)[0]
            
            this.builder(webcomponentHeader.replace(/{{id}}/, id))
        } catch(error) {
            console.error(error)
        }
        super.root(node)
        this.builder(webcomponentFooter)
    }
}

function stringify(node, builder) {
    const domModule = new DomModule(builder)
    domModule.root(node, options)
}