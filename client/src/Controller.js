import logger from './util/SimpleDebug.js';

function timeSorter(item1, item2) {
    if (item1.time > item2.time) return 1;
    return -1;
}

const getScheduleItemsQuery = `query {
         getScheduleItems {
            _id
            details
            time
          }
        }`;

const saveScheduleItemMutationPRE = `mutation {
  saveScheduleItem (item:{
`;

const saveScheduleItemMutationsPOST = `
  }) 
  {
    _id
  }
}`;

export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;

        this.handleDetailsEdit = this.handleDetailsEdit.bind(this);
        this.handleItemSave = this.handleItemSave.bind(this);


    }

    handleDetailsEdit(event) {
        event.preventDefault();
        let target = $(event.target);
        let value = target.val();
        let time = parseInt(target.attr("time"));
        logger.log("Handling event " + event.type + " from " + event.target + " with time " + time + " with value " + value,100);
        // get the current schedule
        let items = this.applicationView.state.scheduleItems;
        // find the item matching the edited time
        let foundItem = items.find(obj => obj.time === time);
        foundItem.details = value; // update the details for the item
        logger.log("Changed time " + foundItem.time + " details to " + value);
    }

    handleItemSave(event) {
        event.preventDefault();
        let target = $(event.target);
        let time = parseInt(target.attr("time"));
        logger.log("Handling event " + event.type + " from " + event.target + " with time " + time,100);
        // get the current schedule
        let items = this.applicationView.state.scheduleItems;
        // find the item matching the edited time
        let foundItem = items.find(obj => obj.time === time);
        logger.log("Saving time " + foundItem.time + " details to db");
    }

    setItemId(item,returnObj) {
        item._id = returnObj._id;
    }

    setState(stateObj) {
        logger.log("Setting State of Controller");
        let results = stateObj.scheduleItems;
        logger.log(results, 90);

        logger.log("Looking for gaps in the saved schedule items", 10);
        for (let index = 9; index <= 16; index++) {

            // find the schedule item for the timeslot (if any
            let foundIndex = results.findIndex(obj => obj.time === index);
            logger.log("Looking for time index " + index + " and found in array at " + foundIndex,10);
            if (foundIndex < 0) {
                logger.log("Creating missing timeslot " + index,10);
                let item = {details: "", time: index}  // we don't need a database id for new items, it will be created when the object is saved
                results.push(item);
            }
        }

        // now we need to sort the items by ascending time order for diplay
        results = results.sort(timeSorter);
        logger.log(results, 90);

        this.applicationView.setState({scheduleItems: results});


    }

    async _fetchQLJSON(query) {
        const postParameters = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query})
        };

        const response = await fetch("/graphql", postParameters);
        return response.json();
    }

    async loadSchedule() {
        logger.log("Loading Schedule", 2);
        const result = await this._fetchQLJSON(getScheduleItemsQuery);
        this.setState({scheduleItems: result.data.getScheduleItems});
    }

    async saveScheduleItem(item) {
        logger.log("Saving item - " + item,2);
        // construction the mutation call to GraphQL
        let mutation = saveScheduleItemMutationPRE;
        if (item._id === null) {
            mutation += "_id:" + item._id + "\n";
        }
        mutation += 'details:"' + item.details + '"\n';
        mutation += "time:" + item.time + "\n";
        mutation += saveScheduleItemMutationsPOST;
        logger.log("Mutation call is " + mutation,2);
        const result = await this._fetchQLJSON(mutation);
        this.setItemId(item, result.data.saveScheduleItem);
    }


}
