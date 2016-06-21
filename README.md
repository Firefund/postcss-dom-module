postcss-dom-module
==================

Convert CSS file into a Web Component you can include in other Web Components.

PostCSS plugin to turn CSS files into Polymer dom-modules

```html
<dom-module id="{{id}}">
  <template>
    <style>
      {{styles|safe}}
    </style>
  </template>
</dom-module>
```