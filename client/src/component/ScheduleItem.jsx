export default function ScheduleItem(props) {
    let item = props.scheduleItem;
    let changeHandler = props.changeHandler;
    let saveHandler = props.saveHandler;

    const currentHour = moment().hour();

    /* correct time display for 24 hour clock */
    let display = ":00";
    if (item.time < 10) {
        display = "0" + item.time + display;
    } else {
        display = item.time + display;
    }

    /* change the background style if we are in the past, present or future */
    let textDisplayClasses = "col l8 m8 s8 border-top border-dark left-align blue-grey-text pt-1 mt-1";
    let backgroundDisplayClass = "red darken-1"; // set the background for "time is now"

    if (item.time < currentHour) {
        backgroundDisplayClass = "grey"; // in the past
    } else if (item.time > currentHour) {
        backgroundDisplayClass = "light-blue"; // in the future
    }

    textDisplayClasses += backgroundDisplayClass;


    return (
        <div className="row scheduleItem"   time={item.time} _id={item._id}>
            <div className="col l2 m2 s2">
                    <span className={"right-align"} style={{marginTop: "10pt"}}>{display}</span>

            </div>
            <div className={textDisplayClasses}>

                    <div className="input-field">
                        <textarea time={item.time} className={"form-control " + backgroundDisplayClass + " white-text"}
                                  defaultValue={item.details} onChange={changeHandler}></textarea>
                    </div>

            </div>
            <div className="col l2 m2 s2 pt2">
                <div className="valign-wrapper">
                    <button time={item.time} className={"btn-small light-blue"} onClick={saveHandler}>
                        <i time={item.time} className="fa fa-save align-middle my-auto"></i>
                    </button>
                </div>


            </div>
        </div>

    );
}