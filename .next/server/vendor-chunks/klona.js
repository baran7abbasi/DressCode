"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/klona";
exports.ids = ["vendor-chunks/klona"];
exports.modules = {

/***/ "(ssr)/./node_modules/klona/full/index.mjs":
/*!*******************************************!*\
  !*** ./node_modules/klona/full/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   klona: () => (/* binding */ klona)\n/* harmony export */ });\nfunction set(obj, key, val) {\n\tif (typeof val.value === 'object') val.value = klona(val.value);\n\tif (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === '__proto__') {\n\t\tObject.defineProperty(obj, key, val);\n\t} else obj[key] = val.value;\n}\n\nfunction klona(x) {\n\tif (typeof x !== 'object') return x;\n\n\tvar i=0, k, list, tmp, str=Object.prototype.toString.call(x);\n\n\tif (str === '[object Object]') {\n\t\ttmp = Object.create(x.__proto__ || null);\n\t} else if (str === '[object Array]') {\n\t\ttmp = Array(x.length);\n\t} else if (str === '[object Set]') {\n\t\ttmp = new Set;\n\t\tx.forEach(function (val) {\n\t\t\ttmp.add(klona(val));\n\t\t});\n\t} else if (str === '[object Map]') {\n\t\ttmp = new Map;\n\t\tx.forEach(function (val, key) {\n\t\t\ttmp.set(klona(key), klona(val));\n\t\t});\n\t} else if (str === '[object Date]') {\n\t\ttmp = new Date(+x);\n\t} else if (str === '[object RegExp]') {\n\t\ttmp = new RegExp(x.source, x.flags);\n\t} else if (str === '[object DataView]') {\n\t\ttmp = new x.constructor( klona(x.buffer) );\n\t} else if (str === '[object ArrayBuffer]') {\n\t\ttmp = x.slice(0);\n\t} else if (str.slice(-6) === 'Array]') {\n\t\t// ArrayBuffer.isView(x)\n\t\t// ~> `new` bcuz `Buffer.slice` => ref\n\t\ttmp = new x.constructor(x);\n\t}\n\n\tif (tmp) {\n\t\tfor (list=Object.getOwnPropertySymbols(x); i < list.length; i++) {\n\t\t\tset(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));\n\t\t}\n\n\t\tfor (i=0, list=Object.getOwnPropertyNames(x); i < list.length; i++) {\n\t\t\tif (Object.hasOwnProperty.call(tmp, k=list[i]) && tmp[k] === x[k]) continue;\n\t\t\tset(tmp, k, Object.getOwnPropertyDescriptor(x, k));\n\t\t}\n\t}\n\n\treturn tmp || x;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMva2xvbmEvZnVsbC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsaUJBQWlCO0FBQzlEO0FBQ0E7O0FBRUEsZ0RBQWdELGlCQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFudGluZS1taW5pbWFsLW5leHQtdGVtcGxhdGUvLi9ub2RlX21vZHVsZXMva2xvbmEvZnVsbC9pbmRleC5tanM/OTdjYiJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzZXQob2JqLCBrZXksIHZhbCkge1xuXHRpZiAodHlwZW9mIHZhbC52YWx1ZSA9PT0gJ29iamVjdCcpIHZhbC52YWx1ZSA9IGtsb25hKHZhbC52YWx1ZSk7XG5cdGlmICghdmFsLmVudW1lcmFibGUgfHwgdmFsLmdldCB8fCB2YWwuc2V0IHx8ICF2YWwuY29uZmlndXJhYmxlIHx8ICF2YWwud3JpdGFibGUgfHwga2V5ID09PSAnX19wcm90b19fJykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsKTtcblx0fSBlbHNlIG9ialtrZXldID0gdmFsLnZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2xvbmEoeCkge1xuXHRpZiAodHlwZW9mIHggIT09ICdvYmplY3QnKSByZXR1cm4geDtcblxuXHR2YXIgaT0wLCBrLCBsaXN0LCB0bXAsIHN0cj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCk7XG5cblx0aWYgKHN0ciA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcblx0XHR0bXAgPSBPYmplY3QuY3JlYXRlKHguX19wcm90b19fIHx8IG51bGwpO1xuXHR9IGVsc2UgaWYgKHN0ciA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXHRcdHRtcCA9IEFycmF5KHgubGVuZ3RoKTtcblx0fSBlbHNlIGlmIChzdHIgPT09ICdbb2JqZWN0IFNldF0nKSB7XG5cdFx0dG1wID0gbmV3IFNldDtcblx0XHR4LmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xuXHRcdFx0dG1wLmFkZChrbG9uYSh2YWwpKTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChzdHIgPT09ICdbb2JqZWN0IE1hcF0nKSB7XG5cdFx0dG1wID0gbmV3IE1hcDtcblx0XHR4LmZvckVhY2goZnVuY3Rpb24gKHZhbCwga2V5KSB7XG5cdFx0XHR0bXAuc2V0KGtsb25hKGtleSksIGtsb25hKHZhbCkpO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKHN0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG5cdFx0dG1wID0gbmV3IERhdGUoK3gpO1xuXHR9IGVsc2UgaWYgKHN0ciA9PT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcblx0XHR0bXAgPSBuZXcgUmVnRXhwKHguc291cmNlLCB4LmZsYWdzKTtcblx0fSBlbHNlIGlmIChzdHIgPT09ICdbb2JqZWN0IERhdGFWaWV3XScpIHtcblx0XHR0bXAgPSBuZXcgeC5jb25zdHJ1Y3Rvcigga2xvbmEoeC5idWZmZXIpICk7XG5cdH0gZWxzZSBpZiAoc3RyID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG5cdFx0dG1wID0geC5zbGljZSgwKTtcblx0fSBlbHNlIGlmIChzdHIuc2xpY2UoLTYpID09PSAnQXJyYXldJykge1xuXHRcdC8vIEFycmF5QnVmZmVyLmlzVmlldyh4KVxuXHRcdC8vIH4+IGBuZXdgIGJjdXogYEJ1ZmZlci5zbGljZWAgPT4gcmVmXG5cdFx0dG1wID0gbmV3IHguY29uc3RydWN0b3IoeCk7XG5cdH1cblxuXHRpZiAodG1wKSB7XG5cdFx0Zm9yIChsaXN0PU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoeCk7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRzZXQodG1wLCBsaXN0W2ldLCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHgsIGxpc3RbaV0pKTtcblx0XHR9XG5cblx0XHRmb3IgKGk9MCwgbGlzdD1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh4KTsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbCh0bXAsIGs9bGlzdFtpXSkgJiYgdG1wW2tdID09PSB4W2tdKSBjb250aW51ZTtcblx0XHRcdHNldCh0bXAsIGssIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoeCwgaykpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bXAgfHwgeDtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/klona/full/index.mjs\n");

/***/ })

};
;