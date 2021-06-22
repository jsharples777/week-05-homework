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


    loadScheduleItems() {
        logger.log("Loading schedule items", 5);
        return this.dataSourceDelegate.loadScheduleItems();
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

