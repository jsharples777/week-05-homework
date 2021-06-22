import Controller from "./Controller.js";
import logger from "./util/SimpleDebug.js";
//import ScheduleItem from "./component/ScheduleItem.js"

class ScheduleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scheduleItems: []}
        this.controller = new Controller(element,window.localStorage);



    }

    async loadSchedule() {
        logger.log("Loading Schedule - App",1);
        return await this.controller.loadScheduleItems();

    }

    componentDidMount() {
        let items = this.loadSchedule();
        logger.log(items,10);
        this.setState({scheduleItems: items});

    }

    render() {

        // const scheduleItemRows = this.state.scheduleItems.map(scheduleItem =>
        //     <ScheduleItem key={scheduleItem.id} schedule-item={scheduleItem}/>
        // )

        return (
            <div id={"appointment-list"} className={this.props.className}>
              <h1>Test</h1>
            </div>
        );
    }
}

const element = <ScheduleList className={"container-fluid"}/>



ReactDOM.render(element,document.getElementById("content"));
