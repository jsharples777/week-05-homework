import logger from './util/SimpleDebug.js';
import DataModel from "./DataModel.js";

/* this class will link the functionality of the data model and the application (view) */
export default class Controller {
    applicationView = null;

    scheduleItems = null;


    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.dataModel = new DataModel(clientSideStorage);

        /* setup the event handlers */
        this.handleAddScheduleItem = this.handleAddScheduleItem.bind(this);


    }

    loadScheduleItems() {
        logger.log("Loading Schedule - Controller",2);
        if (this.scheduleItems === null) {
            this.scheduleItems = this.dataModel.loadScheduleItems();
        }
        return this.scheduleItems;
    }

    saveScheduleItems() {
        this.dataModel.saveScheduleItems(this.scheduleItems);
    }


    handleAddScheduleItem(event) {
        logger.log("handling adding schedule item", 2)
        event.preventDefault();
        /* has the user put something in the name field */
        let view = event.target; // should be the form object
        /* load the data from the view */
        let scheduleItem = null;

        /* send to the data model */
        this.dataModel.addScheduleItem(scheduleItem);

    }


}
