import logger from './util/SimpleDebug.js';
import DataModel from "./DataModel.js";
/* this class will link the functionality of the data model and the application (view) */

var Controller = /*#__PURE__*/function () {
  function Controller(applicationView, clientSideStorage) {
    this.applicationView = null;
    this.scheduleItems = null;
    this.applicationView = applicationView;
    this.dataModel = new DataModel(clientSideStorage);
    /* setup the event handlers */

    this.handleAddScheduleItem = this.handleAddScheduleItem.bind(this);
  }

  var _proto = Controller.prototype;

  _proto.loadScheduleItems = function loadScheduleItems() {
    logger.log("Loading Schedule - Controller", 2);

    if (this.scheduleItems === null) {
      this.scheduleItems = this.dataModel.loadScheduleItems();
    }

    return this.scheduleItems;
  };

  _proto.saveScheduleItems = function saveScheduleItems() {
    this.dataModel.saveScheduleItems(this.scheduleItems);
  };

  _proto.handleAddScheduleItem = function handleAddScheduleItem(event) {
    logger.log("handling adding schedule item", 2);
    event.preventDefault();
    /* has the user put something in the name field */

    var view = event.target; // should be the form object

    /* load the data from the view */

    var scheduleItem = null;
    /* send to the data model */

    this.dataModel.addScheduleItem(scheduleItem);
  };

  return Controller;
}();

export { Controller as default };