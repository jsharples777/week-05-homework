export default function ScheduleItem (props) {
    let item = props.scheduleItem;

    let display = ":00";
    if (item.time < 10) {
        display = "0" + item.time + display;
    } else {
        display = item.time + display;
    }
    return (




        <div className="row" time={item.time} _id={item._id}>
            <div className="col-lg-2 col-md-2 col-sm-12 bg-primary text-center align-middle pt-3">
              <span>{display}</span>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 bg-secondary text-left align-middle text-dark pt-1">
                <span>{item.details}</span>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 align-middle p-3">
                <button class={"btn btn-primary"}>
                    <i className="fa fa-save align-middle text-center"></i>
                </button>

            </div>
        </div>

    );
}