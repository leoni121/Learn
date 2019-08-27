webpackJsonp([0],[
  function(module, exports, __webpack_require__) { //文件入口
    'use strict';

    // require common.js 和 dependency.js
    var dependency = __webpack_require__(1);
    var common = __webpack_require__(2);

    console.log('index: ', dependency.name, common.name);
  },
  function(module, exports) { // dependency.js
    'use strict';

    module.exports = {
      name: 'dependency'
    };
  }
]);
