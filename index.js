"use strict"

import postcss from "postcss"

export default postcss.plugin("dom-module", function domModule(options = {}) {
    return (css, result) => {
        css.walkRules( rule => {
            rule.walkDecls( (decl, i) => {
                ;
            })
        })
    }
})