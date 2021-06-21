import React from 'react';
import Controller from "./Controller";
import DataModel from "./DataModel";


class ScheduleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scheduleItems: []}
    }

    render() {
        const scheduleItemRows = this.state.scheduleItems.map(scheduleItem =>
            <ScheduleItem key={scheduleItem.id} schedule-item={scheduleItem}/>
        )

        return (
            <div id={"appointment-list"} className={this.props.className}>
              <h1>Test</h1>
            </div>
        );
    }
}

const element = <ScheduleList className={"container-fluid"}/>


ReactDOM.render(element,document.getElementById("content"));