import DataSource from "./DataSource.js";
import logger from "../util/SimpleDebug.js"

/* data source interface to be implemented */
export default class GraphQLDataSource extends DataSource{

    /* return an array of question objects */
    async loadScheduleItems() {
        logger.log("Loading Schedule - QL Data Source ",4);
        const query = `query {
         getScheduleItems {
            _id
            details
            time
          }
        }`;

       const response = await fetch("/graphql", {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({query})
            });



        const result = await response.json();
        logger.log(result);

        logger.log(result.data.getScheduleItems);
        return result.data.getScheduleItems;

    }

    saveScheduleItem(scheduleItem) {
        throw new ErrorEvent("DataSource is an interface class only - subclass and implement saveScheduleItem")
    }

}
