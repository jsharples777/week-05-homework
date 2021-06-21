"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleDebug = /*#__PURE__*/function () {
  function SimpleDebug() {
    _classCallCheck(this, SimpleDebug);

    this.debugOn = true;
    this.debugDepth = 5;
  }

  _createClass(SimpleDebug, [{
    key: "log",
    value: function log(message) {
      var debugDepth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
      if (!this.debugOn) return;
      if (debugDepth > this.debugDepth) return;

      if (this.debugOn) {
        console.log(message);
      }
    }
  }, {
    key: "setLevel",
    value: function setLevel(newLevel) {
      this.debugDepth = newLevel;
    }
  }, {
    key: "setOn",
    value: function setOn() {
      this.debugOn = true;
    }
  }, {
    key: "setOff",
    value: function setOff() {
      this.debugOn = false;
    }
  }]);

  return SimpleDebug;
}();

var logger = new SimpleDebug();
var _default = logger;
exports.default = _default;