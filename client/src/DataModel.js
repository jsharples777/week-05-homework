import logger from './util/SimpleDebug.js';
import GraphQLDataSource from "./data/GraphQLDataSource.js";
 
export default class DataModel {
    clientSideStorage = null;
    dataSourceDelegate = null;


    constructor(clientSideStorage = {}) {
        this.dataSourceDelegate = new GraphQLDataSource();
        //this.dataSourceDelegate = new ObjectDataSourceDelegate();
        //this.dataSourceDelegate = new FileDataSourceDelegate();
        this.initialise(clientSideStorage);
    }


    async loadScheduleItems() {
        logger.log("Loading Schedule - DataModel",3);
        let resultsPromise = await this.dataSourceDelegate.loadScheduleItems();
        logger.log("Promise is " + resultsPromise);
        resultsPromise.then(function(results) {
            logger.log(results,90);
            // now that we have the current schedule, we need to fill in the gaps for the time slots now already filled
            logger.log("Looking for gaps in the saved schedule items",10);
            for (let index = 9; index <= 16; index++ ) {

                // find the schedule item for the timeslot (if any
                let foundIndex = results.findIndex(obj => obj.time === index);
                logger.log("Looking for time index " + index + " and found in array at " + foundIndex);
                if (foundIndex < 0) {
                    logger.log("Creating missing timeslot " + index);
                    let item = {details:"",time:index}  // we don't need a database id for new items, it will be created when the object is saved
                    results.push(item);
                }
            }

            // now we need to sort the items by ascending time order for diplay
            results = results.sort(timeSorter);
            logger.log(results,90);
            return results;
        });


    }

    saveScheduleItem(scheduleItem) {
        logger.log("save schedule item", 5);
        this.dataSourceDelegate.saveScheduleItem(scheduleItem);
    }


    initialise(clientSideStorage = {}) {
        /* assume a stringified storage with JSON format */
        this.clientSideStorage = clientSideStorage;
    }
}

function timeSorter (item1, item2) {
    if (item1.time > item2.time) return -1;
    return 1;
}

