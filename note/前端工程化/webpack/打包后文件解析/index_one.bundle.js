// index_one.bundle.js
webpackJsonp([0],[
  /* 0 */
  /***/ function(module, exports, __webpack_require__) {

    'use strict';

    var dependency = __webpack_require__(1);
    var common = __webpack_require__(2);

    console.log('index: ', dependency.name, common.name);

    /***/ },
  /* 1 */
  /***/ function(module, exports) {

    'use strict';

    module.exports = {
      name: 'dependency'
    };

    /***/ }
]);
