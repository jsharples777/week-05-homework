function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
    return _this;
  }

  var _proto = ScheduleList.prototype;

  _proto.render = function render() {
    var scheduleItemRows = this.state.scheduleItems.map(function (scheduleItem) {
      return /*#__PURE__*/React.createElement(ScheduleItem, {
        key: scheduleItem.id,
        "schedule-item": scheduleItem
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      id: "appointment-list",
      className: this.props.className
    }, /*#__PURE__*/React.createElement("h1", null, "Test"));
  };

  return ScheduleList;
}(React.Component);

var element = /*#__PURE__*/React.createElement(ScheduleList, {
  className: "container-fluid"
});
ReactDOM.render(element, document.getElementById("content"));