export default function ScheduleItem(props) {
  var item = props.scheduleItem;
  var display = ":00";

  if (item.time < 10) {
    display = "0" + item.time + display;
  } else {
    display = item.time + display;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "row",
    time: item.time,
    _id: item._id
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-lg-2 col-md-2 col-sm-12 bg-primary text-center align-middle pt-3"
  }, /*#__PURE__*/React.createElement("span", null, display)), /*#__PURE__*/React.createElement("div", {
    className: "col-lg-8 col-md-8 col-sm-12 bg-secondary text-left align-middle text-dark pt-1"
  }, /*#__PURE__*/React.createElement("span", null, item.details)), /*#__PURE__*/React.createElement("div", {
    className: "col-lg-2 col-md-2 col-sm-12 align-middle p-3"
  }, /*#__PURE__*/React.createElement("button", {
    class: "btn btn-primary"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-save align-middle text-center"
  }))));
}