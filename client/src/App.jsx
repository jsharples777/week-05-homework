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

        const handler = function(event) {
            let value = $(event.target).val();
            logger.log("Handling event " + event.type + " from " + event.target + " with value " + value,100);
        }



        const scheduleItemRows = this.state.scheduleItems.map(scheduleItem =>
            <ScheduleItem key={scheduleItem.time} scheduleItem={scheduleItem} changeHandler={handler} saveHandler={handler}/>
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
let today = moment().format("DD/MM/YYYY");
$("#currentDay").text(today);

ReactDOM.render(element,document.getElementById("content"));