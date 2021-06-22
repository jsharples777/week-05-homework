 /* data source interface to be implemented */
 export default class DataSource {

    /* return an array of question objects */
    loadScheduleItems() {
        throw new ErrorEvent("DataSource is an interface class only - subclass and implement loadScheduleItems");
    }
     /* return an array of question objects */
     addScheduleItem(scheduleItem) {
         throw new ErrorEvent("DataSource is an interface class only - subclass and implement addScheduleItem");
     }

     saveScheduleItems(scheduleItems) {
         throw new ErrorEvent("DataSource is an interface class only - subclass and implement saveScheduleItems")
     }

}
