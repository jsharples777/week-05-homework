/* data source interface to be implemented */
var DataSource = /*#__PURE__*/function () {
  function DataSource() {}

  var _proto = DataSource.prototype;

  /* return an array of question objects */
  _proto.loadScheduleItems = function loadScheduleItems() {
    throw new ErrorEvent("DataSource is an interface class only - subclass and implement loadScheduleItems");
  }
  /* return an array of question objects */
  ;

  _proto.addScheduleItem = function addScheduleItem(scheduleItem) {
    throw new ErrorEvent("DataSource is an interface class only - subclass and implement addScheduleItem");
  };

  _proto.saveScheduleItems = function saveScheduleItems(scheduleItems) {
    throw new ErrorEvent("DataSource is an interface class only - subclass and implement saveScheduleItems");
  };

  return DataSource;
}();

export { DataSource as default };