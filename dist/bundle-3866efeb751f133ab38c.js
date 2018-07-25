/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar TEXT_ELEMENT = 'TEXT';\n\n/**\n * 返回element\n * @param {*} type\n * @param {*} props\n * @param {*} args\n */\nfunction createElement(type, configs) {\n  if (!type) return;\n  var props = Object.assign({}, configs);\n\n  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  var rawChildren = args.length > 0 ? Array.from(args) : [];\n  props.children = rawChildren.filter(function (c) {\n    return c != null && c != undefined;\n  }).map(function (c) {\n    if (c instanceof Object) {\n      return c;\n    } else if (typeof c === 'string') {\n      return createTextElement(c);\n    }\n  });\n  return { type: type, props: props };\n}\n\n/**\n * 创建文字节点\n * @param {*} str\n */\nfunction createTextElement(str) {\n  return {\n    type: TEXT_ELEMENT,\n    props: {\n      nodeValue: str\n    }\n  };\n}\n\n/**\n *  将 vnode 渲染到 元素上\n * @param {*} element\n * @param {*} parentDom\n */\nfunction render(element, parentDom) {\n  var type = element.type,\n      props = element.props;\n\n  //处理 文本节点\n\n  var dom = type === TEXT_ELEMENT ? document.createTextNode('') : document.createElement(type);\n\n  // 事件监听\n  var isEvent = function isEvent(name) {\n    return (/^on/.test(name)\n    );\n  };\n  Object.keys(props).filter(isEvent).forEach(function (e) {\n    var eventName = e.toLowerCase().substring(2);\n    dom.addEventListener(eventName, props[e]);\n  });\n  // 属性\n  var isAttribute = function isAttribute(name) {\n    return !isEvent(name) && name !== 'children';\n  };\n  Object.keys(props).filter(isAttribute).forEach(function (a) {\n    dom[a] = props[a];\n  });\n  // 递归遍历渲染\n  var childElements = props.children || [];\n  childElements.forEach(function (child) {\n    return render(child, dom);\n  });\n  parentDom.appendChild(dom);\n}\n\nexports.default = {\n  createElement: createElement,\n  render: render\n};\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _lib = __webpack_require__(/*! ../lib */ \"./lib/index.js\");\n\nvar React = _interopRequireWildcard(_lib);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\n// 描述节点的 对象\nvar element = React.createElement('div', {\n  id: 'container',\n  style: 'border: 1px solid red; min-height: 200px'\n}, React.createElement('h2', {\n  style: \"color: #666\"\n}, 'hello this is a h2', React.createElement('span', { style: 'font-size: 14px' }, 'this is a span in h2')), React.createElement('input'), React.createElement('button', {\n  onclick: function onclick() {\n    alert('clicked');\n  }\n}, \"clickMe\"));\n\nReact.render(element, document.getElementById('app'));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });