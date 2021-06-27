function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import logger from "./util/SimpleDebug.js";
import Controller from "./Controller.js";
import ScheduleItem from "./component/ScheduleItem.js";

var ScheduleList = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ScheduleList, _React$Component);

  function ScheduleList(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      scheduleItems: []
    };
    _this.controller = new Controller(_assertThisInitialized(_this), window.localStorage);
    return _this;
  }

  var _proto = ScheduleList.prototype;

  _proto.setState = function setState(stateObj) {
    logger.log("Setting State of Application");
    logger.log(stateObj, 1);

    _React$Component.prototype.setState.call(this, stateObj);
  };

  _proto.componentDidMount = function componentDidMount() {
    this.controller.loadSchedule();
  };

  _proto.render = function render() {
    var _this2 = this;

    var scheduleItemRows = this.state.scheduleItems.map(function (scheduleItem) {
      return /*#__PURE__*/React.createElement(ScheduleItem, {
        key: scheduleItem.time,
        scheduleItem: scheduleItem,
        changeHandler: _this2.controller.handleDetailsEdit,
        saveHandler: _this2.controller.handleItemSave
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      id: "appointment-list",
      className: this.props.className
    }, scheduleItemRows);
  };

  return ScheduleList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ScheduleList, {
  className: "container"
}); // setup the diplay for todays date

var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);
ReactDOM.render(element, document.getElementById("content"));