"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* data source interface to be implemented */
var DataSource = /*#__PURE__*/function () {
  function DataSource() {
    _classCallCheck(this, DataSource);
  }

  _createClass(DataSource, [{
    key: "loadQuestions",
    value:
    /* return an array of question objects */
    function loadQuestions() {
      throw new ErrorEvent("DataSource is an interface class only - subclass and implement loadQuestions");
    }
  }]);

  return DataSource;
}();

var _default = DataSource;
exports.default = _default;