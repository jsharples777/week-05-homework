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
            <ScheduleItem key={scheduleItem.time} scheduleItem={scheduleItem} changeHandler={this.controller.handleDetailsEdit} saveHandler={this.controller.handleItemSave}/>
        )

        return (
            <div id={"appointment-list"} className={this.props.className}>
                {scheduleItemRows}
            </div>
        );
    }
}

const element = <ScheduleList className={"container-fluid"}/>

// setup the diplay for todays date
let today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);

ReactDOM.render(element,document.getElementById("content"));