import logger from "./util/SimpleDebug.js";
import Controller from "./Controller.js";
import ScheduleItem from "./component/ScheduleItem.js";




class ScheduleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scheduleItems: []}
        this.controller = new Controller(this,window.localStorage);
    }

    setState(stateObj) {
        logger.log("Setting State of Application");
        logger.log(stateObj,1);
        super.setState(stateObj);
    }


    componentDidMount() {
        this.controller.loadSchedule();
    }

    render() {

        const scheduleItemRows = this.state.scheduleItems.map(scheduleItem =>
            <ScheduleItem key={scheduleItem.time} scheduleItem={scheduleItem}/>
        )

        return (
            <div id={"appointment-list"} className="card">
                <ul>
                {scheduleItemRows}
                </ul>
            </div>
        );
    }
}

const element = <ScheduleList className={"container-fluid"}/>



ReactDOM.render(element,document.getElementById("content"));
