import DataSource from "./DataSource.js";
import logger from "../util/SimpleDebug.js"

/* data source interface to be implemented */
export default class GraphQLDataSource extends DataSource {

    /* return an array of question objects */
    async loadScheduleItems() {
        logger.log("Loading Schedule - QL Data Source ", 4);
        const query = `query {
         getScheduleItems {
            _id
            details
            time
          }
        }`;
        let result;
        fetch("/graphql", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({query})})
            .then(response => response.json())
            .then(function(data) {
                result = data.data.getScheduleItems;
                logger.log(result);

            });

        return result;
    }

    saveScheduleItem(scheduleItem) {
        throw new ErrorEvent("DataSource is an interface class only - subclass and implement saveScheduleItem")
    }

}
