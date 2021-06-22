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

  _proto.loadScheduleItems = function loadScheduleItems() {
    logger.log("Loading Schedule - DataModel", 3);
    return this.dataSourceDelegate.loadScheduleItems();
  };

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