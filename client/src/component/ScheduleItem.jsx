
export default function ScheduleItem (props) {
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
    let textDisplayClasses = "col-lg-8 col-md-8 col-sm-12 text-left align-middle text-dark pt-1 ";
    let backgroundDisplayClass = "bg-warning"; // set the background for "time is now"

    if (item.time < currentHour) {
        backgroundDisplayClass = "bg-secondary"; // in the past
    }
    else if (item.time > currentHour) {
        backgroundDisplayClass = "bg-info"; // in the future
    }

    textDisplayClasses += backgroundDisplayClass;



    return (
        <div className="row p-1" time={item.time} _id={item._id}>
            <div className="col-lg-2 col-md-2 col-sm-12 text-right text-top align-middle pt-2 border-top border-dark">
              <span>{display}</span>
            </div>
            <div className={textDisplayClasses}>
                <form>
                    <div className="form-group">
                        <textarea time={item.time} className={"form-control " + backgroundDisplayClass + " text-dark"} defaultValue={item.details} onChange={changeHandler}></textarea>
                    </div>
                </form>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 align-middle p-3">
                <button time={item.time} className={"btn btn-primary"} onClick={saveHandler}>
                    <i time={item.time} className="fa fa-save align-middle text-center"></i>
                </button>

            </div>
        </div>

    );
}