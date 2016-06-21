"use strict"

import fs from "fs"

export default readFile

function readFile(path) {
    return new Promise((resolve, reject) =>
        fs.readFile(path, "utf8", (err, data) => {
            if (err) throw err
            resolve(data)
        })
    )
}