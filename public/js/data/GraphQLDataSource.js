function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import DataSource from "./DataSource.js";
import logger from "../util/SimpleDebug.js";
/* data source interface to be implemented */

var GraphQLDataSource = /*#__PURE__*/function (_DataSource) {
  _inheritsLoose(GraphQLDataSource, _DataSource);

  function GraphQLDataSource() {
    return _DataSource.apply(this, arguments) || this;
  }

  var _proto = GraphQLDataSource.prototype;

  /* return an array of question objects */
  _proto.loadScheduleItems =
  /*#__PURE__*/
  function () {
    var _loadScheduleItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var query, result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger.log("Loading Schedule - QL Data Source ", 4);
              query = "query {\n         getScheduleItems {\n            _id\n            details\n            time\n          }\n        }";
              fetch("/graphql", {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: query
                })
              }).then(function (response) {
                return response.json();
              }).then(function (data) {
                result = data.data.getScheduleItems;
                logger.log(result);
              });
              return _context.abrupt("return", result);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function loadScheduleItems() {
      return _loadScheduleItems.apply(this, arguments);
    }

    return loadScheduleItems;
  }();

  _proto.saveScheduleItem = function saveScheduleItem(scheduleItem) {
    throw new ErrorEvent("DataSource is an interface class only - subclass and implement saveScheduleItem");
  };

  return GraphQLDataSource;
}(DataSource);

export { GraphQLDataSource as default };