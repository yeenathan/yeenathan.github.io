"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[3950,7351],{7861:e=>{function n(e){e.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},e.languages.webmanifest=e.languages.json}e.exports=n,n.displayName="json",n.aliases=["webmanifest"]},3862:(e,n,a)=>{var s=a(7861);function t(e){e.register(s),function(e){var n=/("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;e.languages.json5=e.languages.extend("json",{property:[{pattern:RegExp(n.source+"(?=\\s*:)"),greedy:!0},{pattern:/(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,alias:"unquoted"}],string:{pattern:n,greedy:!0},number:/[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/})}(e)}e.exports=t,t.displayName="json5",t.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_json5.68431fd4.chunk.js.map