function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import logger from './util/SimpleDebug.js';

function timeSorter(item1, item2) {
  if (item1.time > item2.time) return 1;
  return -1;
}

var getScheduleItemsQuery = "query {\n         getScheduleItems {\n            _id\n            details\n            time\n          }\n        }";
var saveScheduleItemMutationPRE = "mutation {\n  saveScheduleItem (item:{\n";
var saveScheduleItemMutationsPOST = "\n  }) \n  {\n    _id\n  }\n}";

var Controller = /*#__PURE__*/function () {
  function Controller(applicationView, clientSideStorage) {
    this.applicationView = applicationView;
    this.clientSideStorage = clientSideStorage;
  }

  var _proto = Controller.prototype;

  _proto.setItemId = function setItemId(item, returnObj) {
    item._id = returnObj._id;
  };

  _proto.setState = function setState(stateObj) {
    logger.log("Setting State of Controller");
    var results = stateObj.scheduleItems;
    logger.log(results, 90);
    logger.log("Looking for gaps in the saved schedule items", 10);

    var _loop = function _loop(index) {
      // find the schedule item for the timeslot (if any
      var foundIndex = results.findIndex(function (obj) {
        return obj.time === index;
      });
      logger.log("Looking for time index " + index + " and found in array at " + foundIndex);

      if (foundIndex < 0) {
        logger.log("Creating missing timeslot " + index);
        var item = {
          details: "",
          time: index
        }; // we don't need a database id for new items, it will be created when the object is saved

        results.push(item);
      }
    };

    for (var index = 9; index <= 16; index++) {
      _loop(index);
    } // now we need to sort the items by ascending time order for diplay


    results = results.sort(timeSorter);
    logger.log(results, 90);
    this.applicationView.setState({
      scheduleItems: results
    });
  };

  _proto._fetchQLJSON = /*#__PURE__*/function () {
    var _fetchQLJSON2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query) {
      var postParameters, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postParameters = {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  query: query
                })
              };
              _context.next = 3;
              return fetch("/graphql", postParameters);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.json());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function _fetchQLJSON(_x) {
      return _fetchQLJSON2.apply(this, arguments);
    }

    return _fetchQLJSON;
  }();

  _proto.loadSchedule = /*#__PURE__*/function () {
    var _loadSchedule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              logger.log("Loading Schedule", 2);
              _context2.next = 3;
              return this._fetchQLJSON(getScheduleItemsQuery);

            case 3:
              result = _context2.sent;
              this.setState({
                scheduleItems: result.data.getScheduleItems
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function loadSchedule() {
      return _loadSchedule.apply(this, arguments);
    }

    return loadSchedule;
  }();

  _proto.saveScheduleItem = /*#__PURE__*/function () {
    var _saveScheduleItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(item) {
      var mutation, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              logger.log("Saving item - " + item, 2); // construction the mutation call to GraphQL

              mutation = saveScheduleItemMutationPRE;

              if (item._id !== null) {
                mutation += "_id:" + item._id + "\n";
              }

              mutation += 'details:"' + item.details + '"\n';
              mutation += "time:" + item.time + "\n";
              mutation += saveScheduleItemMutationsPOST;
              logger.log("Mutation call is " + mutation, 2);
              _context3.next = 9;
              return this._fetchQLJSON(mutation);

            case 9:
              result = _context3.sent;
              this.setItemId(item, result.data.saveScheduleItem);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function saveScheduleItem(_x2) {
      return _saveScheduleItem.apply(this, arguments);
    }

    return saveScheduleItem;
  }();

  return Controller;
}();

export { Controller as default };