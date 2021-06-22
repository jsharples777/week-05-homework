 /* data source interface to be implemented */
 export default class DataSource {

    /* return an array of question objects */
    loadScheduleItems() {
        throw new ErrorEvent("DataSource is an interface class only - subclass and implement loadScheduleItems");
    }

     saveScheduleItem(scheduleItem) {
         throw new ErrorEvent("DataSource is an interface class only - subclass and implement saveScheduleItem")
     }

}
