/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./node_modules/@next/font/google/target.css?{\"path\":\"src/pages/_app.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"],\"variable\":\"--font-inter\"}],\"variableName\":\"inter\"}":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@next/font/google/target.css?{"path":"src/pages/_app.tsx","import":"Inter","arguments":[{"subsets":["latin"],"variable":"--font-inter"}],"variableName":"inter"} ***!
  \***************************************************************************************************************************************************************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"style\": {\"fontFamily\":\"'__Inter_9c9965', '__Inter_Fallback_9c9965'\",\"fontStyle\":\"normal\"},\n\t\"className\": \"__className_9c9965\",\n\t\"variable\": \"__variable_9c9965\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQG5leHQvZm9udC9nb29nbGUvdGFyZ2V0LmNzcz97XCJwYXRoXCI6XCJzcmMvcGFnZXMvX2FwcC50c3hcIixcImltcG9ydFwiOlwiSW50ZXJcIixcImFyZ3VtZW50c1wiOlt7XCJzdWJzZXRzXCI6W1wibGF0aW5cIl0sXCJ2YXJpYWJsZVwiOlwiLS1mb250LWludGVyXCJ9XSxcInZhcmlhYmxlTmFtZVwiOlwiaW50ZXJcIn0uanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBLFdBQVcsZ0ZBQWdGO0FBQzNGO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0LWVtYWlsLXByZXZpZXcvLi9ub2RlX21vZHVsZXMvQG5leHQvZm9udC9nb29nbGUvdGFyZ2V0LmNzcz83YWZmIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInN0eWxlXCI6IHtcImZvbnRGYW1pbHlcIjpcIidfX0ludGVyXzljOTk2NScsICdfX0ludGVyX0ZhbGxiYWNrXzljOTk2NSdcIixcImZvbnRTdHlsZVwiOlwibm9ybWFsXCJ9LFxuXHRcImNsYXNzTmFtZVwiOiBcIl9fY2xhc3NOYW1lXzljOTk2NVwiLFxuXHRcInZhcmlhYmxlXCI6IFwiX192YXJpYWJsZV85Yzk5NjVcIlxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/@next/font/google/target.css?{\"path\":\"src/pages/_app.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"],\"variable\":\"--font-inter\"}],\"variableName\":\"inter\"}\n");

/***/ }),

/***/ "./src/components/tooltip-content.tsx":
/*!********************************************!*\
  !*** ./src/components/tooltip-content.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TooltipContent\": () => (/* binding */ TooltipContent)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-tooltip */ \"@radix-ui/react-tooltip\");\n/* harmony import */ var _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _pages_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pages/_app */ \"./src/pages/_app.tsx\");\n\n\n\n\n\nconst TooltipContent = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_3__.forwardRef(({ sideOffset =6 , children , ...props }, forwardedRef)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Portal, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Content, {\n            ...props,\n            ref: forwardedRef,\n            className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(\"bg-black border border-slate-6 z-20 px-3 py-2 rounded-md text-xs\", `${_pages_app__WEBPACK_IMPORTED_MODULE_4__.inter.variable} font-sans`),\n            sideOffset: sideOffset,\n            children: children\n        }, void 0, false, {\n            fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/components/tooltip-content.tsx\",\n            lineNumber: 18,\n            columnNumber: 5\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/components/tooltip-content.tsx\",\n        lineNumber: 17,\n        columnNumber: 3\n    }, undefined));\nTooltipContent.displayName = \"TooltipContent\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90b29sdGlwLWNvbnRlbnQudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUE0RDtBQUN4QjtBQUNMO0FBQ087QUFTL0IsTUFBTUksK0JBQWlCRiw2Q0FBZ0IsQ0FHNUMsQ0FBQyxFQUFFSSxZQUFhLEVBQUMsRUFBRUMsU0FBUSxFQUFFLEdBQUdDLE9BQU8sRUFBRUMsNkJBQ3pDLDhEQUFDVCwyREFBdUI7a0JBQ3RCLDRFQUFDQSw0REFBd0I7WUFDdEIsR0FBR1EsS0FBSztZQUNUSSxLQUFLSDtZQUNMSSxXQUFXWixpREFBVUEsQ0FDbkIsb0VBQ0EsQ0FBQyxFQUFFRSxzREFBYyxDQUFDLFVBQVUsQ0FBQztZQUUvQkcsWUFBWUE7c0JBRVhDOzs7Ozs7Ozs7O21CQUdKO0FBRUhILGVBQWVXLFdBQVcsR0FBRyIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0LWVtYWlsLXByZXZpZXcvLi9zcmMvY29tcG9uZW50cy90b29sdGlwLWNvbnRlbnQudHN4PzdkZGMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVG9vbHRpcFByaW1pdGl2ZSBmcm9tICdAcmFkaXgtdWkvcmVhY3QtdG9vbHRpcCc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGludGVyIH0gZnJvbSAnLi4vcGFnZXMvX2FwcCc7XG5cbnR5cGUgQ29udGVudEVsZW1lbnQgPSBSZWFjdC5FbGVtZW50UmVmPHR5cGVvZiBUb29sdGlwUHJpbWl0aXZlLkNvbnRlbnQ+O1xudHlwZSBDb250ZW50UHJvcHMgPSBSZWFjdC5Db21wb25lbnRQcm9wc1dpdGhvdXRSZWY8XG4gIHR5cGVvZiBUb29sdGlwUHJpbWl0aXZlLkNvbnRlbnRcbj47XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbHRpcFByb3BzIGV4dGVuZHMgQ29udGVudFByb3BzIHt9XG5cbmV4cG9ydCBjb25zdCBUb29sdGlwQ29udGVudCA9IFJlYWN0LmZvcndhcmRSZWY8XG4gIENvbnRlbnRFbGVtZW50LFxuICBSZWFkb25seTxUb29sdGlwUHJvcHM+XG4+KCh7IHNpZGVPZmZzZXQgPSA2LCBjaGlsZHJlbiwgLi4ucHJvcHMgfSwgZm9yd2FyZGVkUmVmKSA9PiAoXG4gIDxUb29sdGlwUHJpbWl0aXZlLlBvcnRhbD5cbiAgICA8VG9vbHRpcFByaW1pdGl2ZS5Db250ZW50XG4gICAgICB7Li4ucHJvcHN9XG4gICAgICByZWY9e2ZvcndhcmRlZFJlZn1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgJ2JnLWJsYWNrIGJvcmRlciBib3JkZXItc2xhdGUtNiB6LTIwIHB4LTMgcHktMiByb3VuZGVkLW1kIHRleHQteHMnLFxuICAgICAgICBgJHtpbnRlci52YXJpYWJsZX0gZm9udC1zYW5zYCxcbiAgICAgICl9XG4gICAgICBzaWRlT2Zmc2V0PXtzaWRlT2Zmc2V0fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1Rvb2x0aXBQcmltaXRpdmUuQ29udGVudD5cbiAgPC9Ub29sdGlwUHJpbWl0aXZlLlBvcnRhbD5cbikpO1xuXG5Ub29sdGlwQ29udGVudC5kaXNwbGF5TmFtZSA9ICdUb29sdGlwQ29udGVudCc7XG4iXSwibmFtZXMiOlsiVG9vbHRpcFByaW1pdGl2ZSIsImNsYXNzbmFtZXMiLCJSZWFjdCIsImludGVyIiwiVG9vbHRpcENvbnRlbnQiLCJmb3J3YXJkUmVmIiwic2lkZU9mZnNldCIsImNoaWxkcmVuIiwicHJvcHMiLCJmb3J3YXJkZWRSZWYiLCJQb3J0YWwiLCJDb250ZW50IiwicmVmIiwiY2xhc3NOYW1lIiwidmFyaWFibGUiLCJkaXNwbGF5TmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/tooltip-content.tsx\n");

/***/ }),

/***/ "./src/components/tooltip.tsx":
/*!************************************!*\
  !*** ./src/components/tooltip.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tooltip\": () => (/* binding */ Tooltip),\n/* harmony export */   \"TooltipRoot\": () => (/* binding */ TooltipRoot)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @radix-ui/react-tooltip */ \"@radix-ui/react-tooltip\");\n/* harmony import */ var _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _tooltip_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tooltip-content */ \"./src/components/tooltip-content.tsx\");\n\n\n\n\nconst TooltipRoot = ({ children , ...props })=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.Root, {\n        ...props,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/components/tooltip.tsx\",\n        lineNumber: 12,\n        columnNumber: 7\n    }, undefined);\nconst Tooltip = Object.assign(TooltipRoot, {\n    Arrow: _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.TooltipArrow,\n    Provider: _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.TooltipProvider,\n    Content: _tooltip_content__WEBPACK_IMPORTED_MODULE_3__.TooltipContent,\n    Trigger: _radix_ui_react_tooltip__WEBPACK_IMPORTED_MODULE_1__.TooltipTrigger\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90b29sdGlwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUE0RDtBQUM3QjtBQUNvQjtBQU01QyxNQUFNRyxjQUFnRCxDQUFDLEVBQzVEQyxTQUFRLEVBQ1IsR0FBR0MsT0FDSixpQkFBSyw4REFBQ0wseURBQXFCO1FBQUUsR0FBR0ssS0FBSztrQkFBR0Q7Ozs7O2tCQUFrQztBQUVwRSxNQUFNRyxVQUFVQyxPQUFPQyxNQUFNLENBQUNOLGFBQWE7SUFDaERPLE9BQU9WLGlFQUE2QjtJQUNwQ1ksVUFBVVosb0VBQWdDO0lBQzFDYyxTQUFTWiw0REFBY0E7SUFDdkJhLFNBQVNmLG1FQUErQjtBQUMxQyxHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtZW1haWwtcHJldmlldy8uL3NyYy9jb21wb25lbnRzL3Rvb2x0aXAudHN4Pzc4MzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVG9vbHRpcFByaW1pdGl2ZSBmcm9tICdAcmFkaXgtdWkvcmVhY3QtdG9vbHRpcCc7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUb29sdGlwQ29udGVudCB9IGZyb20gJy4vdG9vbHRpcC1jb250ZW50JztcblxudHlwZSBSb290UHJvcHMgPSBSZWFjdC5Db21wb25lbnRQcm9wc1dpdGhvdXRSZWY8dHlwZW9mIFRvb2x0aXBQcmltaXRpdmUuUm9vdD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9vbHRpcFByb3BzIGV4dGVuZHMgUm9vdFByb3BzIHt9XG5cbmV4cG9ydCBjb25zdCBUb29sdGlwUm9vdDogUmVhY3QuRkM8UmVhZG9ubHk8VG9vbHRpcFByb3BzPj4gPSAoe1xuICBjaGlsZHJlbixcbiAgLi4ucHJvcHNcbn0pID0+IDxUb29sdGlwUHJpbWl0aXZlLlJvb3Qgey4uLnByb3BzfT57Y2hpbGRyZW59PC9Ub29sdGlwUHJpbWl0aXZlLlJvb3Q+O1xuXG5leHBvcnQgY29uc3QgVG9vbHRpcCA9IE9iamVjdC5hc3NpZ24oVG9vbHRpcFJvb3QsIHtcbiAgQXJyb3c6IFRvb2x0aXBQcmltaXRpdmUuVG9vbHRpcEFycm93LFxuICBQcm92aWRlcjogVG9vbHRpcFByaW1pdGl2ZS5Ub29sdGlwUHJvdmlkZXIsXG4gIENvbnRlbnQ6IFRvb2x0aXBDb250ZW50LFxuICBUcmlnZ2VyOiBUb29sdGlwUHJpbWl0aXZlLlRvb2x0aXBUcmlnZ2VyLFxufSk7XG4iXSwibmFtZXMiOlsiVG9vbHRpcFByaW1pdGl2ZSIsIlJlYWN0IiwiVG9vbHRpcENvbnRlbnQiLCJUb29sdGlwUm9vdCIsImNoaWxkcmVuIiwicHJvcHMiLCJSb290IiwiVG9vbHRpcCIsIk9iamVjdCIsImFzc2lnbiIsIkFycm93IiwiVG9vbHRpcEFycm93IiwiUHJvdmlkZXIiLCJUb29sdGlwUHJvdmlkZXIiLCJDb250ZW50IiwiVHJpZ2dlciIsIlRvb2x0aXBUcmlnZ2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/tooltip.tsx\n");

/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"inter\": () => (/* reexport default from dynamic */ _next_font_google_target_css_path_src_pages_app_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter___WEBPACK_IMPORTED_MODULE_5___default.a)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _next_font_google_target_css_path_src_pages_app_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @next/font/google/target.css?{\"path\":\"src/pages/_app.tsx\",\"import\":\"Inter\",\"arguments\":[{\"subsets\":[\"latin\"],\"variable\":\"--font-inter\"}],\"variableName\":\"inter\"} */ \"./node_modules/@next/font/google/target.css?{\\\"path\\\":\\\"src/pages/_app.tsx\\\",\\\"import\\\":\\\"Inter\\\",\\\"arguments\\\":[{\\\"subsets\\\":[\\\"latin\\\"],\\\"variable\\\":\\\"--font-inter\\\"}],\\\"variableName\\\":\\\"inter\\\"}\");\n/* harmony import */ var _next_font_google_target_css_path_src_pages_app_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter___WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_next_font_google_target_css_path_src_pages_app_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter___WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./src/styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _components_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/tooltip */ \"./src/components/tooltip.tsx\");\n\n\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((_next_font_google_target_css_path_src_pages_app_tsx_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter___WEBPACK_IMPORTED_MODULE_5___default().variable), \"font-sans\"),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_3___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"title\", {\n                    children: \"React Email\"\n                }, void 0, false, {\n                    fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/pages/_app.tsx\",\n                    lineNumber: 17,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/pages/_app.tsx\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_tooltip__WEBPACK_IMPORTED_MODULE_4__.Tooltip.Provider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/pages/_app.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/pages/_app.tsx\",\n                lineNumber: 19,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/alanaanderson/Developer/base-case-events/transactional/.react-email/src/pages/_app.tsx\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2FwcC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBT2FBO0FBUGtCO0FBR0s7QUFDUDtBQUNtQjtBQU9oRCxTQUFTSSxNQUFNLEVBQUVDLFVBQVMsRUFBRUMsVUFBUyxFQUFZLEVBQUU7SUFDakQscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVdQLGlEQUFVQSxDQUFDRCxrTEFBYyxFQUFFOzswQkFDekMsOERBQUNFLGtEQUFJQTswQkFDSCw0RUFBQ1E7OEJBQU07Ozs7Ozs7Ozs7OzBCQUVULDhEQUFDUCxpRUFBZ0I7MEJBQ2YsNEVBQUNFO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWhDO0FBRUEsaUVBQWVGLEtBQUtBLEVBQUM7QUFsQlJKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtZW1haWwtcHJldmlldy8uL3NyYy9wYWdlcy9fYXBwLnRzeD9mOWQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnLi4vc3R5bGVzL2dsb2JhbHMuY3NzJztcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgeyBJbnRlciB9IGZyb20gJ0BuZXh0L2ZvbnQvZ29vZ2xlJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IFRvb2x0aXAgfSBmcm9tICcuLi9jb21wb25lbnRzL3Rvb2x0aXAnO1xuXG5leHBvcnQgY29uc3QgaW50ZXIgPSBJbnRlcih7XG4gIHN1YnNldHM6IFsnbGF0aW4nXSxcbiAgdmFyaWFibGU6ICctLWZvbnQtaW50ZXInLFxufSk7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhpbnRlci52YXJpYWJsZSwgJ2ZvbnQtc2FucycpfT5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+UmVhY3QgRW1haWw8L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuICAgICAgPFRvb2x0aXAuUHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvVG9vbHRpcC5Qcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiaW50ZXIiLCJjbGFzc25hbWVzIiwiSGVhZCIsIlRvb2x0aXAiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImRpdiIsImNsYXNzTmFtZSIsInZhcmlhYmxlIiwidGl0bGUiLCJQcm92aWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_app.tsx\n");

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "@radix-ui/react-tooltip":
/*!******************************************!*\
  !*** external "@radix-ui/react-tooltip" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@radix-ui/react-tooltip");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();