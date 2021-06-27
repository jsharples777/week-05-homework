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


  var textDisplayClasses = "col l8 m8 s8 border-top border-dark left-align blue-grey-text pt-1 mt-1";
  var backgroundDisplayClass = "red darken-1"; // set the background for "time is now"

  if (item.time < currentHour) {
    backgroundDisplayClass = "grey"; // in the past
  } else if (item.time > currentHour) {
    backgroundDisplayClass = "light-blue"; // in the future
  }

  textDisplayClasses += backgroundDisplayClass;
  return /*#__PURE__*/React.createElement("div", {
    className: "row scheduleItem",
    time: item.time,
    _id: item._id
  }, /*#__PURE__*/React.createElement("div", {
    className: "col l2 m2 s2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "right-align",
    style: {
      marginTop: "10pt"
    }
  }, display)), /*#__PURE__*/React.createElement("div", {
    className: textDisplayClasses
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-field"
  }, /*#__PURE__*/React.createElement("textarea", {
    time: item.time,
    className: "form-control " + backgroundDisplayClass + " white-text",
    defaultValue: item.details,
    onChange: changeHandler
  }))), /*#__PURE__*/React.createElement("div", {
    className: "col l2 m2 s2 pt2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "valign-wrapper"
  }, /*#__PURE__*/React.createElement("button", {
    time: item.time,
    className: "btn-small light-blue",
    onClick: saveHandler
  }, /*#__PURE__*/React.createElement("i", {
    time: item.time,
    className: "fa fa-save align-middle my-auto"
  })))));
}