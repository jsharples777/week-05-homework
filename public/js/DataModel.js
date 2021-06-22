import logger from './util/SimpleDebug.js';

var DataModel = /*#__PURE__*/function () {
  function DataModel(clientSideStorage) {
    if (clientSideStorage === void 0) {
      clientSideStorage = {};
    }

    this.clientSideStorage = null;
    this.dataSourceDelegate = null;
    //this.dataSourceDelegate = new ObjectDataSourceDelegate();
    //this.dataSourceDelegate = new FileDataSourceDelegate();
    this.initialise(clientSideStorage);
  }

  var _proto = DataModel.prototype;

  _proto.loadScheduleItems = function loadScheduleItems() {
    return this.dataSourceDelegate.loadScheduleItems();
  };

  _proto.saveScheduleItems = function saveScheduleItems(scheduleItems) {
    this.dataSourceDelegate.saveScheduleItems(scheduleItems);
  };

  _proto.addScheduleItem = function addScheduleItem(scheduleItem) {
    logger.log("Adding new schedule item", 5);
    this.dataSourceDelegate.addScheduleItem(scheduleItem);
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