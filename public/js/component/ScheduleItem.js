export default function ScheduleItem(props) {
  var item = props.scheduleItem;
  var changeHandler = props.changeHandler;
  var saveHandler = props.saveHandler;
  var currentHour = moment().hour();
  /* correct time display for 24 hour clock */

  var display = ":00";

  if (item.time < 10) {
    display = "0" + item.time + display;
  } else {
    display = item.time + display;
  }
  /* change the background style if we are in the past, present or future */


  var textDisplayClasses = "col-lg-8 col-md-8 col-sm-12 text-left align-middle text-dark pt-1 ";
  var backgroundDisplayClass = "bg-warning"; // set the background for "time is now"

  if (item.time < currentHour) {
    backgroundDisplayClass = "bg-secondary"; // in the past
  } else if (item.time > currentHour) {
    backgroundDisplayClass = "bg-info"; // in the future
  }

  textDisplayClasses += backgroundDisplayClass;
  return /*#__PURE__*/React.createElement("div", {
    className: "row",
    time: item.time,
    _id: item._id
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-lg-2 col-md-2 col-sm-12 text-right text-top align-middle pt-2 border-top border-dark"
  }, /*#__PURE__*/React.createElement("span", null, display)), /*#__PURE__*/React.createElement("div", {
    className: textDisplayClasses
  }, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("textarea", {
    time: item.time,
    className: "form-control " + backgroundDisplayClass + " text-dark",
    defaultValue: item.details,
    onChange: changeHandler
  })))), /*#__PURE__*/React.createElement("div", {
    className: "col-lg-2 col-md-2 col-sm-12 align-middle p-3"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: saveHandler
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa fa-save align-middle text-center"
  }))));
}