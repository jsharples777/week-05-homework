function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import logger from './util/SimpleDebug.js';
import GraphQLDataSource from "./data/GraphQLDataSource.js";

var DataModel = /*#__PURE__*/function () {
  function DataModel(clientSideStorage) {
    if (clientSideStorage === void 0) {
      clientSideStorage = {};
    }

    this.clientSideStorage = null;
    this.dataSourceDelegate = null;
    this.dataSourceDelegate = new GraphQLDataSource(); //this.dataSourceDelegate = new ObjectDataSourceDelegate();
    //this.dataSourceDelegate = new FileDataSourceDelegate();

    this.initialise(clientSideStorage);
  }

  var _proto = DataModel.prototype;

  _proto.loadScheduleItems = /*#__PURE__*/function () {
    var _loadScheduleItems = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var resultsPromise;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger.log("Loading Schedule - DataModel", 3);
              _context.next = 3;
              return this.dataSourceDelegate.loadScheduleItems();

            case 3:
              resultsPromise = _context.sent;
              logger.log("Promise is " + resultsPromise);
              resultsPromise.then(function (results) {
                logger.log(results, 90); // now that we have the current schedule, we need to fill in the gaps for the time slots now already filled

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
                return results;
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadScheduleItems() {
      return _loadScheduleItems.apply(this, arguments);
    }

    return loadScheduleItems;
  }();

  _proto.saveScheduleItem = function saveScheduleItem(scheduleItem) {
    logger.log("save schedule item", 5);
    this.dataSourceDelegate.saveScheduleItem(scheduleItem);
  };

  _proto.initialise = function initialise(clientSideStorage) {
    if (clientSideStorage === void 0) {
      clientSideStorage = {};
    }

    /* assume a stringified storage with JSON format */
    this.clientSideStorage = clientSideStorage;
  };

  return DataModel;
}();

export { DataModel as default };

function timeSorter(item1, item2) {
  if (item1.time > item2.time) return -1;
  return 1;
}