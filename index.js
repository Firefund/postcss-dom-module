"use strict"

import * as postcss from "postcss"
import * as handlebars from "handlebars"
import readFile from "./lib/readFile.es5"

export default postcss.plugin("dom-module", function domModule(options = {}) {

    let fileReader = readFile("template.html");

    return function (css, result) {

        return new Promise( (resolve, reject) => {
            fileReader.then(content => {
                let template = handlebars.compile(content);

                options.styles = css.source.input.css
                // console.log(template(options))
                // css.toResult({ to: "test.html" })


                result.root.nodes = [template(options)]
                // result.content = template(options)
                // result.root = { template(options) }
                // result.css = template(options);
                // result.map = false;
                // result.mapOpts.annotation = false

                result.warn("The css is now a Web Component and can not be processed any further")

                resolve()
            }, err => {
                throw err;
            })
        })

    }

})