// https://github.com/salemdar/ngx-cookie/issues/51
// Go to node_modules/ngx-cookie/bundles/ngx-cookie.umd.js and replace 'window' with 'this'.

let fs = require("fs");
let ngxCookieCodePath = "./node_modules/ngx-cookie/bundles/ngx-cookie.umd.js";
let ngxCookieCode = fs.readFileSync(ngxCookieCodePath, 'utf-8');
ngxCookieCode = ngxCookieCode.replace('window', 'this'); // There's only one match
fs.writeFileSync(ngxCookieCodePath, ngxCookieCode, 'utf-8');