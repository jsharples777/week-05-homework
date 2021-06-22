import logger from './util/SimpleDebug.js';
 
export default class DataModel {
    clientSideStorage = null;
    dataSourceDelegate = null;


    constructor(clientSideStorage = {}) {
        //this.dataSourceDelegate = new ObjectDataSourceDelegate();
        //this.dataSourceDelegate = new FileDataSourceDelegate();
        this.initialise(clientSideStorage);
    }


    loadScheduleItems() {
        return this.dataSourceDelegate.loadScheduleItems();
    }

    saveScheduleItems(scheduleItems) {
        this.dataSourceDelegate.saveScheduleItems(scheduleItems);
    }



    addScheduleItem(scheduleItem) {
        logger.log("Adding new schedule item", 5);
        this.dataSourceDelegate.addScheduleItem(scheduleItem);
    }


    initialise(clientSideStorage = {}) {
        /* assume a stringified storage with JSON format */
        this.clientSideStorage = clientSideStorage;
    }
}

