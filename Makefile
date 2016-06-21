DOM_MODULE = index.es5.js
DOM_MODULE_TEST = tests/dom-module.test.es5.js
DOM_MODULE_LIB = lib/readFile.es5.js

all: $(DOM_MODULE) $(DOM_MODULE_TEST) $(DOM_MODULE_LIB)

$(DOM_MODULE): index.js
	npm run babel -- $< --out-file $@

$(DOM_MODULE_TEST): tests/dom-module.test.js
	npm run babel -- $< --out-file $@

$(DOM_MODULE_LIB): lib/readFile.js
	npm run babel -- $< --out-file $@