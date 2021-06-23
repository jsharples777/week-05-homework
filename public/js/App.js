function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Controller from "./Controller.js";
import logger from "./util/SimpleDebug.js"; //import ScheduleItem from "./component/ScheduleItem.js"

var ScheduleList = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(ScheduleList, _React$Component);

  function ScheduleList(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      scheduleItems: []
    };
    _this.controller = new Controller(element, window.localStorage);
    return _this;
  }

  var _proto = ScheduleList.prototype;

  _proto.loadSchedule = /*#__PURE__*/function () {
    var _loadSchedule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger.log("Loading Schedule - App", 1);
              _context.next = 3;
              return this.controller.loadScheduleItems();

            case 3:
              return _context.abrupt("return", _context.sent);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadSchedule() {
      return _loadSchedule.apply(this, arguments);
    }

    return loadSchedule;
  }();

  _proto.componentDidMount = function componentDidMount() {
    var items = this.loadSchedule();
    logger.log(items, 10);
    this.setState({
      scheduleItems: items
    });
  };

  _proto.render = function render() {
    // const scheduleItemRows = this.state.scheduleItems.map(scheduleItem =>
    //     <ScheduleItem key={scheduleItem.id} schedule-item={scheduleItem}/>
    // )
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